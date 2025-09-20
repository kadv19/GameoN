import React from 'react';
import { Gamepad2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 space-y-4">
      <div className="relative">
        <Gamepad2 className="h-12 w-12 text-gaming-accent animate-bounce" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-gaming-accent/30 border-t-gaming-accent rounded-full animate-spin"></div>
      </div>
      <p className="text-white/70 text-sm font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;