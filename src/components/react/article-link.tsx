interface ArticleLinkProps<T extends string> {
	id: T;
	title: string;
}

export function ArticleLink<T extends string>({ id, title }: ArticleLinkProps<T>) {
	return <a href={`/articles/${id}`}>{title}</a>;
}
