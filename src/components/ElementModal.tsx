import React, { Suspense, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BohrModel } from './BohrModel';
import { Spectrum } from './Spectrum';
import { ElementModalProps } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const ElementModal = ({ 
  element, 
  onClose, 
  isDarkMode,
  showSpectrum = true,
  showBohrModel = true
}: ElementModalProps) => {
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (element) {
      const timer = setTimeout(() => setIsEntered(true), 300);
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      setIsEntered(false);
    }
  }, [element, onClose]);

  return (
    <AnimatePresence>
      {element && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 ${isDarkMode ? 'dark' : ''}`}>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col md:flex-row text-slate-900 dark:text-slate-100"
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-50 p-2 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 rounded-full shadow-md transition-colors text-slate-900 dark:text-white"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* 3D Scene */}
            {showBohrModel && (
              <div 
                className="w-full md:w-1/2 h-[300px] md:h-[500px] bg-slate-900 dark:bg-black relative overflow-hidden flex items-center justify-center"
                role="img"
                aria-label={`3D Bohr model for ${element.name}`}
              >
                  {isEntered ? (
                    <Canvas 
                      key={element.number}
                      camera={{ position: [0, 5, 20], fov: 45 }}
                      gl={{ 
                        antialias: true, 
                        alpha: false, 
                        preserveDrawingBuffer: true,
                        powerPreference: "high-performance"
                      }}
                      style={{ width: '100%', height: '100%' }}
                      frameloop="always"
                      dpr={[1, 2]}
                    >
                      <color attach="background" args={['#0f172a']} />
                      <ambientLight intensity={1.8} />
                      <pointLight position={[10, 10, 10]} intensity={2.5} />
                      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#3b82f6" />
                      <spotLight position={[0, 20, 0]} intensity={1} angle={0.3} penumbra={1} />
                      <OrbitControls 
                        enablePan={false} 
                        minDistance={5} 
                        maxDistance={40}
                      />
                      <Suspense fallback={null}>
                        <BohrModel shells={element.shells || []} symbol={element.symbol} />
                      </Suspense>
                    </Canvas>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-medium uppercase tracking-wider">Initializing 3D Scene...</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white/50 text-[10px] pointer-events-none uppercase tracking-widest font-bold">
                    Interactive 3D Bohr Model
                  </div>
                </div>
            )}

            {/* Metadata */}
            <div className={`w-full ${showBohrModel ? 'md:w-1/2' : 'md:w-full'} flex-1 p-6 md:p-8 overflow-y-auto`}>
              <div className="flex items-baseline gap-2 mb-1 md:mb-2">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {element.symbol}
                </h2>
                <h3 className="text-lg md:text-xl text-slate-500 dark:text-slate-400">
                  {element.name}
                </h3>
              </div>
              
              <span className="block mb-3 md:mb-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                Atomic Number: {element.number} | {element.category}
              </span>

              <hr className="my-4 border-slate-200 dark:border-slate-800" />

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Atomic Mass</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200">{element.averageAtomicMass || element.atomic_mass} u</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Phase (STP)</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200 capitalize">{element.phaseAtStandardTemperatureAndPressure || 'Unknown'}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Melting Point</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200">{element.meltingPoint ? `${element.meltingPoint} K` : 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Boiling Point</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200">{element.boilingPoint ? `${element.boilingPoint} K` : 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Electronegativity</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200">{element.electronegativity || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Appearance</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200 capitalize">{element.appearance || 'N/A'}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[10px] md:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-tight">Electron Configuration (Shells)</span>
                  <span className="text-xs md:text-sm font-medium text-slate-900 dark:text-slate-200">{element.shells.join(', ')}</span>
                </div>
              </div>

              {showSpectrum && element.strongLines && element.strongLines.length > 0 && (
                <Spectrum lines={element.strongLines} />
              )}

              <p className="leading-relaxed mt-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                {element.summary}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
