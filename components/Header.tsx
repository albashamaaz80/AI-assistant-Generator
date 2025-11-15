
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <SparklesIcon className="w-8 h-8 md:w-10 md:h-10 text-accent" />
        <h1 className="ml-3 text-2xl md:text-4xl font-bold text-white tracking-tight">
          AI Social Post Generator
        </h1>
      </div>
    </header>
  );
};
