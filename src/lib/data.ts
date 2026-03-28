import { Star, Zap, type LucideIcon } from "lucide-react";

export const SUPABASE_TABLES = {
	PROJECTS: "agency_projects",
	MESSAGES: "agency_messages",
} as const;

type Tier = {
	id: "growth" | "pro" /* | "enterprise" */;
	name: string;
	description: string;
	price: number;
	icon: LucideIcon;
};

export type Addon = {
	id: string;
	name: string;
	description: string;
	price: number;
};

export const TIERS: Tier[] = [
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
	/* {
		id: "enterprise",
		name: "Enterprise",
		description: "End to end online presence.",
		price: 25000,
		icon: ShieldCheck,
	}, */
];

type Feature = {
	id: number;
	name: string;
	description: string;
	articleId?: string;
	plan: ("growth" | "pro" /* | "enterprise" */)[];
};

export const FEATURES: Feature[] = [
	// ALL PLANS (no upgrade available)
	{ id: 1, name: "Clean, Minimal Website", description: "A highly optimized, code-light website that loads instantly and guarantees a seamless performance experience.", plan: ["growth", "pro"] },
	{ id: 2, name: "Mobile Responsive", description: "Adaptive design ensuring your site's layout works flawlessly across mobile, tablet, and desktop screens.", plan: ["growth", "pro"] },
	{ id: 3, name: "Live in 2 weeks**", description: "Our streamlined delivery process guarantees that your website goes live within two weeks of project kickoff.", plan: ["growth", "pro"] },

	// ONLY GROWTH (upgrade available)
	{ id: 1, name: "Upto 3 Pages", description: "Upto 3 pages only", plan: ["growth"] },
	{ id: 2, name: "Basic Copywriting", description: "We use AI to generate high-converting copy for your website.", plan: ["growth"] },
	{ id: 3, name: "Basic SEO", description: "On-page optimization including metadata, semantics, and sitemap generation to help search engines understand your site (meta tags, sitemap, google indexing, structure)", plan: ["growth"] },
	{ id: 4, name: "Basic performance optimization", description: "Core Web Vitals", plan: ["growth"] },
	{ id: 5, name: "2 Revision Rounds***", description: "After the project is completed, upto 2 revision rounds.", plan: ["growth"] },

	// ONLY PRO (upgraded and new)
	{ id: 1, name: "Upto 8-10 Pages", description: "Upto 10 pages", plan: ["pro"] },
	{ id: 2, name: "Advanced Copywriting with AI", description: "We use AI to generate high-converting copy for your website.", articleId: "copywriting", plan: ["pro"] },
	{ id: 3, name: "Advanced SEO", description: "Keyword targetting, page optimization. ", articleId: "seo", plan: ["pro"] },
	{ id: 4, name: "Advanced performance optimization", description: "Core Web Vitals, image compression, caching", articleId: "performance", plan: ["pro"] },
	{ id: 5, name: "3 Revision Rounds", description: "After the project is completed, upto 3 revision rounds.", plan: ["pro"] },
	{ id: 6, name: "Custom Branding", description: "custom brand colors, font packages, graphics & illustrations tailored to your brand", articleId: "branding", plan: ["pro"] },
	{ id: 7, name: "2 Weeks Post Launch Support", description: "2 weeks of support after the website goes live.", plan: ["pro"] },

	// ONLY ENTERPRISE
	/* { name: "Custom Domain Email ID", description: "Establish brand trust with professional business email addresses (e.g., hello@yourbrand.com) on your domain.", plan: ["enterprise"] },
	{ name: "Dedicated Account Manager", description: "Your own dedicated point of contact offering prioritized support and regular updates throughout the life cycle.", plan: ["enterprise"] }, */
];

export const ADDONS: Addon[] = [
	{ id: "cms", name: "Custom CMS", description: "Tailored Content Management System that gives you complete control over updating and publishing content.", price: 5000 },
	{ id: "email", name: "Custom Domain Email ID", description: "Establish brand trust with professional business email addresses (e.g., hello@yourbrand.com) on your domain.", price: 2000 },
	{ id: "analytics", name: "Analytics Setup", description: "Setup of analytics tools to track website traffic and user behavior.", price: 500 },
	{ id: "ecom-store", name: "E-Commerce Store Creation", description: "Create an online store to sell products with payment gateway integration.", price: 15000 },
	{ id: "maintenance", name: "Monthly Maintenance", description: "Server updates, backups, and minor content changes.", price: 5000 },
	{ id: "page-addon", name: "Additional Pages", description: "Additional pages for your website.", price: 500 },
	// { id: "seo", name: "Advanced SEO Optimization", description: "In-depth keyword research and competitor analysis.", price: 10000 },
];
