
import React, { useState } from 'react';
import type { PlatformContent } from '../types';
import { PLATFORM_CONFIG } from '../constants';

interface PlatformCardProps {
  content: PlatformContent;
  index: number;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ content, index }) => {
  const { platform, post, imageUrl } = content;
  const config = PLATFORM_CONFIG[platform];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const animationDelay = `${index * 150}ms`;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-slide-in-up" style={{ animationDelay }}>
      <div className="p-4 flex items-center gap-3 border-b border-slate-200 bg-slate-50">
        <span className="h-8 w-8">{config.icon}</span>
        <h3 className="text-xl font-bold text-slate-800">{platform}</h3>
      </div>
      
      <div className="aspect-w-16 aspect-h-9 bg-slate-200">
        {imageUrl ? (
          <img src={imageUrl} alt={`Generated for ${platform}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-300 border-t-secondary rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <p className="text-slate-700 whitespace-pre-wrap flex-grow">{post}</p>
        <button
          onClick={handleCopy}
          className={`mt-4 w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {copied ? (
            <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Copied!</>
          ) : (
            'Copy Text'
          )}
        </button>
      </div>
    </div>
  );
};
