import React from 'react';
import { SpectrumProps } from '../types';

const wavelengthToColor = (wavelength: number): string => {
  let r = 0, g = 0, b = 0;
  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    b = 1.0;
  } else if (wavelength >= 440 && wavelength < 490) {
    g = (wavelength - 440) / (490 - 440);
    b = 1.0;
  } else if (wavelength >= 490 && wavelength < 510) {
    g = 1.0;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1.0;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1.0;
    g = -(wavelength - 645) / (645 - 580);
  } else if (wavelength >= 645 && wavelength <= 780) {
    r = 1.0;
  }
  
  let factor = 1.0;
  if (wavelength >= 380 && wavelength < 420) factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
  else if (wavelength > 700 && wavelength <= 780) factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);

  const toHex = (c: number) => Math.round(c * factor * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const Spectrum = ({ lines }: SpectrumProps) => {
  if (!lines || lines.length === 0) return null;

  const minWavelength = 380;
  const maxWavelength = 750;

  return (
    <div className="mt-6" role="region" aria-label={`Emission spectrum for ${lines.length} lines`}>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-200 mb-2">Emission Spectrum</h3>
      <div 
        className="relative w-full h-12 bg-slate-900 dark:bg-black rounded overflow-hidden border border-slate-200 dark:border-slate-800"
        aria-hidden="true"
      >
        {/* Background gradient for reference */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            background: 'linear-gradient(to right, #8b00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff7f00, #ff0000)'
          }}
        />
        
        {/* Spectral Lines */}
        {lines.map((wavelength, index) => {
          if (wavelength < minWavelength || wavelength > maxWavelength) return null;
          
          const position = ((wavelength - minWavelength) / (maxWavelength - minWavelength)) * 100;
          const color = wavelengthToColor(wavelength);
          
          return (
            <div
              key={index}
              className="absolute top-0 bottom-0 w-[2px] shadow-[0_0_4px_rgba(255,255,255,0.5)]"
              style={{
                left: `${position}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
              title={`${wavelength} nm`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono" aria-hidden="true">
        <span>380nm</span>
        <span>450nm</span>
        <span>550nm</span>
        <span>650nm</span>
        <span>750nm</span>
      </div>
      <div className="sr-only">
        Spectral lines at: {lines.join(', ')} nanometers.
      </div>
    </div>
  );
};
