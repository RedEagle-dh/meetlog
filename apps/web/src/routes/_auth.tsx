import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "@/lib/auth-server";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async () => {
		const session = await getSession();
		if (session) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: () => <Outlet />,
});
