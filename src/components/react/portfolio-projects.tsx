import axios from "axios";
import { ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { SUPABASE_TABLES } from "../../lib/data";
import { supabase } from "../../lib/supabase";
import type { GithubRepoType } from "../../utils/types";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type PortfolioProjectsProps = {
	pathname: string;
};

export default function PortfolioProjects({ pathname }: PortfolioProjectsProps) {
	const [repos, setRepos] = useState<GithubRepoType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const supabaseRepos = await fetchSupabaseRepos();
				const githubRepos = await fetchGithubRepos();

				let filteredRepos = supabaseRepos
					?.map((supabaseRepo) => {
						const repo = githubRepos.find((githubRepo: GithubRepoType) => githubRepo.name === supabaseRepo.repo);
						return repo ? { ...repo, demoVideo: supabaseRepo["demo_video"] } : undefined;
					})
					.filter((repo): repo is GithubRepoType & { demoVideo?: string } => Boolean(repo));

				if (pathname === "/") {
					filteredRepos = filteredRepos?.slice(0, 3);
				}

				setRepos(filteredRepos || []);
			} catch (err) {
				console.error("Failed to fetch projects", err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center p-12 w-full">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
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
