import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarModules, ActiveModuleId } from './components/SidebarModules';
import { Module1Input } from './components/modules/Module1Input';
import { Module2Preprocessing } from './components/modules/Module2Preprocessing';
import { Module3Features } from './components/modules/Module3Features';
import { Module4Prediction } from './components/modules/Module4Prediction';
import { Module5Analytics } from './components/modules/Module5Analytics';
import { SAMPLE_ARTICLES } from './utils/sampleArticles';
import { ModuleAnalysisResponse } from './types/detector';
import { AlertCircle, Eye, Layers } from 'lucide-react';

export default function App() {
  const defaultArticle = SAMPLE_ARTICLES[0]; // User's "Invisibility Water" test case

  const [activeModule, setActiveModule] = useState<ActiveModuleId>('module4');
  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');
  const [title, setTitle] = useState<string>(defaultArticle.title);
  const [text, setText] = useState<string>(defaultArticle.content);
  const [analysisResult, setAnalysisResult] = useState<ModuleAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyze = async (articleText: string = text, articleTitle: string = title) => {
    if (!articleText.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: articleText,
          title: articleTitle,
          sourceType: 'user_text',
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Server status ${response.status}`);
      }

      const data: ModuleAnalysisResponse = await response.json();
      setAnalysisResult(data);
      // Automatically switch to Module 4 (Prediction) when done so user sees Fake/Real immediately
      setActiveModule('module4');
    } catch (err: any) {
      console.error('Error analyzing news:', err);
      setErrorMessage(err.message || 'Detection failed. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial detection on mount with the user's article
  useEffect(() => {
    handleAnalyze(defaultArticle.content, defaultArticle.title);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-200">
      {/* Header without top download button as requested */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error message alert */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => handleAnalyze()}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* 2-Column Layout: 5 Modules on the LEFT SIDE, Active Module Content on the RIGHT */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT SIDE: 5 Modules Sidebar */}
          <SidebarModules
            activeModule={activeModule}
            onSelectModule={(id) => {
              setActiveModule(id);
              setViewMode('single');
            }}
            hasAnalyzed={!!analysisResult}
            verdict={analysisResult?.module4_prediction.verdict}
            confidence={analysisResult?.module4_prediction.confidence}
          />

          {/* RIGHT SIDE: Module Workspace */}
          <section className="flex-1 w-full space-y-4">
            {/* View Mode Switcher */}
            <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-xl">
              <div className="text-xs text-slate-300 font-medium">
                Viewing:{' '}
                <span className="text-indigo-400 font-bold">
                  {viewMode === 'all'
                    ? 'All 5 Modules Sequentially'
                    : activeModule === 'module1'
                    ? 'Module 01: News Ingestion'
                    : activeModule === 'module2'
                    ? 'Module 02: Data Preprocessing'
                    : activeModule === 'module3'
                    ? 'Module 03: Feature Extraction'
                    : activeModule === 'module4'
                    ? 'Module 04: Model Classification (Prediction)'
                    : 'Module 05: Result Analysis'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === 'single'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Module View</span>
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    viewMode === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View All 5 Modules</span>
                </button>
              </div>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-white">
                  Executing 5-Module Misinformation Detection Pipeline...
                </p>
                <p className="text-xs text-slate-400">
                  Ingestion &rarr; Preprocessing &rarr; Feature Extraction &rarr; Classification &rarr; Analytics
                </p>
              </div>
            )}

            {/* Displaying Modules */}
            {!isLoading && (
              <div className="space-y-6">
                {/* Single or All Mode logic */}
                {(viewMode === 'all' || activeModule === 'module1') && (
                  <Module1Input
                    title={title}
                    setTitle={setTitle}
                    text={text}
                    setText={setText}
                    onAnalyze={() => handleAnalyze()}
                    isLoading={isLoading}
                  />
                )}

                {(viewMode === 'all' || activeModule === 'module2') && (
                  <Module2Preprocessing data={analysisResult?.module2_preprocessing} />
                )}

                {(viewMode === 'all' || activeModule === 'module3') && (
                  <Module3Features data={analysisResult?.module3_features} />
                )}

                {(viewMode === 'all' || activeModule === 'module4') && (
                  <Module4Prediction prediction={analysisResult?.module4_prediction} />
                )}

                {(viewMode === 'all' || activeModule === 'module5') && (
                  <Module5Analytics analytics={analysisResult?.module5_analytics} />
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Fake News Detection System • 5-Module Academic & Applied Forensics Architecture
          </div>
          <div>
            Modules: Ingestion | Preprocessing | Features | Prediction | Analytics
          </div>
        </div>
      </footer>
    </div>
  );
}
