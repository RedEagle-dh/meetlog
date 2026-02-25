import { Link } from "@tanstack/react-router";
import { Network } from "lucide-react";

const productLinks = [
	{ label: "Features", to: "/" },
	{ label: "Dashboard", to: "/dashboard" },
	{ label: "Pricing", to: "/" },
] as const;

const companyLinks = [
	{ label: "About", to: "/" },
	{ label: "Blog", to: "/" },
	{ label: "Contact", to: "/" },
] as const;

export function Footer() {
	return (
		<footer className="border-t bg-card/30">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
					{/* Brand */}
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							<Network className="size-5 text-primary" />
							<span className="text-lg font-bold">MeetLog</span>
						</div>
						<p className="text-sm text-muted-foreground max-w-xs">
							Visualize your human connections. Map relationships,
							discover patterns, and stay connected.
						</p>
					</div>

					{/* Product */}
					<div className="space-y-3">
						<h4 className="text-sm font-semibold">Product</h4>
						<ul className="space-y-2">
							{productLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company */}
					<div className="space-y-3">
						<h4 className="text-sm font-semibold">Company</h4>
						<ul className="space-y-2">
							{companyLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-10 border-t pt-6">
					<p className="text-center text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} MeetLog. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
