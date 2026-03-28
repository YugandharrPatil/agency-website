import type { Addon } from "@/lib/data";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

type AddOnProps = {
	addon: Addon;
	toggleAddon: (id: string) => void;
	isSelected: boolean;
};

export default function AddOn({ addon, toggleAddon, isSelected }: AddOnProps) {
	return (
		<div>
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
				<div className="mt-auto inline-flex px-3 py-1 bg-muted rounded-full text-sm font-semibold w-fit">
					+ &#8377;
					{addon.price}
					{addon.id === "page-addon" && " /page"}
				</div>
			</Card>
		</div>
	);
}
