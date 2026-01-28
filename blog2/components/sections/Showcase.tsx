import React from 'react';
import { Button } from '../ui/Button';
import { IMAGES } from '../../constants';

export const Showcase: React.FC = () => {
  return (
    <section className="p-8 lg:p-12">
      <h3 className="text-4xl font-display font-bold mb-12">Welcome to NEO*</h3>
      
      {/* Reference Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h4 className="text-3xl font-display font-bold mb-6">Explore the creative library reference</h4>
          <Button>
            View Reference <span className="material-icons">arrow_forward</span>
          </Button>
        </div>
        <div className="space-y-4 group">
          <div className="neo-border bg-background-light dark:bg-card-dark p-2 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-brutal dark:group-hover:shadow-brutal-dark">
            <img
              src={IMAGES.geodata}
              alt="Abstract geometric pattern with dots and lines"
              className="w-full h-48 object-cover border border-black/10 dark:border-white/10"
            />
          </div>
          <div>
            <p className="font-bold">Geodata Weaving</p>
            <p className="text-xs opacity-60 uppercase">Kaspar Ravel</p>
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
        <div className="order-2 lg:order-1 space-y-4 group">
          <div className="neo-border bg-background-light dark:bg-card-dark p-2 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-brutal dark:group-hover:shadow-brutal-dark">
            <img
              src={IMAGES.organic}
              alt="Abstract fluid organic shapes in black and white"
              className="w-full h-48 object-cover border border-black/10 dark:border-white/10"
            />
          </div>
          <div>
            <p className="font-bold">Organic Simulations</p>
            <p className="text-xs opacity-60 uppercase">Patt Vira</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h4 className="text-3xl font-display font-bold mb-6">Learn creative coding with examples</h4>
          <Button>
            View Examples <span className="material-icons">arrow_forward</span>
          </Button>
        </div>
      </div>
    </section>
  );
};