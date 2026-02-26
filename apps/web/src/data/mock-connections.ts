export type RelationshipType =
	| "family"
	| "friend"
	| "work"
	| "acquaintance"
	| "mentor";

export type PersonNode = {
	id: string;
	name: string;
	initials: string;
	role?: string;
	relationship: RelationshipType;
	group: string;
	closeness: 1 | 2 | 3;
	lastContact?: string;
	notes?: string;
};

export type ConnectionEdge = {
	sourceId: string;
	targetId: string;
	relationship: RelationshipType;
	label?: string;
};

export const relationshipColors: Record<RelationshipType, string> = {
	family: "#f472b6",
	friend: "#34d399",
	work: "#60a5fa",
	acquaintance: "#fbbf24",
	mentor: "#a78bfa",
};

export const relationshipBadgeClasses: Record<RelationshipType, string> = {
	family: "bg-pink-500/20 text-pink-400 border-pink-500/30",
	friend: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
	work: "bg-blue-500/20 text-blue-400 border-blue-500/30",
	acquaintance: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	mentor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export const relationshipLabels: Record<RelationshipType, string> = {
	family: "Family",
	friend: "Friend",
	work: "Work",
	acquaintance: "Acquaintance",
	mentor: "Mentor",
};

export const meUser = {
	id: "me",
	name: "You",
	initials: "ME",
	role: "The Center of Your Universe",
};

export const people: PersonNode[] = [
	// Immediate Family - closeness 1
	{
		id: "sarah",
		name: "Sarah Chen",
		initials: "SC",
		role: "Wife",
		relationship: "family",
		group: "Immediate Family",
		closeness: 1,
		lastContact: "Today",
		notes: "Partner in crime. Loves hiking and photography.",
	},
	{
		id: "linda",
		name: "Linda Chen",
		initials: "LC",
		role: "Mom",
		relationship: "family",
		group: "Immediate Family",
		closeness: 1,
		lastContact: "Yesterday",
		notes: "Calls every Sunday. Great cook.",
	},
	{
		id: "robert",
		name: "Robert Chen",
		initials: "RC",
		role: "Dad",
		relationship: "family",
		group: "Immediate Family",
		closeness: 1,
		lastContact: "Yesterday",
		notes: "Retired engineer. Chess enthusiast.",
	},

	// Extended Family - closeness 2
	{
		id: "jim",
		name: "Uncle Jim",
		initials: "UJ",
		role: "Uncle",
		relationship: "family",
		group: "Extended Family",
		closeness: 2,
		lastContact: "2 weeks ago",
		notes: "Lives in Portland. Runs a bakery.",
	},
	{
		id: "amy",
		name: "Amy Chen",
		initials: "AC",
		role: "Cousin",
		relationship: "family",
		group: "Extended Family",
		closeness: 2,
		lastContact: "1 month ago",
		notes: "Medical student. Shares music recommendations.",
	},

	// Close Friends - closeness 1
	{
		id: "jake",
		name: "Jake Wilson",
		initials: "JW",
		role: "Best Friend",
		relationship: "friend",
		group: "College Friends",
		closeness: 1,
		lastContact: "3 days ago",
		notes: "Met freshman year. Fantasy football league co-manager.",
	},
	{
		id: "priya",
		name: "Priya Patel",
		initials: "PP",
		role: "Close Friend",
		relationship: "friend",
		group: "College Friends",
		closeness: 2,
		lastContact: "1 week ago",
		notes: "Study group partner turned lifelong friend.",
	},

	// Book Club - closeness 2-3
	{
		id: "marcus",
		name: "Marcus Lee",
		initials: "ML",
		role: "Book Club Buddy",
		relationship: "friend",
		group: "Book Club",
		closeness: 2,
		lastContact: "5 days ago",
		notes: "Loves sci-fi. Great taste in whiskey.",
	},
	{
		id: "olivia",
		name: "Olivia Brown",
		initials: "OB",
		role: "Book Club Member",
		relationship: "friend",
		group: "Book Club",
		closeness: 3,
		lastContact: "2 weeks ago",
		notes: "Teacher. Recommends the best non-fiction.",
	},

	// Work - Acme Corp - closeness 1-2
	{
		id: "alex",
		name: "Alex Rivera",
		initials: "AR",
		role: "Tech Lead",
		relationship: "work",
		group: "Acme Corp",
		closeness: 1,
		lastContact: "Today",
		notes: "Direct manager. Great mentor. Loves Rust.",
	},
	{
		id: "diana",
		name: "Diana Kim",
		initials: "DK",
		role: "Design Partner",
		relationship: "work",
		group: "Acme Corp",
		closeness: 1,
		lastContact: "Today",
		notes: "UI/UX designer. Always has the best snack stash.",
	},
	{
		id: "tom",
		name: "Tom Nguyen",
		initials: "TN",
		role: "Backend Dev",
		relationship: "work",
		group: "Acme Corp",
		closeness: 2,
		lastContact: "2 days ago",
		notes: "Database wizard. Organizes team lunch outings.",
	},

	// Previous Job - closeness 3
	{
		id: "rachel",
		name: "Rachel Foster",
		initials: "RF",
		role: "Ex-Colleague",
		relationship: "work",
		group: "Previous Job",
		closeness: 3,
		lastContact: "3 months ago",
		notes: "Former PM at Startup Inc. Still connects on LinkedIn.",
	},

	// Mentors - closeness 2
	{
		id: "james",
		name: "Dr. James Park",
		initials: "JP",
		role: "Career Mentor",
		relationship: "mentor",
		group: "Professional",
		closeness: 2,
		lastContact: "1 month ago",
		notes: "VP of Engineering at BigTech. Monthly coffee chats.",
	},
	{
		id: "elena",
		name: "Prof. Elena Vasquez",
		initials: "EV",
		role: "Academic Advisor",
		relationship: "mentor",
		group: "Academic",
		closeness: 2,
		lastContact: "2 months ago",
		notes: "CS professor. Sparked my love for distributed systems.",
	},

	// Acquaintances - closeness 3
	{
		id: "sam",
		name: "Sam Thompson",
		initials: "ST",
		role: "Neighbor",
		relationship: "acquaintance",
		group: "Neighborhood",
		closeness: 3,
		lastContact: "1 week ago",
		notes: "Lives next door. Borrows and returns tools promptly.",
	},
	{
		id: "mia",
		name: "Mia Johnson",
		initials: "MJ",
		role: "Gym Buddy",
		relationship: "acquaintance",
		group: "Gym",
		closeness: 3,
		lastContact: "4 days ago",
		notes: "Morning workout crew. Runs half-marathons.",
	},
	{
		id: "carlos",
		name: "Carlos Garcia",
		initials: "CG",
		role: "Conference Contact",
		relationship: "acquaintance",
		group: "Conference",
		closeness: 3,
		lastContact: "6 months ago",
		notes: "Met at ReactConf. Works on open-source tooling.",
	},
];

export const connections: ConnectionEdge[] = [
	// Everyone connects to "me"
	{ sourceId: "me", targetId: "sarah", relationship: "family" },
	{ sourceId: "me", targetId: "linda", relationship: "family" },
	{ sourceId: "me", targetId: "robert", relationship: "family" },
	{ sourceId: "me", targetId: "jim", relationship: "family" },
	{ sourceId: "me", targetId: "amy", relationship: "family" },
	{ sourceId: "me", targetId: "jake", relationship: "friend" },
	{ sourceId: "me", targetId: "priya", relationship: "friend" },
	{ sourceId: "me", targetId: "marcus", relationship: "friend" },
	{ sourceId: "me", targetId: "olivia", relationship: "friend" },
	{ sourceId: "me", targetId: "alex", relationship: "work" },
	{ sourceId: "me", targetId: "diana", relationship: "work" },
	{ sourceId: "me", targetId: "tom", relationship: "work" },
	{ sourceId: "me", targetId: "rachel", relationship: "work" },
	{ sourceId: "me", targetId: "james", relationship: "mentor" },
	{ sourceId: "me", targetId: "elena", relationship: "mentor" },
	{ sourceId: "me", targetId: "sam", relationship: "acquaintance" },
	{ sourceId: "me", targetId: "mia", relationship: "acquaintance" },
	{ sourceId: "me", targetId: "carlos", relationship: "acquaintance" },

	// Inter-person connections
	{ sourceId: "linda", targetId: "robert", relationship: "family", label: "Married" },
	{ sourceId: "linda", targetId: "jim", relationship: "family", label: "Siblings" },
	{ sourceId: "jim", targetId: "amy", relationship: "family", label: "Parent" },
	{ sourceId: "sarah", targetId: "linda", relationship: "family", label: "In-laws" },
	{ sourceId: "jake", targetId: "priya", relationship: "friend", label: "College friends" },
	{ sourceId: "alex", targetId: "diana", relationship: "work", label: "Same team" },
	{ sourceId: "alex", targetId: "tom", relationship: "work", label: "Same team" },
	{ sourceId: "diana", targetId: "tom", relationship: "work", label: "Same team" },
	{ sourceId: "marcus", targetId: "olivia", relationship: "friend", label: "Book club" },
	{ sourceId: "james", targetId: "alex", relationship: "mentor", label: "Former mentee" },
];
