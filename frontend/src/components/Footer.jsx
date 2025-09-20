import React from 'react';
import { Gamepad2, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <Gamepad2 className="h-5 w-5 text-gaming-accent" />
            <span className="font-gaming text-sm font-bold bg-gradient-to-r from-gaming-accent to-gaming-gold bg-clip-text text-transparent">
              GameoN
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-white/60">
            <span>© 2024 GameoN. Made with</span>
            <Heart className="h-3 w-3 text-gaming-accent fill-current" />
            <span>for gamers</span>
          </div>
          
          <div className="text-xs text-white/40 mt-2 md:mt-0">
            Ultimate Gaming Experience
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;