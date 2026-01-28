import React from 'react';
import { IMAGES } from '../../constants';

export const Hero: React.FC = () => {
  return (
    <section className="p-8 lg:p-12 border-b-2 border-black dark:border-white">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1">
          <h2 className="text-3xl lg:text-5xl font-display font-bold leading-tight mb-8">
            Neo-Brutalism is a design style that celebrates raw aesthetics, bold colors, and functional structure. Built for creative developers.
          </h2>
          <p className="text-sm opacity-70 mb-8 max-w-xl">
            Featured: Neo-Design Workshop 2024. Photo credit: Ziyuan Lin. Supporting creators through open source and community-driven initiatives.
          </p>
        </div>
        <div className="w-full lg:w-64 flex justify-end">
          <span className="text-[120px] leading-none text-primary font-bold animate-pulse">*</span>
        </div>
      </div>
      
      <div className="mt-8 neo-border overflow-hidden relative group">
        <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <img
          src={IMAGES.hero}
          alt="Tech workspace with multiple monitors and creative lighting"
          className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
        />
      </div>
    </section>
  );
};