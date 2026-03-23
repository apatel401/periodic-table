export type ElementCategory = 
  | "diatomic nonmetal"
  | "noble gas"
  | "alkali metal"
  | "alkaline earth metal"
  | "metalloid"
  | "polyatomic nonmetal"
  | "post-transition metal"
  | "transition metal"
  | "lanthanide"
  | "actinide"
  | "halogen (non-metal)";

export interface ElementData {
  number: number;
  symbol: string;
  name: string;
  x: number; // Column (1-18)
  y: number; // Row (1-7)
  category: ElementCategory;
  shells: number[];
  summary?: string;
  averageAtomicMass?: string;
  appearance?: string;
  atomic_mass?: number;
  phaseAtStandardTemperatureAndPressure?: string;
  meltingPoint?: number;
  boilingPoint?: number;
  electronegativity?: string;
  strongLines?: number[];
  isFiltered?: boolean;
}

export type CategoryColors = Record<ElementCategory, string>;

export interface ElementCardProps {
  element: ElementData;
  onClick: (element: ElementData) => void;
  isDimmed?: boolean;
  isMobile?: boolean;
}

export interface ElementModalProps {
  element: ElementData | null;
  onClose: () => void;
  isDarkMode: boolean;
  showSpectrum?: boolean;
  showBohrModel?: boolean;
}

export interface BohrModelProps {
  shells: number[];
  symbol: string;
}

export interface SpectrumProps {
  lines: number[];
}

export interface ElectronProps {
  radius: number;
  speed: number;
  offset: number;
}

export interface ShellProps {
  radius: number;
  count: number;
  shellIndex: number;
}
