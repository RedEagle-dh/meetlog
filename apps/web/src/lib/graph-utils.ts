import type { Edge, Node } from "@xyflow/react";
import {
	type ConnectionEdge,
	meUser,
	type PersonNode,
	relationshipColors,
} from "@/data/mock-connections";

const RING_RADII: Record<number, number> = { 1: 280, 2: 500, 3: 720 };

export function computeRadialLayout(
	people: PersonNode[],
	connections: ConnectionEdge[],
): { nodes: Node[]; edges: Edge[] } {
	const nodes: Node[] = [];

	// Place "Me" at center
	nodes.push({
		id: "me",
		type: "meNode",
		position: { x: 0, y: 0 },
		data: { ...meUser, connectionCount: people.length },
	});

	// Group people by closeness, then by group within each ring
	const rings: Record<number, PersonNode[]> = { 1: [], 2: [], 3: [] };
	for (const person of people) {
		rings[person.closeness].push(person);
	}

	// Sort within each ring by group name so same-group people are adjacent
	for (const ring of Object.values(rings)) {
		ring.sort((a, b) => a.group.localeCompare(b.group));
	}

	// Place people in concentric rings
	for (const [closenessStr, ring] of Object.entries(rings)) {
		const closeness = Number(closenessStr);
		const radius = RING_RADII[closeness];
		const count = ring.length;
		if (count === 0) continue;

		const angleStep = (2 * Math.PI) / count;
		// Offset each ring so nodes don't align radially
		const angleOffset = closeness * 0.4;

		for (let i = 0; i < count; i++) {
			const person = ring[i];
			const angle = angleStep * i + angleOffset;
			const x = Math.cos(angle) * radius;
			const y = Math.sin(angle) * radius;

			nodes.push({
				id: person.id,
				type: "personNode",
				position: { x: x - 80, y: y - 40 },
				data: person,
			});
		}
	}

	// Create edges
	const edges: Edge[] = connections.map((conn, index) => ({
		id: `e-${conn.sourceId}-${conn.targetId}-${index}`,
		source: conn.sourceId,
		target: conn.targetId,
		type: "relationshipEdge",
		data: {
			relationship: conn.relationship,
			label: conn.label,
		},
	}));

	return { nodes, edges };
}

/**
 * Subset of data for the landing page decorative preview
 */
export function computePreviewLayout(
	people: PersonNode[],
	connections: ConnectionEdge[],
): { nodes: Node[]; edges: Edge[] } {
	// Take a small subset: 2 from closeness 1, 3 from closeness 2, 2 from closeness 3
	const subset: PersonNode[] = [];
	const byCloseness: Record<number, PersonNode[]> = { 1: [], 2: [], 3: [] };
	for (const p of people) {
		byCloseness[p.closeness].push(p);
	}
	subset.push(...byCloseness[1].slice(0, 3));
	subset.push(...byCloseness[2].slice(0, 3));
	subset.push(...byCloseness[3].slice(0, 2));

	const subsetIds = new Set(["me", ...subset.map((p) => p.id)]);

	const filteredConnections = connections.filter(
		(c) => subsetIds.has(c.sourceId) && subsetIds.has(c.targetId),
	);

	const nodes: Node[] = [];
	nodes.push({
		id: "me",
		type: "meNode",
		position: { x: 0, y: 0 },
		data: { ...meUser, connectionCount: subset.length, isPreview: true },
	});

	const radius = 200;
	const angleStep = (2 * Math.PI) / subset.length;
	for (let i = 0; i < subset.length; i++) {
		const person = subset[i];
		const angle = angleStep * i - Math.PI / 2;
		nodes.push({
			id: person.id,
			type: "personNode",
			position: {
				x: Math.cos(angle) * radius - 60,
				y: Math.sin(angle) * radius - 30,
			},
			data: { ...person, isPreview: true },
		});
	}

	const edges: Edge[] = filteredConnections.map((conn, index) => ({
		id: `e-${conn.sourceId}-${conn.targetId}-${index}`,
		source: conn.sourceId,
		target: conn.targetId,
		type: "relationshipEdge",
		data: {
			relationship: conn.relationship,
			label: conn.label,
		},
	}));

	return { nodes, edges };
}
