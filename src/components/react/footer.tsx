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
		<footer>
			<div className="mt-8 flex gap-2 max-xl:justify-center">
				{LINKS.map((link) => (
					<a target="_blank" className="block" href={link.URL}>
						<FontAwesomeIcon icon={link.icon} className={`mx-1 text-2xl transition duration-300 ease-in-out hover:text-slate-400`} />
					</a>
				))}
			</div>
		</footer>
	);
}
