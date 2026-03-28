"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ADDONS, FEATURES, TIERS } from "@/lib/data";
import { Check, ChevronRight, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AddOn from "./add-on";

const TOAST_ID = "pricing-selection-toast";

export default function PricingTiers() {
	const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
	const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
	const toastDismissedByUser = useRef(false);

	const handleTierSelect = (id: string) => {
		if (selectedTierId === id) {
			setSelectedTierId(null);
		} else {
			setSelectedTierId(id);
			toastDismissedByUser.current = false;
		}
	};

	const toggleAddon = (id: string) => {
		const newAddons = new Set(selectedAddons);
		if (newAddons.has(id)) {
			newAddons.delete(id);
		} else {
			newAddons.add(id);
			toastDismissedByUser.current = false;
		}
		setSelectedAddons(newAddons);
	};

	const handleContactClick = () => {
		const tier = TIERS.find((t) => t.id === selectedTierId);

		let message = `Hi, I'm interested in the ${tier?.name} package.`;

		if (selectedAddons.size > 0) {
			const addonNames = Array.from(selectedAddons).map((id) => ADDONS.find((a) => a.id === id)?.name);
			message += `\n\nI would also like to include the following add-ons:\n- ${addonNames.join("\n- ")}`;
		}

		message += "\n\nPlease let me know the next steps.";

		window.location.href = `/contact?message=${encodeURIComponent(message)}`;
	};

	const hasSelection = selectedTierId !== null || selectedAddons.size > 0;

	useEffect(() => {
		if (hasSelection && !toastDismissedByUser.current) {
			const tier = TIERS.find((t) => t.id === selectedTierId);
			const tierLabel = tier ? `${tier.name} Package` : "";
			const addonLabel = selectedAddons.size > 0 ? `${selectedAddons.size} Add-on${selectedAddons.size > 1 ? "s" : ""}` : "";
			const summary = [tierLabel, addonLabel].filter(Boolean).join(" + ");

			const planPrice = tier?.price || 0;
			const addonsPrice = Array.from(selectedAddons).reduce((total, id) => {
				const addon = ADDONS.find((a) => a.id === id);
				return total + (addon?.price || 0);
			}, 0);
			const totalPrice = planPrice + addonsPrice;

			toast(
				<div className="space-y-1">
					<p className="text-sm font-medium text-muted-foreground">Ready to get started?</p>
					<p className="text-sm font-semibold truncate">{summary}</p>
					<p className="text-base font-bold whitespace-nowrap">Total: &#8377;{totalPrice.toLocaleString()}</p>
				</div>,
				{
					id: TOAST_ID,
					duration: Infinity,
					onDismiss: () => {
						toastDismissedByUser.current = true;
					},
					closeButton: true,
					classNames: {
						content: "flex-1 min-w-0",
					},
					action: (
						<Button size="sm" disabled={!selectedTierId} className="toast-action shrink-0 flex items-center justify-center gap-1.5 group" onClick={handleContactClick}>
							{selectedTierId ? "Contact Us" : "Select a Package"}
							{selectedTierId && <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
						</Button>
					),
				},
			);
		} else if (!hasSelection) {
			toast.dismiss(TOAST_ID);
			toastDismissedByUser.current = false;
		}
	}, [selectedTierId, selectedAddons, hasSelection]);

	return (
		<div className="space-y-16">
			{/* Pricing Cards */}
			<div className="grid max-w-4xl gap-6 mx-auto md:grid-cols-2 justify-center">
				{TIERS.map((tier) => {
					const isSelected = selectedTierId === tier.id;
					const IconComponent = tier.icon;
					const tierFeatures = [...FEATURES]
						.sort((a, b) => {
							const getPriority = (plan: string[]) => {
								if (plan.includes("growth") && plan.includes("pro")) return 0;
								if (plan.includes("growth") && plan.length === 1) return 1;
								if (plan.includes("pro") && plan.length === 1) return 2;
								return 3;
							};
							const priorityA = getPriority(a.plan);
							const priorityB = getPriority(b.plan);
							if (priorityA !== priorityB) {
								return priorityA - priorityB;
							}
							return a.id - b.id;
						})
						.filter((f) => f.plan.includes(tier.id));

					return (
						<Card
							key={tier.id}
							className={`relative transition-all duration-300 flex flex-col justify-between border-2 p-6 overflow-hidden
								${isSelected ? "border-primary bg-card dark:bg-card/90 shadow-2xl shadow-primary/20" : "border-transparent bg-card/60"}
							`}
						>
							{isSelected && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />}

							<div className="space-y-3 relative z-10">
								<div className="flex items-center justify-between">
									<div className={`p-2.5 rounded-2xl ${isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
										<IconComponent className="w-5 h-5" />
									</div>

									<Checkbox checked={isSelected} onCheckedChange={() => handleTierSelect(tier.id)} className="size-5" />
								</div>

								<div>
									<h2 className="text-xl font-bold tracking-tight">{tier.name}</h2>
									<p className="text-xs text-muted-foreground mt-1">{tier.description}</p>
								</div>

								<div className="flex items-baseline gap-1 mt-4">
									<span className="text-3xl font-extrabold tracking-tight">
										&#8377;{tier.price.toLocaleString()}
										<sup>*</sup>
									</span>
								</div>
							</div>

							<div className="mt-6 space-y-3 relative z-10 flex-1">
								<div className="h-px w-full border-t border-dashed border-muted-foreground/20" />
								<div className="pt-2">
									<p className="text-[10px] uppercase tracking-wider text-center text-muted-foreground/50 font-semibold mb-3">Hover over services for details</p>
									<ul className="space-y-2">
										{tierFeatures.map((feature, i) => {
											let featureColor: "gray" | "green" | "purple" = "gray";
											if (!feature.plan.includes("growth")) {
												featureColor = feature.plan.includes("pro") ? "green" : "purple";
											}

											const colorMap = {
												gray: {
													icon: "text-gray-400 dark:text-gray-500",
													bg: "bg-gray-500/10 dark:bg-gray-500/15 hover:bg-gray-500/20 dark:hover:bg-gray-500/25",
													text: "text-gray-700 dark:text-gray-400",
												},
												green: {
													icon: "text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]",
													bg: "bg-emerald-500/10 dark:bg-emerald-500/20 hover:bg-emerald-500/20 dark:hover:bg-emerald-500/30",
													text: "text-emerald-800 dark:text-emerald-400 font-semibold",
												},
												purple: {
													icon: "text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]",
													bg: "bg-purple-500/10 dark:bg-purple-500/20 hover:bg-purple-500/20 dark:hover:bg-purple-500/30",
													text: "text-purple-800 dark:text-purple-400 font-semibold",
												},
											};
											const styles = colorMap[featureColor];

											return (
												<HoverCard key={i} openDelay={150}>
													<HoverCardTrigger asChild>
														<li className={`flex items-start justify-between gap-2 px-2.5 py-2 rounded-lg transition-colors cursor-pointer group/feature ${styles.bg}`}>
															<div className="flex items-start gap-2">
																<Check className={`mt-0.5 h-4 w-4 shrink-0 transition-colors ${styles.icon}`} />
																<span className={`text-xs tracking-wide underline decoration-muted-foreground/40 decoration-dashed underline-offset-4 ${styles.text}`}>{feature.name}</span>
															</div>
															<Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover/feature:text-foreground/80" />
														</li>
													</HoverCardTrigger>
													<HoverCardContent side="right" className="w-80 p-4">
														<div className="space-y-1">
															<h4 className="text-sm font-semibold">{feature.name}</h4>
															<p className="text-sm text-balance text-muted-foreground">{feature.description}</p>
															{feature.articleId && (
																<a href={`/about/${feature.articleId}`} className="text-xs text-blue-500 hover:underline">
																	Learn more
																</a>
															)}
														</div>
													</HoverCardContent>
												</HoverCard>
											);
										})}
									</ul>
								</div>
							</div>
							<div className="pt-6 relative z-10 mt-auto">
								<Button className="w-full font-semibold" variant={isSelected ? "default" : "outline"} onClick={() => handleTierSelect(tier.id)}>
									{isSelected ? "Selected" : `Select ${tier.name}`}
								</Button>
							</div>
						</Card>
					);
				})}
			</div>

			<div className="max-w-4xl mx-auto space-y-2">
				{/* <p className="text-xs text-muted-foreground">*The prices listed are starting prices and may vary depending on the specific requirements of your project. A final quote will be provided after a detailed discussion of your needs.</p> */}
				<ul className="space-y-2">
					{["*Hosting and domain costs not included", "**Timeline depends on client promptness", "***Revisions include small changes, not entire redesigns or new feature implementations"].map((note, i) => (
						<li key={i} className="text-sm text-muted-foreground">
							{note}
						</li>
					))}
				</ul>
			</div>

			{/* Add-ons Section */}
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="text-center space-y-2">
					<h3 className="text-2xl font-semibold tracking-tight">Level up your package</h3>
					<p className="text-muted-foreground">Select optional add-ons to enhance your project</p>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{ADDONS.map((addon) => {
						const isSelected = selectedAddons.has(addon.id);

						return <AddOn key={addon.id} addon={addon} toggleAddon={toggleAddon} isSelected={isSelected} />;
					})}
				</div>
			</div>
		</div>
	);
}
