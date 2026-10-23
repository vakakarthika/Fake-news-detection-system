import React from 'react';
import {
  FileText,
  Filter,
  BarChart3,
  Target,
  LineChart,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export type ActiveModuleId = 'module1' | 'module2' | 'module3' | 'module4' | 'module5';

interface SidebarModulesProps {
  activeModule: ActiveModuleId;
  onSelectModule: (id: ActiveModuleId) => void;
  hasAnalyzed: boolean;
  verdict?: 'FAKE' | 'REAL';
  confidence?: number;
}

export const SidebarModules: React.FC<SidebarModulesProps> = ({
  activeModule,
  onSelectModule,
  hasAnalyzed,
  verdict,
  confidence,
}) => {
  const modules = [
    {
      id: 'module1' as ActiveModuleId,
      number: '01',
      title: 'News Ingestion',
      subtitle: 'Manual Text & Online URL',
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'module2' as ActiveModuleId,
      number: '02',
      title: 'Data Preprocessing',
      subtitle: 'Cleaning & Tokenization',
      icon: <Filter className="w-4 h-4" />,
    },
    {
      id: 'module3' as ActiveModuleId,
      number: '03',
      title: 'Feature Extraction',
      subtitle: 'TF-IDF & Linguistics',
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: 'module4' as ActiveModuleId,
      number: '04',
      title: 'Model Prediction',
      subtitle: 'Fake vs Real & Confidence',
      icon: <Target className="w-4 h-4" />,
      highlight: true,
    },
    {
      id: 'module5' as ActiveModuleId,
      number: '05',
      title: 'Result Analysis',
      subtitle: 'Metrics & Confusion Matrix',
      icon: <LineChart className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
      <div>
        <div className="pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Project Architecture
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              5 Modules
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            End-to-End Fake News Detection Pipeline
          </p>
        </div>

        {/* Modules List */}
        <nav className="space-y-1.5" aria-label="Project Modules">
          {modules.map((mod) => {
            const isActive = activeModule === mod.id;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                    : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                      : mod.highlight && hasAnalyzed
                      ? verdict === 'FAKE'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {mod.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500">
                      MODULE {mod.number}
                    </span>
                    {hasAnalyzed ? (
                      mod.id === 'module4' && verdict ? (
                        <span
                          className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                            verdict === 'FAKE'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}
                        >
                          {verdict} {confidence}%
                        </span>
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )
                    ) : (
                      <Clock className="w-3 h-3 text-slate-600 shrink-0" />
                    )}
                  </div>
                  <div
                    className={`text-xs font-bold truncate mt-0.5 ${
                      isActive ? 'text-white' : 'text-slate-200'
                    }`}
                  >
                    {mod.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {mod.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Status Box at bottom of sidebar */}
      {hasAnalyzed && verdict && (
        <div
          className={`mt-4 p-3 rounded-xl border ${
            verdict === 'FAKE'
              ? 'bg-rose-950/40 border-rose-500/30 text-rose-200'
              : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
          }`}
        >
          <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">
            Module 04 Output:
          </div>
          <div className="text-base font-extrabold flex items-center justify-between mt-0.5">
            <span>PREDICTED {verdict}</span>
            <span className="font-mono text-sm">{confidence}%</span>
          </div>
          <p className="text-[11px] opacity-80 mt-1 leading-snug">
            {verdict === 'FAKE'
              ? 'Fictional/impossible anomalies flagged.'
              : 'Verified journalistic markers validated.'}
          </p>
        </div>
      )}
    </aside>
  );
};
