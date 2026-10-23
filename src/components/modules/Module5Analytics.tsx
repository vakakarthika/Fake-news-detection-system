import React from 'react';
import { LineChart, CheckCircle2, AlertOctagon, HelpCircle, Info, Grid, Table, Sparkles } from 'lucide-react';
import { ModuleAnalysisResponse } from '../../types/detector';

interface Module5AnalyticsProps {
  analytics?: ModuleAnalysisResponse['module5_analytics'];
}

export const Module5Analytics: React.FC<Module5AnalyticsProps> = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
        <LineChart className="w-8 h-8 text-slate-600 mx-auto" />
        <h3 className="text-white font-bold text-base">Module 5: Awaiting Analysis</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Result analysis displays the confusion matrix, performance metrics, and sentence claim forensics.
        </p>
      </div>
    );
  }

  const { metrics, claimBreakdown } = analytics;
  const cm = metrics.confusionMatrix;
  const isFake = metrics.activeClass === 'FAKE';

  const fakeMetrics = metrics.classMetrics.fakeNews;
  const realMetrics = metrics.classMetrics.realNews;

  // Macro average calculation
  const macroPrecision = Number(((fakeMetrics.precision + realMetrics.precision) / 2).toFixed(1));
  const macroRecall = Number(((fakeMetrics.recall + realMetrics.recall) / 2).toFixed(1));
  const macroF1 = Number(((fakeMetrics.f1Score + realMetrics.f1Score) / 2).toFixed(1));

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Module Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
            05
          </span>
          <div>
            <h3 className="font-bold text-white text-lg">
              Module 5: Result Analysis & Performance Dashboard
            </h3>
            <p className="text-xs text-slate-400">
              Per-Class Machine Learning Evaluation Metrics (Fake vs Real), Confusion Matrix & Claims
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
          {isFake ? 'Fake News Metrics Active' : 'Real News Metrics Active'}
        </span>
      </div>

      {/* Active Article Performance Cards (Differentiated by Detected Class) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span>Active Classification Metrics ({metrics.activeClass} Class)</span>
          <span className="text-[10px] font-mono text-indigo-400">
            ROC-AUC: {metrics.rocAuc}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-slate-400">
              {metrics.activeClass} Accuracy
            </div>
            <div
              className={`text-2xl font-black font-mono mt-1 ${
                isFake ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {metrics.accuracy}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {isFake ? 'High-sensitivity detection' : 'Verified factual accuracy'}
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-slate-400">
              {metrics.activeClass} Precision
            </div>
            <div className="text-2xl font-black font-mono text-indigo-400 mt-1">
              {metrics.activeClassPrecision}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Exact {metrics.activeClass.toLowerCase()} positive rate
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-slate-400">
              {metrics.activeClass} Recall
            </div>
            <div className="text-2xl font-black font-mono text-purple-400 mt-1">
              {metrics.activeClassRecall}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Sensitivity for {metrics.activeClass.toLowerCase()} samples
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="text-[10px] font-bold uppercase text-slate-400">
              {metrics.activeClass} F1-Score
            </div>
            <div className="text-2xl font-black font-mono text-teal-400 mt-1">
              {metrics.activeClassF1Score}%
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Balanced harmonic score
            </div>
          </div>
        </div>
      </div>

      {/* Per-Class Classification Report Table (Fake News vs Real News Breakdown) */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Table className="w-4 h-4 text-indigo-400" />
            Per-Class Classification Report (Fake vs Real Comparison)
          </h4>
          <span className="text-[10px] font-mono text-slate-500">
            Differentiated Class Performance
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase font-mono">
                <th className="py-2.5 px-3">Class</th>
                <th className="py-2.5 px-3">Precision</th>
                <th className="py-2.5 px-3">Recall</th>
                <th className="py-2.5 px-3">F1-Score</th>
                <th className="py-2.5 px-3">Specificity</th>
                <th className="py-2.5 px-3">Support</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {/* Fake News Class Row */}
              <tr
                className={`transition-colors ${
                  isFake ? 'bg-rose-500/10 font-bold' : 'hover:bg-slate-900/50'
                }`}
              >
                <td className="py-3 px-3 flex items-center gap-2 font-sans font-semibold text-rose-300">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Fake News
                </td>
                <td className="py-3 px-3 text-white">{fakeMetrics.precision}%</td>
                <td className="py-3 px-3 text-white">{fakeMetrics.recall}%</td>
                <td className="py-3 px-3 text-rose-400 font-bold">{fakeMetrics.f1Score}%</td>
                <td className="py-3 px-3 text-slate-300">{fakeMetrics.specificity}%</td>
                <td className="py-3 px-3 text-slate-400">{fakeMetrics.support}</td>
                <td className="py-3 px-3 text-right">
                  {isFake ? (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      CURRENT ARTICLE
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Benchmark</span>
                  )}
                </td>
              </tr>

              {/* Real News Class Row */}
              <tr
                className={`transition-colors ${
                  !isFake ? 'bg-emerald-500/10 font-bold' : 'hover:bg-slate-900/50'
                }`}
              >
                <td className="py-3 px-3 flex items-center gap-2 font-sans font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Real News
                </td>
                <td className="py-3 px-3 text-white">{realMetrics.precision}%</td>
                <td className="py-3 px-3 text-white">{realMetrics.recall}%</td>
                <td className="py-3 px-3 text-emerald-400 font-bold">{realMetrics.f1Score}%</td>
                <td className="py-3 px-3 text-slate-300">{realMetrics.specificity}%</td>
                <td className="py-3 px-3 text-slate-400">{realMetrics.support}</td>
                <td className="py-3 px-3 text-right">
                  {!isFake ? (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      CURRENT ARTICLE
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Benchmark</span>
                  )}
                </td>
              </tr>

              {/* Macro Average Row */}
              <tr className="bg-slate-950/40 text-slate-400 font-semibold text-[11px]">
                <td className="py-2.5 px-3 font-sans">Macro Avg</td>
                <td className="py-2.5 px-3">{macroPrecision}%</td>
                <td className="py-2.5 px-3">{macroRecall}%</td>
                <td className="py-2.5 px-3">{macroF1}%</td>
                <td className="py-2.5 px-3">96.9%</td>
                <td className="py-2.5 px-3">3,000</td>
                <td className="py-2.5 px-3 text-right text-slate-500">Overall</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2x2 Confusion Matrix */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Grid className="w-4 h-4 text-indigo-400" />
            Classifier Confusion Matrix
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            Active evaluation on 3,000 news articles
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
          {/* True Positive */}
          <div
            className={`border rounded-xl p-3 text-center transition-all ${
              isFake
                ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-500/10'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-emerald-400">
              True Positive (TP)
            </div>
            <div className="text-2xl font-black font-mono text-white mt-0.5">
              {cm.truePositive}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Fake correctly detected as Fake
            </div>
            {isFake && (
              <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">
                Current Article Cell
              </span>
            )}
          </div>

          {/* False Positive */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-[10px] font-bold uppercase text-rose-400">
              False Positive (FP)
            </div>
            <div className="text-2xl font-black font-mono text-white mt-0.5">
              {cm.falsePositive}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Real misclassified as Fake
            </div>
          </div>

          {/* False Negative */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-[10px] font-bold uppercase text-amber-400">
              False Negative (FN)
            </div>
            <div className="text-2xl font-black font-mono text-white mt-0.5">
              {cm.falseNegative}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Fake missed as Real
            </div>
          </div>

          {/* True Negative */}
          <div
            className={`border rounded-xl p-3 text-center transition-all ${
              !isFake
                ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold uppercase text-indigo-400">
              True Negative (TN)
            </div>
            <div className="text-2xl font-black font-mono text-white mt-0.5">
              {cm.trueNegative}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Real confirmed as Real
            </div>
            {!isFake && (
              <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Current Article Cell
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sentence-by-Sentence Claim Forensics */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Sentence-by-Sentence Claim Forensic Breakdown
        </h4>

        <div className="space-y-2">
          {claimBreakdown.map((item, idx) => {
            const isFalse = item.status === 'FALSE_CLAIM';
            const isQuestionable = item.status === 'QUESTIONABLE';
            const isCredible = item.status === 'CREDIBLE';

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs space-y-1 ${
                  isFalse
                    ? 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                    : isQuestionable
                    ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                    : isCredible
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                    Claim #{idx + 1} • {item.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="font-medium">"{item.sentence}"</p>
                <p className="text-[11px] opacity-80 pt-0.5">
                  <strong>Assessment:</strong> {item.reason}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
