const files = import.meta.glob('../content/articles/*.md');
type Keys = keyof typeof files;
export const k: Keys = '../content/articles/seo.md';
