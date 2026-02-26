import { db } from "@meetlog/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	trustedOrigins: ["http://localhost:3000"],
});

export { auth };
