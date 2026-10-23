import React from 'react';
import { Filter, Scissors, CheckCircle, FileCode, Hash, ListFilter } from 'lucide-react';
import { PreprocessingData } from '../../types/detector';

interface Module2PreprocessingProps {
  data?: PreprocessingData;
}

export const Module2Preprocessing: React.FC<Module2PreprocessingProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
        <Filter className="w-8 h-8 text-slate-600 mx-auto" />
        <h3 className="text-white font-bold text-base">Module 2: Awaiting Input Text</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Please run Module 1 (News Ingestion) to process tokenization, stopwords removal, and stemming.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
            02
          </span>
          <div>
            <h3 className="font-bold text-white text-lg">
              Module 2: Data Preprocessing & Cleaning
            </h3>
            <p className="text-xs text-slate-400">
              Tokenization, Stopwords Filtering, Punctuation Stripping, and Suffix Stemming
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg">
          Status: Cleaned
        </span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[10px] font-bold uppercase text-slate-400">Raw Words</div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {data.rawWordCount}
          </div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[10px] font-bold uppercase text-slate-400">Characters</div>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {data.rawCharCount}
          </div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[10px] font-bold uppercase text-slate-400">Stopwords Filtered</div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            {data.stopwordsRemoved.length}
          </div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[10px] font-bold uppercase text-slate-400">Clean Vocabulary</div>
          <div className="text-xl font-bold font-mono text-indigo-400 mt-1">
            {data.vocabularySize}
          </div>
        </div>
      </div>

      {/* Step 1: Filtered Stopwords */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <ListFilter className="w-4 h-4 text-amber-400" />
            Filtered Stopwords (Removed Noise Tokens)
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            {data.stopwordsRemoved.length} words eliminated
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {data.stopwordsRemoved.map((sw, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300/80 border border-amber-500/20"
            >
              {sw}
            </span>
          ))}
        </div>
      </div>

      {/* Step 2: Cleaned & Stemmed Tokens */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Scissors className="w-4 h-4 text-emerald-400" />
            Cleaned & Stemmed Token Stream (Input to Vectorizer)
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            {data.cleanedTokens.length} active feature tokens
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {data.cleanedTokens.map((tok, i) => (
            <span
              key={i}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-200 border border-indigo-500/20"
            >
              {tok}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
