import React, { useState } from 'react';
import { Sparkles, Trash2, Clipboard, Search, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { SAMPLE_ARTICLES } from '../utils/sampleArticles';
import { SampleArticle } from '../types/detector';

interface ArticleInputProps {
  title: string;
  setTitle: (val: string) => void;
  text: string;
  setText: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const ArticleInput: React.FC<ArticleInputProps> = ({
  title,
  setTitle,
  text,
  setText,
  onAnalyze,
  isLoading,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>('user-invisibility-water');

  const handleSelectSample = (sample: SampleArticle) => {
    setSelectedSampleId(sample.id);
    setTitle(sample.title);
    setText(sample.content);
  };

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(clipText);
        setSelectedSampleId('');
      }
    } catch {
      // Fallback if permission blocked
    }
  };

  const handleClear = () => {
    setTitle('');
    setText('');
    setSelectedSampleId('');
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Sample Selector Toolbar */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            Quick Test Cases
          </label>
          <span className="text-[11px] text-slate-400">Click to instantly load & test</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SAMPLE_ARTICLES.map((sample) => {
            const isUserTest = sample.id === 'user-invisibility-water';
            const isSelected = selectedSampleId === sample.id;

            return (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? isUserTest
                      ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/20'
                      : 'bg-indigo-500/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {isUserTest && (
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                )}
                <span className="font-semibold">{sample.badge}:</span>
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {sample.title}
                </span>
              </button>
            );
          })}
        </div>

        {selectedSampleId === 'user-invisibility-water' && (
          <div className="mt-2.5 px-3 py-2 bg-rose-950/30 border border-rose-500/30 rounded-lg text-xs text-rose-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
              <span>Loaded your sample: <strong>"Drinking Water Makes People Invisible for 10 Minutes"</strong></span>
            </span>
            <span className="text-[10px] text-rose-400/80 font-mono hidden sm:inline">
              Fictional Research Group claim
            </span>
          </div>
        )}
      </div>

      {/* Input Fields */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Article Headline / Title (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSelectedSampleId('');
            }}
            placeholder="e.g. Scientists Claim That Drinking One Glass of Water Makes People Invisible..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Article Body / Content
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePaste}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 hover:bg-slate-800 px-2 py-0.5 rounded transition-colors"
              >
                <Clipboard className="w-3 h-3" />
                <span>Paste</span>
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 hover:bg-slate-800 px-2 py-0.5 rounded transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <textarea
            rows={5}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setSelectedSampleId('');
            }}
            placeholder="Paste news article content, viral post, claim, or report here to analyze..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y leading-relaxed"
          />

          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 px-1">
            <span>
              {wordCount} words • {charCount} characters
            </span>
            <span>Supports raw text, social claims, and full investigative stories</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !text.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600 hover:from-rose-400 hover:via-amber-400 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all transform active:scale-95"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Claims & Scientific Plausibility...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Run Credibility & Forensics Check</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
