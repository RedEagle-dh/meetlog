import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signUp } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth/signUp/")({
	component: SignUpPage,
});

function SignUpPage() {
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirm: "",
		},
		onSubmit: async ({ value }) => {
			await signUp.email({
				name: value.name,
				email: value.email,
				password: value.password,
				callbackURL: "/dashboard",
			});
		},
	});

	return (
		<div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-sm">
				<CardHeader className="text-center">
					<div className="mx-auto mb-2 flex items-center gap-2">
						<Network className="size-5 text-primary" />
						<span className="text-lg font-bold">MeetLog</span>
					</div>
					<CardTitle className="text-xl">
						Create your account
					</CardTitle>
					<CardDescription>
						Start mapping your connections today.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Button variant="outline" className="w-full gap-2">
						<svg
							className="size-4"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
						</svg>
						Continue with Discord
					</Button>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<Separator className="w-full" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-card px-2 text-muted-foreground">
								or
							</span>
						</div>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<div className="flex flex-col gap-3">
							<form.Field
								name="name"
								validators={{
									onChange: ({ value }) =>
										!value ? "Name is required" : undefined,
								}}
							>
								{(field) => (
									<div className="space-y-1.5">
										<Label htmlFor={field.name}>
											Full Name
										</Label>
										<Input
											id={field.name}
											type="text"
											placeholder="Alice Johnson"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors.map(
											(error) => (
												<p
													key={error as string}
													className="text-sm text-destructive"
												>
													{error}
												</p>
											),
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="email"
								validators={{
									onChange: ({ value }) => {
										if (!value) return "Email is required";
										if (
											!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
												value,
											)
										)
											return "Invalid email address";
										return undefined;
									},
								}}
							>
								{(field) => (
									<div className="space-y-1.5">
										<Label htmlFor={field.name}>
											Email
										</Label>
										<Input
											id={field.name}
											type="email"
											placeholder="alice@example.com"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors.map(
											(error) => (
												<p
													key={error as string}
													className="text-sm text-destructive"
												>
													{error}
												</p>
											),
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="password"
								validators={{
									onChange: ({ value }) => {
										if (!value)
											return "Password is required";
										if (value.length < 8)
											return "Password must be at least 8 characters";
										return undefined;
									},
								}}
							>
								{(field) => (
									<div className="space-y-1.5">
										<Label htmlFor={field.name}>
											Password
										</Label>
										<Input
											id={field.name}
											type="password"
											placeholder="Create a password"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors.map(
											(error) => (
												<p
													key={error as string}
													className="text-sm text-destructive"
												>
													{error}
												</p>
											),
										)}
									</div>
								)}
							</form.Field>

							<form.Field
								name="passwordConfirm"
								validators={{
									onChangeListenTo: ["password"],
									onChange: ({ value, fieldApi }) => {
										if (!value)
											return "Please confirm your password";
										if (
											value !==
											fieldApi.form.getFieldValue(
												"password",
											)
										)
											return "Passwords do not match";
										return undefined;
									},
								}}
							>
								{(field) => (
									<div className="space-y-1.5">
										<Label htmlFor={field.name}>
											Confirm Password
										</Label>
										<Input
											id={field.name}
											type="password"
											placeholder="Confirm your password"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
										/>
										{field.state.meta.errors.map(
											(error) => (
												<p
													key={error as string}
													className="text-sm text-destructive"
												>
													{error}
												</p>
											),
										)}
									</div>
								)}
							</form.Field>
						</div>

						<form.Subscribe
							selector={(state) => [
								state.canSubmit,
								state.isSubmitting,
							]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									disabled={!canSubmit}
									className="w-full mt-3"
								>
									{isSubmitting
										? "Creating account..."
										: "Create Account"}
								</Button>
							)}
						</form.Subscribe>
					</form>
				</CardContent>
				<CardFooter className="justify-center">
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<Link
							to="/signIn"
							className="font-medium text-foreground hover:underline"
						>
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
