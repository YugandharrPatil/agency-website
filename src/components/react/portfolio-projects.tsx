import axios from "axios";
import { ExternalLink } from "lucide-react";
import useSWR from "swr";

import { SUPABASE_TABLES } from "../../lib/data";
import { supabase } from "../../lib/supabase";
import type { GithubRepoType } from "../../utils/types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type PortfolioProjectsProps = {
	pathname: string;
};

async function fetchSupabaseRepos() {
	try {
		const { data: supabaseRepos, error } = await supabase.from(SUPABASE_TABLES.PROJECTS).select("*");
		if (error) {
			console.error(error.message);
		}
		return supabaseRepos;
	} catch (err) {
		console.error("Failed to fetch projects", err);
	}
}

async function fetchGithubRepos() {
	const headers: Record<string, string> = {
		"X-GitHub-Api-Version": "2022-11-28",
		Accept: "application/vnd.github+json",
	};

	const { data } = await axios.get("https://api.github.com/users/YugandharrPatil/repos", {
		params: { per_page: 100 },
		headers,
	});
	return data;
}

export default function PortfolioProjects({ pathname }: PortfolioProjectsProps) {
	const { data: supabaseRepos, isLoading: isSupabaseLoading } = useSWR("supabase-projects", fetchSupabaseRepos, {
		dedupingInterval: 60000,
	});
	const { data: githubRepos, isLoading: isGithubLoading } = useSWR("github-repos", fetchGithubRepos, {
		dedupingInterval: 60000,
	});

	const isLoading = isSupabaseLoading || isGithubLoading;

	let repos: (GithubRepoType & { demoVideo?: string })[] = [];

	if (supabaseRepos && githubRepos) {
		repos = supabaseRepos
			.map((supabaseRepo) => {
				const repo = githubRepos.find((githubRepo: GithubRepoType) => githubRepo.name === supabaseRepo.repo);
				return repo ? { ...repo, demoVideo: supabaseRepo["demo_video"] as string } : undefined;
			})
			.filter((repo): repo is GithubRepoType & { demoVideo?: string } => Boolean(repo));

		if (pathname === "/") {
			repos = repos.slice(0, 3);
		}
	}

	// loading skeleton
	if (isLoading) {
		const skeletonCount = pathname === "/" ? 3 : 6;
		return (
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: skeletonCount }).map((_, i) => (
					<Card key={i} className="flex h-full flex-col justify-between border-muted bg-card/60 p-6">
						<div className="space-y-2">
							<Skeleton className="h-7 w-1/2" />
							<Skeleton className="h-5 w-4/5" />
						</div>
						<div className="mt-4 flex gap-4">
							<Skeleton className="h-9 w-full" />
							<Skeleton className="h-9 w-full" />
						</div>
					</Card>
				))}
			</div>
		);
	}

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{repos.map((repo) => {
				return (
					<Card key={repo.id} className="flex h-full flex-col justify-between border-muted bg-card/60 p-6">
						<div className="space-y-2">
							<h3 className="text-lg font-semibold">{repo.name}</h3>
							<p className="text-sm text-muted-foreground">{repo.description}</p>
						</div>
						<div className="mt-4 flex gap-4">
							<a href={`${repo.homepage}`} target="_blank" rel="noreferrer" className="w-full">
								<Button disabled={repo.homepage === null} size="sm" className="w-full">
									Visit <ExternalLink className="h-4 w-4 ml-2" />
								</Button>
							</a>
							<a href={repo.demoVideo || undefined} target="_blank" rel="noreferrer" className="w-full">
								<Button size="sm" disabled={!repo.demoVideo} variant="secondary" className="w-full">
									{!repo.demoVideo ? "Coming soon" : "Watch Demo Video"} <ExternalLink className="h-4 w-4 ml-2" />
								</Button>
							</a>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
