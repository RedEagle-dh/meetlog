import { Handle, Position } from "@xyflow/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	type PersonNode as PersonNodeType,
	relationshipBadgeClasses,
	relationshipLabels,
} from "@/data/mock-connections";

type PersonNodeData = PersonNodeType & { isPreview?: boolean };

export function PersonNode({ data }: { data: PersonNodeData }) {
	const badgeClass = relationshipBadgeClasses[data.relationship];

	return (
		<div className="group relative">
			<div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/90 px-3 py-2.5 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-border hover:shadow-lg">
				<Avatar className="size-9">
					<AvatarFallback className="text-xs font-medium">
						{data.initials}
					</AvatarFallback>
				</Avatar>
				<div className="min-w-0">
					<p className="text-sm font-medium text-foreground truncate leading-tight">
						{data.name}
					</p>
					{data.role && !data.isPreview && (
						<p className="text-xs text-muted-foreground truncate leading-tight">
							{data.role}
						</p>
					)}
					{!data.isPreview && (
						<span
							className={`mt-1 inline-flex items-center rounded-full border px-1.5 py-0 text-[10px] font-medium ${badgeClass}`}
						>
							{relationshipLabels[data.relationship]}
						</span>
					)}
				</div>
			</div>

			<Handle type="source" position={Position.Top} className="!bg-transparent !border-0 !w-2 !h-2 opacity-0" />
			<Handle type="target" position={Position.Bottom} className="!bg-transparent !border-0 !w-2 !h-2 opacity-0" />
		</div>
	);
}
