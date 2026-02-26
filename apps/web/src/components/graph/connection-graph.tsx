import {
	Background,
	BackgroundVariant,
	Controls,
	MiniMap,
	type NodeMouseHandler,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";

import {
	connections as allConnections,
	people as allPeople,
	type PersonNode as PersonNodeType,
	type RelationshipType,
} from "@/data/mock-connections";
import { computeRadialLayout } from "@/lib/graph-utils";
import { MeNode } from "./me-node";
import { PersonNode } from "./person-node";
import { RelationshipEdge } from "./relationship-edge";

const nodeTypes = {
	meNode: MeNode,
	personNode: PersonNode,
};

const edgeTypes = {
	relationshipEdge: RelationshipEdge,
};

type ConnectionGraphProps = {
	filter?: RelationshipType | "all";
	searchQuery?: string;
	onNodeClick?: (person: PersonNodeType | null) => void;
};

export function ConnectionGraph({
	filter = "all",
	searchQuery = "",
	onNodeClick,
}: ConnectionGraphProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const { filteredPeople, filteredConnections } = useMemo(() => {
		let filtered = allPeople;

		if (filter !== "all") {
			filtered = filtered.filter((p) => p.relationship === filter);
		}

		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(query) ||
					p.role?.toLowerCase().includes(query) ||
					p.group.toLowerCase().includes(query),
			);
		}

		const filteredIds = new Set(["me", ...filtered.map((p) => p.id)]);
		const edges = allConnections.filter(
			(c) => filteredIds.has(c.sourceId) && filteredIds.has(c.targetId),
		);

		return { filteredPeople: filtered, filteredConnections: edges };
	}, [filter, searchQuery]);

	const { nodes: initialNodes, edges: initialEdges } = useMemo(
		() => computeRadialLayout(filteredPeople, filteredConnections),
		[filteredPeople, filteredConnections],
	);

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	// Sync when filter/search changes
	useEffect(() => {
		setNodes(initialNodes);
		setEdges(initialEdges);
	}, [initialNodes, initialEdges, setNodes, setEdges]);

	const handleNodeClick: NodeMouseHandler = useCallback(
		(_event, node) => {
			if (node.id === "me" || !onNodeClick) return;
			const person = allPeople.find((p) => p.id === node.id);
			onNodeClick(person || null);
		},
		[onNodeClick],
	);

	if (!isMounted) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<div className="text-muted-foreground text-sm">
					Loading graph...
				</div>
			</div>
		);
	}

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onNodeClick={handleNodeClick}
			nodeTypes={nodeTypes}
			edgeTypes={edgeTypes}
			fitView
			fitViewOptions={{ padding: 0.2 }}
			minZoom={0.2}
			maxZoom={2}
			proOptions={{ hideAttribution: true }}
			className="bg-background"
		>
			<Controls
				showInteractive={false}
				className="!bg-card !border-border !rounded-lg !shadow-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-accent"
			/>
			<MiniMap
				className="!bg-card !border-border !rounded-lg"
				maskColor="oklch(0.145 0 0 / 0.7)"
				nodeColor="oklch(0.5 0 0)"
			/>
			<Background
				variant={BackgroundVariant.Dots}
				color="oklch(0.3 0 0)"
				gap={24}
				size={1}
			/>
		</ReactFlow>
	);
}
