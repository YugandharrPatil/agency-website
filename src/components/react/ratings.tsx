import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

export function Ratings() {
	return (
		<div className="">
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
			<div className="flex"></div>
			<p>Trusted by 10+ Clients</p>
			<p>star star star star star</p>
		</div>
	);
}
