import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { createServerAPI } from "./eden";

export const withAPI = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const headers = getRequestHeaders();
		const api = createServerAPI(headers);
		return next({ context: { api } });
	},
);
