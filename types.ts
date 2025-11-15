
export enum Tone {
  Professional = 'Professional',
  Witty = 'Witty',
  Urgent = 'Urgent',
  Inspirational = 'Inspirational',
  Casual = 'Casual',
}

export enum Platform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
}

export type AspectRatio = '1:1' | '16:9' | '4:3' | '9:16' | '3:4';

export interface PlatformContent {
  platform: Platform;
  post: string;
  imagePrompt: string;
  imageUrl?: string;
}
