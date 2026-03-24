import { useState, useEffect, useMemo } from 'react';
import { elements, ElementData } from './data';
import { ElementCard } from './components/ElementCard';
import { ElementModal } from './components/ElementModal';
import { motion } from 'motion/react';
import { ElementCategory } from './types';

export interface PeriodicTableProps {
  darkMode?: boolean;
  showSpectrum?: boolean;
  showBohrModel?: boolean;
}

export function PeriodicTable({ 
  darkMode: propDarkMode,
  showSpectrum = true,
  showBohrModel = true
}: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<ElementCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(propDarkMode ?? false);
  const [isMobile, setIsMobile] = useState(false);

  // Filter elements based on search query
  const filteredElements = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return elements.map(el => ({ ...el, isFiltered: false }));

    return elements.map(el => {
      const matches = 
        el.name.toLowerCase().includes(query) ||
        el.symbol.toLowerCase().includes(query) ||
        el.number.toString() === query ||
        el.category.toLowerCase().includes(query);
      
      return { ...el, isFiltered: !matches };
    });
  }, [searchQuery]);

  // Handle window resize for isMobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync with prop
  useEffect(() => {
    if (propDarkMode !== undefined) {
      setIsDarkMode(propDarkMode);
    }
  }, [propDarkMode]);

  // Cleanup stray classes from html that might have been added in previous versions
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Sync with domContainer (root element) - Read only from root
  useEffect(() => {
    // If darkMode prop is provided, we skip the AIS-specific root attribute sync
    if (propDarkMode !== undefined) return;

    const root = document.getElementById('root');
    if (!root) return;

    const checkDarkMode = () => {
      // Check for .dark class on the root element
      const hasDarkClass = root.classList.contains('dark');
      
      // Check for darkmode="true" attribute (case-insensitive)
      const attrValue = root.getAttribute('darkmode') || root.getAttribute('darkMode');
      const hasDarkAttr = attrValue === 'true';
      
      const shouldBeDark = hasDarkClass || hasDarkAttr;
      console.log(`[Theme Sync] Root state: class="dark": ${hasDarkClass}, darkmode="true": ${hasDarkAttr} -> Final: ${shouldBeDark ? 'DARK' : 'LIGHT'}`);
      
      setIsDarkMode(shouldBeDark);

      // Sync .dark class to body for portaled components (like Modals)
      if (shouldBeDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    };

    // Initial check on mount
    checkDarkMode();

    // Watch for changes to the root element's attributes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const attrName = mutation.attributeName?.toLowerCase();
          if (attrName === 'class' || attrName === 'darkmode') {
            checkDarkMode();
          }
        }
      });
    });

    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const categories: { name: string; type: ElementCategory; color: string }[] = [
    { name: 'Alkali', type: 'alkali metal', color: 'bg-red-100 dark:bg-red-500/40' },
    { name: 'Alkaline Earth', type: 'alkaline earth metal', color: 'bg-orange-100 dark:bg-orange-500/40' },
    { name: 'Transition', type: 'transition metal', color: 'bg-yellow-100 dark:bg-yellow-500/40' },
    { name: 'Post-Transition', type: 'post-transition metal', color: 'bg-indigo-100 dark:bg-indigo-500/40' },
    { name: 'Metalloids', type: 'metalloid', color: 'bg-green-100 dark:bg-green-500/40' },
    { name: 'Nonmetals', type: 'polyatomic nonmetal', color: 'bg-blue-200 dark:bg-blue-500/40' },
    { name: 'Halogens', type: 'halogen (non-metal)', color: 'bg-teal-100 dark:bg-teal-500/40' },
    { name: 'Noble Gases', type: 'noble gas', color: 'bg-purple-100 dark:bg-purple-500/40' },
    { name: 'Lanthanides', type: 'lanthanide', color: 'bg-pink-100 dark:bg-pink-500/40' },
    { name: 'Actinides', type: 'actinide', color: 'bg-pink-200 dark:bg-pink-500/40' },
  ];

  return (
    <div className={`periodic-table-lib ${isDarkMode ? 'dark' : ''}`}>
      <section 
        className="bg-slate-50 dark:bg-slate-950 p-2 font-sans min-h-screen transition-colors duration-300"
        aria-labelledby="periodic-table-title"
      >
      <div className="max-w-7xl mx-auto mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="mb-2 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Element Categories
            </div>
            <div 
              className="flex flex-wrap gap-1.5 md:gap-2"
              role="region"
              aria-label="Element categories legend"
            >
              {categories.map((cat) => (
                <div 
                  key={cat.type}
                  className={`flex items-center gap-1.5 md:gap-2 px-1.5 md:px-2 py-1 md:py-1.5 rounded-md transition-all duration-200 cursor-default border border-transparent ${hoveredCategory === cat.type ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm scale-[1.02] text-slate-900 dark:text-white' : 'opacity-60 dark:opacity-80 hover:opacity-100 text-slate-600 dark:text-slate-300'}`}
                  onMouseEnter={() => setHoveredCategory(cat.type)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className={`shrink-0 w-1.5 h-1.5 md:w-2.5 md:h-2.5 ${cat.color} rounded-sm border border-black/10 dark:border-white/10 shadow-inner`} aria-hidden="true" />
                  <span className="text-[7px] md:text-[9px] uppercase tracking-wider font-bold truncate">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto outline-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`grid ${isMobile ? 'grid-cols-9' : 'grid-cols-18'} gap-1 overflow-x-auto pb-8 min-w-[700px] md:min-w-[900px] lg:min-w-0`}
          role="grid"
          aria-label="Periodic table of elements"
        >
          {/* Search Bar in Grid (Desktop only) */}
          {!isMobile && (
            <div 
              style={{ gridColumn: '13 / 18', gridRow: '1 / 2' }}
              className="flex items-end pb-1"
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 dark:text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-2 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                  placeholder="Search by name, symbol, or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Search Bar for Mobile (outside grid or in a different spot) */}
          {isMobile && (
            <div className="col-span-9 mb-4 px-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400 dark:text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-10 py-2 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all shadow-sm"
                  placeholder="Search elements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}
          {filteredElements.map((element) => (
            <ElementCard
              key={element.number}
              element={element}
              onClick={setSelectedElement}
              isDimmed={hoveredCategory !== null && element.category !== hoveredCategory}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      <ElementModal
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
        isDarkMode={isDarkMode}
        showSpectrum={showSpectrum}
        showBohrModel={showBohrModel}
      />
      
    </section>
    </div>
  );
}
