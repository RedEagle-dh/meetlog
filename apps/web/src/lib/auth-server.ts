import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { authClient } from "./auth-client";

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = getRequestHeaders();
		const cookie = headers.get("cookie");

		const res = await authClient.getSession({
			fetchOptions: {
				headers: cookie ? { cookie } : undefined,
			},
		});

		return res.data ?? null;
	},
);
