import { Link, useRouteContext } from "@tanstack/react-router";
import { Menu, Network, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSession } from "@/lib/auth-client";

const navLinks = [
	{ label: "Features", to: "/#features", isHash: true },
	{ label: "Dashboard", to: "/dashboard", isHash: false },
] as const;

export function Header() {
	const isMobile = useIsMobile();
	const [mobileOpen, setMobileOpen] = useState(false);

	const { data: session, error, isPending } = useSession();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
				{/* Logo */}
				<Link to="/" className="flex items-center gap-2">
					<Network className="size-5 text-primary" />
					<span className="text-lg font-bold tracking-tight">
						MeetLog
					</span>
				</Link>

				{/* Desktop Nav */}
				{!isMobile && (
					<nav className="flex items-center gap-6">
						{navLinks.map((link) => {
							if (!link.isHash) {
								return (
									<Link
										key={link.label}
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								);
							}

							return (
								<a
									href={link.to}
									key={link.label}
									className="text-sm text-muted-foreground transition-colors hover:text-foreground"
								>
									{link.label}
								</a>
							);
						})}
					</nav>
				)}

				{/* Desktop Auth Buttons */}
				{!isMobile &&
					(session ? (
						session.user.name
					) : (
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="sm" asChild>
								<Link to="/signIn">Sign In</Link>
							</Button>
							<Button size="sm" asChild>
								<Link to="/signUp">Get Started</Link>
							</Button>
						</div>
					))}

				{/* Mobile Hamburger */}
				{isMobile && (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setMobileOpen(true)}
					>
						<Menu className="size-5" />
					</Button>
				)}

				{/* Mobile Sheet */}
				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetContent side="left" showCloseButton={false}>
						<SheetHeader>
							<div className="flex items-center justify-between">
								<SheetTitle className="flex items-center gap-2">
									<Network className="size-5 text-primary" />
									MeetLog
								</SheetTitle>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setMobileOpen(false)}
								>
									<X className="size-4" />
								</Button>
							</div>
						</SheetHeader>
						<nav className="flex flex-col gap-2 px-4">
							{navLinks.map((link) => {
								if (!link.isHash) {
									return (
										<Link
											key={link.label}
											to={link.to}
											className="text-sm text-muted-foreground transition-colors hover:text-foreground"
										>
											{link.label}
										</Link>
									);
								}

								return (
									<a
										href={link.to}
										key={link.label}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</a>
								);
							})}
							{}
							<div className="mt-4 flex flex-col gap-2">
								<Button variant="outline" asChild>
									<Link
										to="/signIn"
										onClick={() => setMobileOpen(false)}
									>
										Sign In
									</Link>
								</Button>
								<Button asChild>
									<Link
										to="/signUp"
										onClick={() => setMobileOpen(false)}
									>
										Get Started
									</Link>
								</Button>
							</div>
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
}
