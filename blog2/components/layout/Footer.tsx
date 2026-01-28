import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-black mt-auto p-8 lg:p-12 border-t-2 border-black">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
        <div className="col-span-2 md:col-span-1">
          <h5 className="text-2xl font-bold mb-8">neo.js</h5>
          <span className="text-[120px] leading-none font-bold select-none opacity-90">*</span>
        </div>
        <div>
          <h6 className="font-bold mb-6 text-lg">Resources</h6>
          <ul className="space-y-2">
            {['Reference', 'Tutorials', 'Examples', 'Contribute', 'Community', 'About'].map(item => (
              <li key={item}><a href="#" className="hover:underline hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className="font-bold mb-6 text-lg">Information</h6>
          <ul className="space-y-2">
            {['Download', 'Contact', 'Copyright', 'Privacy Policy', 'Terms of Use'].map(item => (
              <li key={item}><a href="#" className="hover:underline hover:text-white transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className="font-bold mb-6 text-lg">Socials</h6>
          <ul className="space-y-2">
            {['GitHub', 'Instagram', 'X', 'YouTube', 'Discord'].map(item => (
              <li key={item}>
                <a href="#" className="hover:underline hover:text-white transition-colors flex items-center gap-1">
                  {item} <span className="material-icons text-xs">north_east</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};