
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-8 border-slate-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};
