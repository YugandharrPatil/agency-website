import { faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LinkType = {
	id: string;
	URL: string;
	icon: any;
	// IconDefinition;
	color: string;
};

const LINKS: LinkType[] = [
	{
		id: "twitter",
		URL: "https://twitter.com/the_yugandharr",
		icon: faTwitter,
		color: "#1da1f2",
	},
	{
		id: "instagram",
		URL: "https://www.instagram.com/the_yugandharr/",
		icon: faInstagram,
		color: "#C13584",
	},
	{
		id: "github",
		URL: "https://github.com/YugandharrPatil",
		icon: faGithub,
		color: "#5D6BC1",
	},
	{
		id: "email",
		URL: "mailto:yugandharrpatil@gmail.com",
		icon: faEnvelope,
		color: "#94a3b8",
	},
];

export default function Footer() {
	return (
		<footer className="border-t bg-background/80">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
				<p className="order-2 sm:order-1">
					&copy; {new Date().getFullYear()} Agency. All rights reserved.
				</p>
				<div className="order-1 flex items-center gap-3 sm:order-2">
					{LINKS.map((link) => (
						<a key={link.id} target="_blank" rel="noreferrer" className="block" href={link.URL}>
							<FontAwesomeIcon
								icon={link.icon}
								className="mx-1 text-lg text-muted-foreground transition-colors hover:text-foreground"
							/>
						</a>
					))}
				</div>
			</div>
		</footer>
	);
}
