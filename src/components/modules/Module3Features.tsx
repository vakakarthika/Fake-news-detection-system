import React from 'react';
import { BarChart3, TrendingUp, Sparkles, AlertOctagon, Flame, Building2 } from 'lucide-react';
import { FeatureExtractionData } from '../../types/detector';

interface Module3FeaturesProps {
  data?: FeatureExtractionData;
}

export const Module3Features: React.FC<Module3FeaturesProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
        <BarChart3 className="w-8 h-8 text-slate-600 mx-auto" />
        <h3 className="text-white font-bold text-base">Module 3: Awaiting Preprocessing</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Feature extraction calculates TF-IDF weights, sensationalism, and scientific anomaly metrics once data is processed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
            03
          </span>
          <div>
            <h3 className="font-bold text-white text-lg">
              Module 3: Feature Extraction & Linguistic Engine
            </h3>
            <p className="text-xs text-slate-400">
              TF-IDF Keyword Weights, Sentiment Polarity, Clickbait Index, and Semantic Anomaly Scoring
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-lg">
          Features Extracted
        </span>
      </div>

      {/* Feature Metric Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              Scientific Anomaly
            </span>
            <span className="text-[10px] font-mono text-rose-400 font-bold">
              {data.scientificAnomalyScore > 50 ? 'HIGH ANOMALY' : 'NORMAL'}
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {data.scientificAnomalyScore}
            <span className="text-xs text-slate-500 font-normal">/100</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Flags impossible claims violating optics or biology (e.g. water causing invisibility).
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Sensationalism Index
            </span>
            <span className="text-[10px] font-mono text-amber-400 font-bold">
              {data.sensationalismScore > 50 ? 'CLICKBAIT' : 'OBJECTIVE'}
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {data.sensationalismScore}
            <span className="text-xs text-slate-500 font-normal">/100</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Frequency of exaggerated breakthrough words like "revolutionize", "secret", "miracle".
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-400" />
              Attribution Integrity
            </span>
            <span className="text-[10px] font-mono text-indigo-400 font-bold">
              {data.attributionIntegrity < 20 ? 'FICTIONAL/NONE' : 'PEER-REVIEWED'}
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {data.attributionIntegrity}
            <span className="text-xs text-slate-500 font-normal">/100</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Self-confessed "fictional research group" drops integrity score to 0.
          </p>
        </div>

        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Subjectivity Score
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              POLARITY: {data.sentimentPolarity > 0 ? '+POS' : 'NEU'}
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {data.subjectivityScore}
            <span className="text-xs text-slate-500 font-normal">/1.0</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Ratio of subjective editorial claims vs empirical verifiable facts.
          </p>
        </div>
      </div>

      {/* Top TF-IDF Weighted Features Table */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Top Extracted TF-IDF Features & Keyword Weights
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Normalized term-frequency x inverse document frequency
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {data.topTfidfFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between"
            >
              <span className="text-xs font-mono text-slate-300 font-medium truncate max-w-[100px]">
                {feat.word}
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                {feat.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
