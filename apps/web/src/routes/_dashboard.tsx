import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "@/lib/auth-server";

export const Route = createFileRoute("/_dashboard")({
	beforeLoad: async ({ location }) => {
		const session = await getSession();
		if (!session) {
			throw redirect({
				to: "/signIn",
				search: { redirect: location.href },
			});
		}
		return {
			user: session.user,
			session: session.session,
		};
	},
	component: () => <Outlet />,
});
