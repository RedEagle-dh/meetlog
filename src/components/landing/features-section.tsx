import { Share2, Users, Bell } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

const features = [
	{
		icon: Share2,
		title: "Visual Graph",
		description:
			"See all your connections at a glance. An interactive network graph that shows who you know and how they're linked.",
	},
	{
		icon: Users,
		title: "Smart Groups",
		description:
			"Automatic clustering by relationship type. Family, friends, colleagues — instantly see the structure of your social world.",
	},
	{
		icon: Bell,
		title: "Stay Connected",
		description:
			"Track when you last connected with someone. Never forget a follow-up or lose touch with people who matter.",
	},
] as const;

export function FeaturesSection() {
	return (
		<section id="features" className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold sm:text-4xl">
						Why MeetLog?
					</h2>
					<p className="mt-3 text-muted-foreground text-lg">
						Everything you need to understand your social network.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
					{features.map((feature) => (
						<Card
							key={feature.title}
							className="bg-card/50 border-border/50 transition-colors hover:border-border"
						>
							<CardHeader>
								<div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10">
									<feature.icon className="size-5 text-primary" />
								</div>
								<CardTitle className="text-lg">
									{feature.title}
								</CardTitle>
								<CardDescription className="text-sm leading-relaxed">
									{feature.description}
								</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
