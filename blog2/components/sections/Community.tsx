import React from 'react';
import { Button } from '../ui/Button';
import { IMAGES, PROJECTS } from '../../constants';

export const Community: React.FC = () => {
  return (
    <section className="p-8 lg:p-12 pt-0">
      {/* Community Header Block */}
      <div className="mb-20">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h4 className="text-3xl font-display font-bold mb-4">See the community in action</h4>
            <Button>
              Join Community <span className="material-icons">arrow_forward</span>
            </Button>
          </div>
          <div className="hidden lg:block text-right">
            <p className="font-bold">Generative Succulents</p>
            <p className="text-xs opacity-60 uppercase">newyellow</p>
          </div>
        </div>
        <div className="neo-border overflow-hidden hover:shadow-brutal dark:hover:shadow-brutal-dark transition-shadow duration-300">
          <img
            src={IMAGES.succulents}
            alt="Generative green patterns on a dark background"
            className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className={`space-y-4 ${index === 2 ? 'lg:col-span-1 md:col-span-2' : ''}`}>
            <div className="neo-border p-1 hover:shadow-brutal dark:hover:shadow-brutal-dark transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-black">
              <img
                src={project.imageUrl}
                alt={project.title}
                className={`w-full object-cover ${index === 2 ? 'aspect-video md:aspect-auto md:h-full lg:aspect-square' : 'aspect-square'}`}
              />
            </div>
            <div>
              <p className="font-bold">{project.title}</p>
              <p className="text-xs opacity-60 uppercase">{project.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="grid md:grid-cols-2 gap-12 pt-12 border-t-2 border-black dark:border-white">
        <div>
          <h4 className="text-3xl font-display font-bold mb-6">Donate to NEO*</h4>
          <Button className="w-full lg:w-auto">
            Support Us <span className="material-icons">arrow_forward</span>
          </Button>
        </div>
        <div>
          <h4 className="text-3xl font-display font-bold mb-6">Download Library</h4>
          <Button className="w-full lg:w-auto">
            Get Started <span className="material-icons">arrow_forward</span>
          </Button>
        </div>
      </div>
    </section>
  );
};