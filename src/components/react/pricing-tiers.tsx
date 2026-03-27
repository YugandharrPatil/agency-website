"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronRight, Cross, Info, ShieldCheck, Star, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Tier = {
	id: "growth" | "pro" | "enterprise";
	name: string;
	description: string;
	price: number;
	icon: LucideIcon;
};

type Feature = {
	name: string;
	description: string;
	plan: ("growth" | "pro" | "enterprise")[];
};

type Addon = {
	id: string;
	name: string;
	description: string;
	price: number;
};

const TIERS: Tier[] = [
	{
		id: "growth",
		name: "Growth",
		description: "Clean, minimal and performant website.",
		price: 9000,
		icon: Zap,
	},
	{
		id: "pro",
		name: "Pro",
		description: "Take things to the next level.",
		price: 15000,
		icon: Star,
	},
	{
		id: "enterprise",
		name: "Enterprise",
		description: "End to end online presence.",
		price: 25000,
		icon: ShieldCheck,
	},
];

const FEATURES: Feature[] = [
	// ALL PLANS
	{ name: "Clean, Minimal Website", description: "A highly optimized, code-light website that loads instantly and guarantees a seamless performance experience.", plan: ["growth", "pro", "enterprise"] },
	{ name: "Mobile Responsive", description: "Adaptive design ensuring your site's layout works flawlessly across mobile, tablet, and desktop screens.", plan: ["growth", "pro", "enterprise"] },
	{ name: "Live in 2 weeks", description: "Our streamlined delivery process guarantees that your website goes live within two weeks of project kickoff.", plan: ["growth", "pro", "enterprise"] },

	// ONLY GROWTH
	{ name: "2 Revision Rounds", description: "After the project is completed, upto 2 revision rounds.", plan: ["growth"] },
	{ name: "Upto 3 Pages", description: "Upto 3 pages only", plan: ["growth"] },
	{ name: "Basic Copywriting", description: "We use AI to generate high-converting copy for your website.", plan: ["growth"] },
	{ name: "Basic SEO", description: "On-page optimization including metadata, semantics, and sitemap generation to help search engines understand your site.", plan: ["growth"] },
	{ name: "Basic performance optimization", description: "Basic performance optimization", plan: ["growth"] },

	// PRO & ENTERPRISE
	{ name: "3 Revision Rounds", description: "After the project is completed, upto 3 revision rounds.", plan: ["pro", "enterprise"] },
	{ name: "Upto 8-10 Pages", description: "Upto 10 pages", plan: ["pro", "enterprise"] },
	{ name: "Advanced Copywriting", description: "We use AI to generate high-converting copy for your website.", plan: ["pro", "enterprise"] },
	{ name: "Advanced SEO", description: "Advanced SEO", plan: ["pro", "enterprise"] },
	{ name: "Advanced performance optimization", description: "Advanced performance optimization", plan: ["pro", "enterprise"] },
	{ name: "Analytics Setup", description: "Setup of analytics tools to track website traffic and user behavior.", plan: ["pro", "enterprise"] },

	// ONLY ENTERPRISE
	{ name: "Custom CMS", description: "Tailored Content Management System that gives you unparalleled control over updating and publishing content.", plan: ["pro", "enterprise"] },
	{ name: "Custom Domain Email ID", description: "Establish brand trust with professional business email addresses (e.g., hello@yourbrand.com) on your domain.", plan: ["enterprise"] },
	{ name: "Dedicated Account Manager", description: "Your own dedicated point of contact offering prioritized support and regular updates throughout the life cycle.", plan: ["enterprise"] },
];

const ADDONS: Addon[] = [
	{ id: "ecom", name: "E-Commerce Functionality", description: "Accept payments and sell products online.", price: 20000 },
	{ id: "seo", name: "Advanced SEO Optimization", description: "In-depth keyword research and competitor analysis.", price: 10000 },
	{ id: "maintenance", name: "Monthly Maintenance", description: "Server updates, backups, and minor content changes.", price: 5000 },
];

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
			<div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-3">
				{TIERS.map((tier) => {
					const isSelected = selectedTierId === tier.id;
					const IconComponent = tier.icon;
					const tierFeatures = FEATURES.filter((f) => f.plan.includes(tier.id));

					return (
						<Card
							key={tier.id}
							className={`relative transition-all duration-300 flex flex-col justify-between border-2 p-8 overflow-hidden
								${isSelected ? "border-primary bg-card dark:bg-card/90 shadow-2xl shadow-primary/20 scale-[1.02]" : "border-transparent bg-card/60"}
							`}
						>
							{isSelected && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />}

							<div className="space-y-4 relative z-10">
								<div className="flex items-center justify-between">
									<div className={`p-3 rounded-2xl ${isSelected ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
										<IconComponent className="w-6 h-6" />
									</div>
									<div
										className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
										${isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"}
									`}
									>
										{isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
									</div>
								</div>

								<div>
									<h2 className="text-2xl font-bold tracking-tight">{tier.name}</h2>
									<p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
								</div>

								<div className="flex items-baseline gap-1 mt-6">
									<span className="text-4xl font-extrabold tracking-tight">&#8377;{tier.price.toLocaleString()}</span>
								</div>
							</div>

							<div className="mt-8 space-y-4 relative z-10 flex-1">
								<div className="h-px w-full border-t border-dashed border-muted-foreground/20" />
								<div className="pt-2">
									<p className="text-[11px] uppercase tracking-wider text-center text-muted-foreground/50 font-semibold mb-4">Hover over services for details</p>
									<ul className="space-y-2.5">
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
														<li className={`flex items-start justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer group/feature ${styles.bg}`}>
															<div className="flex items-start gap-3">
																<Check className={`mt-0.5 h-5 w-5 shrink-0 transition-colors ${styles.icon}`} />
																<span className={`text-sm tracking-wide underline decoration-muted-foreground/40 decoration-dashed underline-offset-4 ${styles.text}`}>{feature.name}</span>
															</div>
															<Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover/feature:text-foreground/80" />
														</li>
													</HoverCardTrigger>
													<HoverCardContent side="right" className="w-80 p-4">
														<div className="space-y-1">
															<h4 className="text-sm font-semibold">{feature.name}</h4>
															<p className="text-sm text-balance text-muted-foreground">{feature.description}</p>
														</div>
													</HoverCardContent>
												</HoverCard>
											);
										})}
									</ul>
								</div>
							</div>
							<div className="pt-8 relative z-10 mt-auto">
								<Button className="w-full font-semibold" size="lg" variant={isSelected ? "default" : "outline"} onClick={() => handleTierSelect(tier.id)}>
									{isSelected ? "Selected" : `Select ${tier.name}`}
								</Button>
							</div>
						</Card>
					);
				})}
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

						return (
							<Card
								key={addon.id}
								onClick={() => toggleAddon(addon.id)}
								className={`cursor-pointer transition-all duration-300 p-5 flex flex-col border-2 group hover:shadow-lg
									${isSelected ? "border-primary bg-primary/5" : "border-transparent bg-card/60 hover:bg-card"}
								`}
							>
								<div className="flex justify-between items-start mb-3">
									<h4 className="font-semibold">{addon.name}</h4>
									<Checkbox checked={isSelected} onCheckedChange={() => toggleAddon(addon.id)} onClick={(e) => e.stopPropagation()} className="mt-0.5 size-5" />
								</div>
								<p className="text-xs text-muted-foreground mb-4 flex-1">{addon.description}</p>
								<div className="mt-auto inline-flex px-3 py-1 bg-muted rounded-full text-sm font-semibold w-fit">+ &#8377;{addon.price}</div>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
