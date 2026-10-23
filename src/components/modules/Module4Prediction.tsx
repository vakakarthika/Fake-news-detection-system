import React from 'react';
import { Target, ShieldAlert, ShieldCheck, AlertTriangle, Check, ArrowRight } from 'lucide-react';
import { ModuleAnalysisResponse } from '../../types/detector';

interface Module4PredictionProps {
  prediction?: ModuleAnalysisResponse['module4_prediction'];
}

export const Module4Prediction: React.FC<Module4PredictionProps> = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
        <Target className="w-8 h-8 text-slate-600 mx-auto" />
        <h3 className="text-white font-bold text-base">Module 4: Awaiting Classifier Execution</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Please run the detection pipeline to generate the Fake vs Real classification and confidence scores.
        </p>
      </div>
    );
  }

  const isFake = prediction.verdict === 'FAKE';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Module Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
            04
          </span>
          <div>
            <h3 className="font-bold text-white text-lg">
              Module 4: Model Classification & Prediction
            </h3>
            <p className="text-xs text-slate-400">
              Binary Classification (FAKE vs REAL) with Exact Confidence Probability Distribution
            </p>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg border ${
            isFake
              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
          }`}
        >
          {prediction.verdict} DETECTED
        </span>
      </div>

      {/* Main High-Impact Verdict Banner */}
      <div
        className={`rounded-2xl p-6 border shadow-2xl relative overflow-hidden ${
          isFake
            ? 'bg-gradient-to-br from-rose-950/70 via-slate-900 to-slate-950 border-rose-500/40'
            : 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border-emerald-500/40'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className={`p-3.5 rounded-2xl border shadow-xl shrink-0 ${
                isFake
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              }`}
            >
              {isFake ? <ShieldAlert className="w-9 h-9" /> : <ShieldCheck className="w-9 h-9" />}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400">
                  Classification Result:
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isFake
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  {prediction.subCategory}
                </span>
              </div>

              <h2
                className={`text-3xl sm:text-4xl font-black tracking-tight ${
                  isFake ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {prediction.verdict === 'FAKE' ? 'FAKE NEWS' : 'REAL NEWS'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed pt-1">
                {prediction.summary}
              </p>
            </div>
          </div>

          {/* Confidence Score Gauge */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-center shrink-0 min-w-[160px]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Confidence Score
            </div>
            <div
              className={`text-3xl sm:text-4xl font-black font-mono mt-1 ${
                isFake ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {prediction.confidence}%
            </div>
            <div className="text-[10px] font-medium text-slate-400 mt-0.5">
              {prediction.verdict} Probability
            </div>
          </div>
        </div>

        {/* Dual Probability Distribution Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Fake Confidence: {prediction.fakeConfidence}%
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Real Confidence: {prediction.realConfidence}%
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div
              style={{ width: `${prediction.fakeConfidence}%` }}
              className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-l-full transition-all duration-500"
            />
            <div
              style={{ width: `${prediction.realConfidence}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-r-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Forensic Findings & Identified Red Flags */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Primary Factors Driving Prediction
        </h4>
        <ul className="space-y-2">
          {prediction.keyFlags.map((flag, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs text-slate-200 p-2.5 bg-slate-900 rounded-lg border border-slate-800"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                  isFake ? 'bg-rose-400' : 'bg-emerald-400'
                }`}
              />
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
