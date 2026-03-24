import { elements as rawElements } from './utils/constants';
import { ElementData, ElementCategory } from './types';

export type { ElementData };

function getCoords(n: number) {
  if (n === 1) return { x: 1, y: 1 };
  if (n === 2) return { x: 18, y: 1 };
  if (n >= 3 && n <= 4) return { x: n - 2, y: 2 };
  if (n >= 5 && n <= 10) return { x: n + 8, y: 2 };
  if (n >= 11 && n <= 12) return { x: n - 10, y: 3 };
  if (n >= 13 && n <= 18) return { x: n + 0, y: 3 };
  if (n >= 19 && n <= 36) return { x: n - 18, y: 4 };
  if (n >= 37 && n <= 54) return { x: n - 36, y: 5 };
  if (n >= 55 && n <= 56) return { x: n - 54, y: 6 };
  if (n >= 57 && n <= 71) return { x: n - 54, y: 9 }; // Lanthanides
  if (n >= 72 && n <= 86) return { x: n - 68, y: 6 };
  if (n >= 87 && n <= 88) return { x: n - 86, y: 7 };
  if (n >= 89 && n <= 103) return { x: n - 86, y: 10 }; // Actinides
  if (n >= 104 && n <= 118) return { x: n - 100, y: 7 };
  return { x: 0, y: 0 };
}

export const elements: ElementData[] = [
  ...(rawElements as any[]).slice(1).map((el) => ({
    ...el,
    ...getCoords(el.number),
  })),
  {
    number: 5771,
    symbol: "57-71",
    name: "Lanthanides",
    x: 3,
    y: 6,
    category: "lanthanide" as ElementCategory,
    shells: [],
  },
  {
    number: 89103,
    symbol: "89-103",
    name: "Actinides",
    x: 3,
    y: 7,
    category: "actinide" as ElementCategory,
    shells: [],
  }
];

export const categoryColors: Record<ElementCategory, string> = {
  "diatomic nonmetal": "bg-blue-100 dark:bg-blue-500/30",
  "noble gas": "bg-purple-100 dark:bg-purple-500/30",
  "alkali metal": "bg-red-100 dark:bg-red-500/30",
  "alkaline earth metal": "bg-orange-100 dark:bg-orange-500/30",
  "metalloid": "bg-green-100 dark:bg-green-500/30",
  "polyatomic nonmetal": "bg-blue-200 dark:bg-blue-500/30",
  "post-transition metal": "bg-indigo-100 dark:bg-indigo-500/30",
  "transition metal": "bg-yellow-100 dark:bg-yellow-500/30",
  "lanthanide": "bg-pink-100 dark:bg-pink-500/30",
  "actinide": "bg-pink-200 dark:bg-pink-500/30",
  "halogen (non-metal)": "bg-teal-100 dark:bg-teal-500/30",
};
