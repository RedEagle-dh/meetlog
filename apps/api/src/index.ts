import { cors } from "@elysiajs/cors";
import Elysia, { type Context, t } from "elysia";
import { auth } from "./routes/auth";

const betterAuth = new Elysia({ name: "better-auth" })
	.mount(auth.handler)
	.macro({
		auth: (enabled: boolean) => {
			if (!enabled) return;
			return {
				async resolve({ status, request: { headers } }) {
					const session = await auth.api.getSession({
						headers,
					});

					if (!session) return status(401);

					return {
						user: session.user,
						session: session.session,
					};
				},
			};
		},
	});

const betterAuthView = (context: Context) => {
	const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
	if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
		return auth.handler(context.request);
	} else {
		context.status(405);
	}
};

const app = new Elysia()
	.use(
		cors({
			origin: "http://localhost:3000",
			methods: ["Get", "POST", "PUT", "PATCH", "DELETE"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.all("/api/auth/*", betterAuthView)
	.use(betterAuth)
	.get(
		"/",
		({ status, request }) => {
			return {
				status: "ok",
				code: 200,
			};
		},
		{
			auth: true,
			response: t.Object({
				status: t.String(),
				code: t.Number(),
			}),
		},
	)
	.listen(3001);

console.log(`Elysia running on 3001`);

export type App = typeof app;
