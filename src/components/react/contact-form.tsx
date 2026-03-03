"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/components/ui/input-group";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
	name: z.string().min(1, { message: "Please enter your name." }),
	email: z.email({ message: "Please enter a valid email address." }),
	message: z.string().min(1, { message: "Please enter your message." }).min(10, { message: "It should be at least 10 characters." }),
});

export default function ContactForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	async function insertDocument(dataa: any) {
		const { data: insertedData, error } = await supabase.from("messages").insert([dataa]);
		if (error) console.error(error);
	}

	async function onSubmit(data: z.infer<typeof formSchema>) {
		try {
			await insertDocument(data);
			toast("You submitted the following values:", {
				description: (
					<pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
						<code>{JSON.stringify(data, null, 2)}</code>
					</pre>
				),
				position: "bottom-right",
				classNames: {
					content: "flex flex-col gap-2",
				},
				style: {
					"--border-radius": "calc(var(--radius)  + 4px)",
				} as React.CSSProperties,
			});
			form.reset();
		} catch (err) {
			console.error(err);
			toast.error("Failed to send message");
		}
	}

	return (
		<>
			<div className="my-12" id="contact">
				<div className="text-center">
					<h1 className="heading">Contact Us</h1>
					<h2 className="sub-heading">We reply within 24 hours of your message</h2>
				</div>
				<Card className="w-full sm:max-w-md mx-auto mt-2">
					<CardHeader>
						<CardTitle>Bug Report</CardTitle>
						<CardDescription>Help us improve by reporting bugs you encounter.</CardDescription>
					</CardHeader>
					<CardContent>
						<form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
							<FieldGroup>
								<Controller
									name="name"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="form-rhf-demo-title">Your Name</FieldLabel>
											<Input {...field} id="form-rhf-demo-title" aria-invalid={fieldState.invalid} placeholder="John Doe" autoComplete="off" />
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
								<Controller
									name="email"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="form-rhf-demo-title">Your Email</FieldLabel>
											<Input {...field} id="form-rhf-demo-title" aria-invalid={fieldState.invalid} placeholder="johndoe@example.com" autoComplete="off" />
											<FieldDescription>We'll use this email to respond to your message.</FieldDescription>
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
								<Controller
									name="message"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor="form-rhf-demo-email">Your Message</FieldLabel>
											<Textarea {...field} id="form-rhf-demo-email" placeholder="I'd like to make a website for my business." rows={6} className="min-h-24 resize-none" aria-invalid={fieldState.invalid} />
											{/* <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon> */}
											{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
										</Field>
									)}
								/>
							</FieldGroup>
						</form>
					</CardContent>
					<CardFooter>
						<Field orientation="horizontal">
							<Button className="w-full" disabled={form.formState.isSubmitting} type="submit" form="form-rhf-demo">
								{form.formState.isSubmitting && <Loader2 className="spin-class-here" />}
								Submit
							</Button>
						</Field>
					</CardFooter>
				</Card>
			</div>
			<hr className="hr" />
		</>
	);
}
