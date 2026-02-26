import { treaty } from "@elysiajs/eden";
import type { App } from "@meetlog/api/src";

function createServerAPI(headers: Headers) {
	return treaty<App>("http://localhost:3001", {
		headers: {
			Cookie: headers.get("cookie") ?? "",
		},
	});
}

const clientApi = treaty<App>("http://localhost:3001", {
	fetch: {
		credentials: "include",
	},
});

export { clientApi, createServerAPI };
