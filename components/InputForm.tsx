
import React, { useState } from 'react';
import { TONES } from '../constants';
import { Tone } from '../types';

interface InputFormProps {
  onSubmit: (idea: string, tone: Tone) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.Professional);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onSubmit(idea, tone);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 animate-slide-in-up">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="idea" className="block text-lg font-semibold mb-2 text-slate-700">
            1. What's your content idea?
          </label>
          <textarea
            id="idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., The launch of our new eco-friendly product line"
            className="w-full h-28 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 resize-none"
            required
          />
        </div>

        <div className="mb-8">
          <label className="block text-lg font-semibold mb-3 text-slate-700">
            2. Choose the tone
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {TONES.map((t) => (
              <label
                key={t}
                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                  tone === t
                    ? 'bg-primary text-white border-primary ring-2 ring-offset-2 ring-primary'
                    : 'bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                }`}
              >
                <input
                  type="radio"
                  name="tone"
                  value={t}
                  checked={tone === t}
                  onChange={() => setTone(t)}
                  className="sr-only"
                />
                <span className="font-medium">{t}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className="w-full bg-secondary text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-400 disabled:cursor-not-allowed transition-transform duration-200 transform hover:scale-105 disabled:scale-100 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Posts'
          )}
        </button>
      </form>
    </div>
  );
};
