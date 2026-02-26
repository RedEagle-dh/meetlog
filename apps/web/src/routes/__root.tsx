import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TooltipProvider } from "@/components/ui/tooltip";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "MeetLog - Visualize Human Connections",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<TooltipProvider>
					<RootLayout>{children}</RootLayout>
				</TooltipProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isDashboard = pathname.startsWith("/dashboard");

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">{children}</main>
			{!isDashboard && <Footer />}
		</div>
	);
}
