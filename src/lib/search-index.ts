import type { FlowerData } from '../data/types';
import { normalizeText } from './text';

/** All the text a visitor might type to find a flower, in every language, normalised. */
export function buildHaystack(flower: FlowerData): string {
  const parts = [
    flower.id,
    flower.scientificName,
    ...(flower.scientificAliases ?? []),
    flower.family,
    ...Object.values(flower.slugs),
    ...(['vi', 'en'] as const).flatMap((lang) => [flower.text[lang].name, ...(flower.text[lang].aliases ?? [])]),
  ];
  return normalizeText(parts.join(' '));
}
