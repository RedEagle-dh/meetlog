import { Handle, Position } from "@xyflow/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type MeNodeData = {
	name: string;
	initials: string;
	connectionCount: number;
	isPreview?: boolean;
};

export function MeNode({ data }: { data: MeNodeData }) {
	return (
		<div className="group relative flex flex-col items-center">
			{/* Glow ring */}
			<div className="absolute -inset-3 rounded-full bg-primary/20 blur-xl animate-pulse" />

			<div className="relative flex flex-col items-center gap-2 rounded-2xl border border-primary/30 bg-card px-6 py-4 shadow-lg shadow-primary/10">
				<Avatar className="size-14">
					<AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
						{data.initials}
					</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<p className="text-sm font-semibold text-foreground">
						{data.name}
					</p>
					{!data.isPreview && (
						<p className="text-xs text-muted-foreground">
							{data.connectionCount} connections
						</p>
					)}
				</div>
			</div>

			<Handle type="source" position={Position.Top} className="!bg-primary/50 !border-0 !w-2 !h-2 opacity-0" />
			<Handle type="target" position={Position.Bottom} className="!bg-primary/50 !border-0 !w-2 !h-2 opacity-0" />
		</div>
	);
}
