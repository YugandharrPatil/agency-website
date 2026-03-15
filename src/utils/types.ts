export type GithubRepoType = {
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	private: boolean;

	owner: {
		login: string;
		id: number;
		avatar_url: string;
		html_url: string;
		type: "User" | "Organization";
	};

	html_url: string;
	description: string | null;
	fork: boolean;
	url: string;

	created_at: string;
	updated_at: string;
	pushed_at: string;

	homepage: string | null;
	size: number;
	stargazers_count: number;
	watchers_count: number;
	language: string | null;
	forks_count: number;
	open_issues_count: number;

	default_branch: string;

	archived: boolean;
	disabled: boolean;

	topics: string[];

	demoVideo?: string; // custom

	visibility: "public" | "private" | "internal";
};
