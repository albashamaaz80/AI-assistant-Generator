
import React from 'react';
import type { PlatformContent } from '../types';
import { PlatformCard } from './PlatformCard';

interface ResultsDisplayProps {
  results: PlatformContent[];
}

// Order the platforms as desired
const platformOrder = ['LinkedIn', 'Twitter', 'Instagram'];

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const sortedResults = [...results].sort((a, b) => {
    return platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {sortedResults.map((content, index) => (
        <PlatformCard key={content.platform} content={content} index={index} />
      ))}
    </div>
  );
};
