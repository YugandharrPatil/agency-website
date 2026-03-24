import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
	{
		id: 1,
		question: "What are your shipping options?",
		answer: "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.",
		value: "shipping",
	},
	{
		id: 2,
		question: "What is your return policy?",
		answer: "Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7 business days.",
		value: "retuns",
	},
	{
		id: 3,
		question: "How can I contact customer support?",
		answer: "Reach us via email, live chat, or phone. We respond within 24 hours during business days.",
		value: "support",
	},
];

export default function FAQAccordion() {
	return (
		<Accordion type="single" collapsible defaultValue="shipping" className="w-full rounded-lg border border-border bg-card/60 px-4">
			{FAQS.map((faq) => {
				return (
					<AccordionItem value={`${faq.value}`} key={faq.id}>
						<AccordionTrigger>{faq.question}</AccordionTrigger>
						<AccordionContent>{faq.answer}</AccordionContent>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
