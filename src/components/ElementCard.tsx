import React, { memo } from 'react';
import { categoryColors } from '../data';
import { ElementCardProps } from '../types';

export const ElementCard = memo(({ element, onClick, isDimmed, isMobile }: ElementCardProps) => {
  const isPlaceholder = element.number > 118;
  const bgColor = isPlaceholder ? 'bg-transparent' : (categoryColors[element.category] || 'bg-gray-100');

  // Calculate responsive grid position
  // On desktop (isMobile=false), we use standard x and y
  // On mobile (isMobile=true), we use 9 columns, so each row of the table takes 2 rows in the grid
  const gridColumn = isMobile ? ((element.x - 1) % 9 + 1) : element.x;
  const gridRow = isMobile ? ((element.y - 1) * 2 + Math.floor((element.x - 1) / 9) + 1) : element.y;

  const card = (
    <button
      type="button"
      className={`${bgColor} p-1 border ${isPlaceholder ? 'border-dashed border-slate-300 dark:border-slate-700' : 'border-black/5 dark:border-white/5'} rounded-sm md:rounded-md shadow-sm ${!isPlaceholder ? 'hover:shadow-lg hover:scale-[1.03] hover:z-10 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none' : 'cursor-default'} transition-all duration-200 flex flex-col items-center justify-center h-full w-full aspect-square md:aspect-auto md:min-h-[80px] ${isDimmed || element.isFiltered ? 'opacity-20 grayscale-[0.5]' : 'opacity-100'}`}
      style={{
        gridColumn,
        gridRow,
      }}
      onClick={() => !isPlaceholder && onClick(element)}
      aria-label={!isPlaceholder ? `${element.name}, atomic number ${element.number}, ${element.category}` : `Placeholder for ${element.name}`}
      disabled={isPlaceholder}
    >
      <span className="text-[7px] md:text-[10px] self-start leading-none font-medium opacity-60 dark:text-slate-400" aria-hidden="true">
        {!isPlaceholder ? element.number : ''}
      </span>
      <span className={`${isPlaceholder ? 'text-[7px] md:text-[10px] text-slate-400 dark:text-slate-600' : 'text-sm md:text-xl text-slate-900 dark:text-white'} font-bold leading-none my-0.5 md:my-1 text-center`} aria-hidden="true">
        {element.symbol}
      </span>
      <span className={`text-[6px] md:text-[10px] font-medium truncate w-full text-center ${isPlaceholder ? 'text-slate-400 dark:text-slate-600' : 'text-slate-700 dark:text-slate-300'}`} aria-hidden="true">
        {element.name}
      </span>
    </button>
  );

  return (
    <div className="relative group" style={{ gridColumn, gridRow }}>
      {card}
      {!isPlaceholder && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 dark:bg-slate-700 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {element.name} ({element.symbol})
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700" />
        </div>
      )}
    </div>
  );
});

ElementCard.displayName = 'ElementCard';
