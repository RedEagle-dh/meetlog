import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Palette, Search } from "lucide-react";
import { useCallback, useState } from "react";
import { ConnectionGraph } from "@/components/graph/connection-graph";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	connections as allConnections,
	people as allPeople,
	type PersonNode,
	type RelationshipType,
	relationshipBadgeClasses,
	relationshipColors,
	relationshipLabels,
} from "@/data/mock-connections";
import { withAPI } from "@/lib/api.middleware";

export const Route = createFileRoute("/_dashboard/dashboard")({
	loader: () => protectedApiRoute(),
	component: DashboardPage,
});

const protectedApiRoute = createServerFn({ method: "GET" })
	.middleware([withAPI])
	.handler(async ({ context }) => {
		const result = await context.api.get();
		return result.data;
	});

function DashboardPage() {
	const [filter, setFilter] = useState<RelationshipType | "all">("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPerson, setSelectedPerson] = useState<PersonNode | null>(
		null,
	);

	const handleNodeClick = useCallback((person: PersonNode | null) => {
		setSelectedPerson(person);
	}, []);

	// Find connections for the selected person
	const personConnections = selectedPerson
		? allConnections
				.filter(
					(c) =>
						c.sourceId === selectedPerson.id ||
						c.targetId === selectedPerson.id,
				)
				.map((c) => {
					const otherId =
						c.sourceId === selectedPerson.id
							? c.targetId
							: c.sourceId;
					const otherPerson = allPeople.find((p) => p.id === otherId);
					return {
						person: otherPerson,
						label: c.label,
						relationship: c.relationship,
					};
				})
				.filter((c) => c.person)
		: [];

	const healthcheck = useLoaderData({ from: "/_dashboard/dashboard" });

	return (
		<div className="flex h-[calc(100vh-3.5rem)] flex-col">
			{`${healthcheck?.code} ${healthcheck?.status}`}
			{/* Toolbar */}
			<div className="flex items-center gap-3 border-b px-4 py-2.5">
				<Select
					value={filter}
					onValueChange={(v) =>
						setFilter(v as RelationshipType | "all")
					}
				>
					<SelectTrigger size="sm" className="w-[160px]">
						<SelectValue placeholder="Filter" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Connections</SelectItem>
						<SelectItem value="family">Family</SelectItem>
						<SelectItem value="friend">Friends</SelectItem>
						<SelectItem value="work">Work</SelectItem>
						<SelectItem value="mentor">Mentors</SelectItem>
						<SelectItem value="acquaintance">
							Acquaintances
						</SelectItem>
					</SelectContent>
				</Select>

				<div className="relative flex-1 max-w-xs">
					<Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search people..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-8 pl-8 text-sm"
					/>
				</div>

				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline" size="sm" className="gap-2">
							<Palette className="size-3.5" />
							Legend
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-52" align="end">
						<div className="space-y-2">
							<p className="text-sm font-medium">
								Relationship Types
							</p>
							{(
								Object.entries(relationshipColors) as [
									RelationshipType,
									string,
								][]
							).map(([type, color]) => (
								<div
									key={type}
									className="flex items-center gap-2"
								>
									<div
										className="size-3 rounded-full"
										style={{ backgroundColor: color }}
									/>
									<span className="text-sm text-muted-foreground capitalize">
										{relationshipLabels[type]}
									</span>
								</div>
							))}
						</div>
					</PopoverContent>
				</Popover>
			</div>

			{/* Graph */}
			<div className="flex-1">
				<ConnectionGraph
					filter={filter}
					searchQuery={searchQuery}
					onNodeClick={handleNodeClick}
				/>
			</div>

			{/* Detail Sheet */}
			<Sheet
				open={!!selectedPerson}
				onOpenChange={(open) => {
					if (!open) setSelectedPerson(null);
				}}
			>
				<SheetContent side="right" className="overflow-y-auto">
					{selectedPerson && (
						<>
							<SheetHeader>
								<div className="flex items-center gap-3">
									<Avatar className="size-12">
										<AvatarFallback className="text-base font-medium">
											{selectedPerson.initials}
										</AvatarFallback>
									</Avatar>
									<div>
										<SheetTitle>
											{selectedPerson.name}
										</SheetTitle>
										<SheetDescription>
											{selectedPerson.role}
										</SheetDescription>
									</div>
								</div>
							</SheetHeader>

							<div className="px-4 space-y-5">
								{/* Badges */}
								<div className="flex flex-wrap gap-2">
									<span
										className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${relationshipBadgeClasses[selectedPerson.relationship]}`}
									>
										{
											relationshipLabels[
												selectedPerson.relationship
											]
										}
									</span>
									<Badge variant="outline">
										{selectedPerson.group}
									</Badge>
								</div>

								{/* Info */}
								<div className="space-y-3">
									{selectedPerson.lastContact && (
										<div>
											<p className="text-xs text-muted-foreground">
												Last Contact
											</p>
											<p className="text-sm">
												{selectedPerson.lastContact}
											</p>
										</div>
									)}
									{selectedPerson.notes && (
										<div>
											<p className="text-xs text-muted-foreground">
												Notes
											</p>
											<p className="text-sm">
												{selectedPerson.notes}
											</p>
										</div>
									)}
								</div>

								<Separator />

								{/* Connections */}
								<div>
									<p className="text-sm font-medium mb-3">
										Connections ({personConnections.length})
									</p>
									<div className="space-y-2">
										{personConnections.map((conn) => (
											<button
												type="button"
												key={conn.person?.id}
												className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-accent"
												onClick={() => {
													if (conn.person) {
														setSelectedPerson(
															conn.person as PersonNode,
														);
													}
												}}
											>
												<Avatar className="size-7">
													<AvatarFallback className="text-[10px]">
														{conn.person?.initials}
													</AvatarFallback>
												</Avatar>
												<div className="min-w-0 flex-1">
													<p className="text-sm truncate">
														{conn.person?.name}
														{conn.person?.id ===
														"me"
															? " (You)"
															: ""}
													</p>
													{conn.label && (
														<p className="text-xs text-muted-foreground truncate">
															{conn.label}
														</p>
													)}
												</div>
											</button>
										))}
									</div>
								</div>
							</div>
						</>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
}
