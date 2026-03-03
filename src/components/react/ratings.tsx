import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarImage,
} from "@/components/ui/avatar";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Ratings() {
	return (
		<div className="flex items-center gap-4 md:gap-6">
			<AvatarGroup className="grayscale">
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
					<AvatarFallback>LR</AvatarFallback>
				</Avatar>
				<Avatar>
					<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
					<AvatarFallback>ER</AvatarFallback>
				</Avatar>
			</AvatarGroup>

			<div className="flex flex-col gap-1">
				<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
					Trusted by 10+ clients
				</p>
				<div className="flex items-center gap-1 text-amber-400">
						<FontAwesomeIcon icon={faStar} aria-hidden="true" />
						<FontAwesomeIcon icon={faStar} aria-hidden="true" />
						<FontAwesomeIcon icon={faStar} aria-hidden="true" />
						<FontAwesomeIcon icon={faStar} aria-hidden="true" />
						<FontAwesomeIcon icon={faStar} aria-hidden="true" />
					<span className="sr-only">5 out of 5 star rating</span>
				</div>
			</div>
		</div>
	);
}
