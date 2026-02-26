import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CtaSection() {
	return (
		<section className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<div className="rounded-2xl border border-border/50 bg-card/30 px-6 py-16 text-center sm:px-12">
					<h2 className="text-3xl font-bold sm:text-4xl">
						Ready to map your world?
					</h2>
					<p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
						Start building your personal connections graph today.
						It&apos;s free to get started.
					</p>
					<div className="mt-8">
						<Button size="lg" asChild>
							<Link to="/signUp">Create Free Account</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
