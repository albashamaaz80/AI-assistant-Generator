
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { generateSocialMediaPosts, generateImage } from './services/geminiService';
import type { PlatformContent, Tone } from './types';
import { PLATFORM_CONFIG } from './constants';

const App: React.FC = () => {
  const [results, setResults] = useState<PlatformContent[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (idea: string, tone: Tone) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // 1. Generate text content and image prompts for all platforms
      const textContent = await generateSocialMediaPosts(idea, tone);

      // 2. Generate images for each platform in parallel
      const imagePromises = textContent.map(content => {
        const config = PLATFORM_CONFIG[content.platform];
        return generateImage(content.imagePrompt, config.aspectRatio);
      });

      const imageUrls = await Promise.all(imagePromises);

      // 3. Combine text content with generated image URLs
      const finalResults = textContent.map((content, index) => ({
        ...content,
        imageUrl: imageUrls[index],
      }));

      setResults(finalResults);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-light font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg md:text-xl text-slate-600 mb-8 animate-fade-in">
            Enter an idea and select a tone. Our AI will craft tailored posts and generate unique images for each social platform.
          </p>
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-12 text-center">
              <Spinner />
              <p className="mt-4 text-lg text-primary">Generating content... this may take a moment.</p>
            </div>
          )}

          {error && (
            <div className="mt-12 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center animate-fade-in">
              <h3 className="font-bold">Generation Failed</h3>
              <p>{error}</p>
            </div>
          )}

          {results && (
            <div className="mt-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-center mb-8 text-primary">Your Social Media Posts</h2>
              <ResultsDisplay results={results} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-slate-500">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
