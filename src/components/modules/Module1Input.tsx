import React, { useState } from 'react';
import {
  FileText,
  Globe,
  Sparkles,
  ArrowRight,
  Clipboard,
  Trash2,
  AlertCircle,
  Database,
  Link2,
} from 'lucide-react';
import { SAMPLE_ARTICLES } from '../../utils/sampleArticles';
import { SampleArticle } from '../../types/detector';

interface Module1InputProps {
  title: string;
  setTitle: (val: string) => void;
  text: string;
  setText: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const Module1Input: React.FC<Module1InputProps> = ({
  title,
  setTitle,
  text,
  setText,
  onAnalyze,
  isLoading,
}) => {
  const [inputTab, setInputTab] = useState<'text' | 'url' | 'dataset'>('text');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('user-invisibility-water');

  const handleSelectSample = (sample: SampleArticle) => {
    setSelectedSampleId(sample.id);
    setTitle(sample.title);
    setText(sample.content);
  };

  const handleFetchUrl = async () => {
    if (!urlInput.trim()) return;
    setIsFetchingUrl(true);
    try {
      const res = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlInput }),
      });
      const data = await res.json();
      if (data.text) {
        setTitle(data.title || 'Online Article');
        setText(data.text);
        setInputTab('text');
      }
    } catch (err) {
      console.error('URL extraction error:', err);
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) setText(clip);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Module Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
              01
            </span>
            <div>
              <h3 className="font-bold text-white text-lg">
                Module 1: News Article Ingestion & Input
              </h3>
              <p className="text-xs text-slate-400">
                Collects raw news content via user text, live online URLs, or preloaded test datasets
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-lg">
            Data Ingestion
          </span>
        </div>
      </div>

      {/* Input Mode Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setInputTab('text')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            inputTab === 'text'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>User Given News Text</span>
        </button>

        <button
          onClick={() => setInputTab('url')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            inputTab === 'url'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Online News URL</span>
        </button>

        <button
          onClick={() => setInputTab('dataset')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            inputTab === 'dataset'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Preloaded Dataset Samples</span>
        </button>
      </div>

      {/* Tab 1: Dataset Samples Toolbar */}
      {inputTab === 'dataset' && (
        <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Select a Benchmark Article to Ingest:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAMPLE_ARTICLES.map((sample) => {
              const isUserTest = sample.id === 'user-invisibility-water';
              const isSelected = selectedSampleId === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`text-left p-3 rounded-xl border transition-all text-xs ${
                    isSelected
                      ? isUserTest
                        ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                        : 'bg-indigo-500/20 border-indigo-500 text-indigo-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                    <span
                      className={
                        sample.expectedVerdict === 'FAKE'
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }
                    >
                      {sample.badge}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      Expected: {sample.expectedVerdict}
                    </span>
                  </div>
                  <div className="font-semibold text-white line-clamp-1">
                    {sample.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Online URL Fetcher */}
      {inputTab === 'url' && (
        <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-indigo-400" />
            Paste Online News Link / URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example-news.com/articles/science-discovery-claims..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleFetchUrl}
              disabled={isFetchingUrl || !urlInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {isFetchingUrl ? 'Fetching...' : 'Extract & Ingest'}
            </button>
          </div>
        </div>
      )}

      {/* Main Text & Headline Inputs */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Article Title / Headline (Optional)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Scientists Claim That Drinking One Glass of Water Makes People Invisible for 10 Minutes"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-300">
              News Content / Article Body
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
                onClick={() => {
                  setTitle('');
                  setText('');
                }}
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
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste raw article text to feed into the 5-module classification pipeline..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-y leading-relaxed"
          />

          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 px-1">
            <span>
              {text.trim() ? text.trim().split(/\s+/).length : 0} words • {text.length} characters
            </span>
            <span className="text-slate-400">Ready for Module 2: Preprocessing</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !text.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600 hover:from-rose-400 hover:via-amber-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Executing 5-Module Pipeline...</span>
            </>
          ) : (
            <>
              <span>Run Detection Pipeline (Modules 1 &rarr; 5)</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
