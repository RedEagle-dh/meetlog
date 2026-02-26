import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	ReactFlow,
	Background,
	BackgroundVariant,
	type Node,
	type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { MeNode } from "@/components/graph/me-node";
import { PersonNode } from "@/components/graph/person-node";
import { RelationshipEdge } from "@/components/graph/relationship-edge";
import { computePreviewLayout } from "@/lib/graph-utils";
import { people, connections } from "@/data/mock-connections";

const nodeTypes = {
	meNode: MeNode,
	personNode: PersonNode,
};

const edgeTypes = {
	relationshipEdge: RelationshipEdge,
};

export function HeroSection() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { nodes, edges } = computePreviewLayout(people, connections);

	return (
		<section className="relative overflow-hidden">
			<div className="mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 sm:pt-28 sm:pb-12">
				{/* Text content */}
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
						<span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
							Visualize Your
						</span>
						<br />
						<span className="bg-gradient-to-r from-primary via-blue-400 to-emerald-400 bg-clip-text text-transparent">
							Human Connections
						</span>
					</h1>
					<p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
						Map relationships, discover patterns, and never lose
						touch with the people who matter. Your personal
						connection graph, beautifully visualized.
					</p>
					<div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
						<Button size="lg" asChild>
							<Link to="/signUp">Get Started Free</Link>
						</Button>
						<Button variant="ghost" size="lg" asChild>
							<Link
								to="/dashboard"
								className="flex items-center gap-2"
							>
								See Demo
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>

				{/* Graph preview */}
				<div className="relative mt-16 mx-auto max-w-4xl">
					{/* Glow effect */}
					<div className="absolute inset-0 -z-10 blur-3xl opacity-30">
						<div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-emerald-500/30" />
					</div>

					<div className="relative h-[400px] sm:h-[500px] overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
						{isMounted && (
							<ReactFlow
								nodes={nodes}
								edges={edges}
								nodeTypes={nodeTypes}
								edgeTypes={edgeTypes}
								fitView
								fitViewOptions={{ padding: 0.3 }}
								zoomOnScroll={false}
								panOnDrag={false}
								nodesDraggable={false}
								nodesConnectable={false}
								elementsSelectable={false}
								proOptions={{ hideAttribution: true }}
								className="bg-transparent"
							>
								<Background
									variant={BackgroundVariant.Dots}
									color="oklch(0.3 0 0)"
									gap={24}
									size={1}
								/>
							</ReactFlow>
						)}

						{/* Gradient fade overlay */}
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
					</div>
				</div>
			</div>
		</section>
	);
}
