import { BaseEdge, type EdgeProps, getBezierPath } from "@xyflow/react";
import {
	type RelationshipType,
	relationshipColors,
} from "@/data/mock-connections";

type RelationshipEdgeData = {
	relationship: RelationshipType;
	label?: string;
};

export function RelationshipEdge({
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	data,
	markerEnd,
}: EdgeProps) {
	const [edgePath] = getBezierPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
	});

	const edgeData = data as RelationshipEdgeData | undefined;
	const color = edgeData
		? relationshipColors[edgeData.relationship]
		: "oklch(0.5 0 0)";

	return (
		<BaseEdge
			path={edgePath}
			markerEnd={markerEnd}
			style={{
				stroke: color,
				strokeWidth: 1.5,
				opacity: 0.4,
			}}
		/>
	);
}
