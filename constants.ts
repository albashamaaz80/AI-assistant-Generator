import React from 'react';
// Fix: Import enums as values for use in constants, while keeping type-only imports for types.
import { Platform, Tone, type AspectRatio } from './types';
import { LinkedInIcon } from './components/icons/LinkedInIcon';
import { TwitterIcon } from './components/icons/TwitterIcon';
import { InstagramIcon } from './components/icons/InstagramIcon';

export const TONES = Object.values(Tone);

export const PLATFORM_CONFIG: Record<Platform, { icon: React.ReactNode; aspectRatio: AspectRatio; color: string }> = {
  [Platform.LinkedIn]: { 
    icon: React.createElement(LinkedInIcon), 
    aspectRatio: '4:3', 
    color: 'hover:border-blue-700' 
  },
  [Platform.Twitter]: { 
    icon: React.createElement(TwitterIcon), 
    aspectRatio: '16:9', 
    color: 'hover:border-sky-500' 
  },
  [Platform.Instagram]: { 
    icon: React.createElement(InstagramIcon), 
    aspectRatio: '1:1', 
    color: 'hover:border-pink-500' 
  },
};