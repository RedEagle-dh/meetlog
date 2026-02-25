import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CtaSection } from "@/components/landing/cta-section";

export const Route = createFileRoute("/")({ component: LandingPage });

function LandingPage() {
	return (
		<div>
			<HeroSection />
			<FeaturesSection />
			<CtaSection />
		</div>
	);
}
