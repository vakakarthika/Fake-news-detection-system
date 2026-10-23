export interface PreprocessingData {
  rawWordCount: number;
  rawCharCount: number;
  rawTokens: string[];
  cleanedTokens: string[];
  stopwordsRemoved: string[];
  stemmedTokens: string[];
  vocabularySize: number;
}

export interface FeatureExtractionData {
  topTfidfFeatures: Array<{ word: string; score: number }>;
  sentimentPolarity: number;
  subjectivityScore: number;
  sensationalismScore: number;
  scientificAnomalyScore: number;
  attributionIntegrity: number;
}

export interface ClassEvaluation {
  precision: number;
  recall: number;
  f1Score: number;
  support: number;
  specificity: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  activeClass: 'FAKE' | 'REAL';
  activeClassPrecision: number;
  activeClassRecall: number;
  activeClassF1Score: number;
  classMetrics: {
    fakeNews: ClassEvaluation;
    realNews: ClassEvaluation;
  };
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
}

export interface ModuleAnalysisResponse {
  module1_input: {
    title: string;
    text: string;
    sourceType: 'user_text' | 'live_url' | 'sample_dataset';
    url?: string;
  };
  module2_preprocessing: PreprocessingData;
  module3_features: FeatureExtractionData;
  module4_prediction: {
    verdict: 'FAKE' | 'REAL';
    confidence: number;
    fakeConfidence: number;
    realConfidence: number;
    subCategory: 'Fabricated Science / Satire' | 'Viral Hoax' | 'Credible Journalism' | 'Unverified';
    summary: string;
    keyFlags: string[];
  };
  module5_analytics: {
    metrics: ModelMetrics;
    claimBreakdown: Array<{
      sentence: string;
      status: 'FALSE_CLAIM' | 'QUESTIONABLE' | 'CREDIBLE' | 'NEUTRAL';
      reason: string;
    }>;
    featureWeights: Array<{ feature: string; weight: number; impact: 'FAVORS_FAKE' | 'FAVORS_REAL' }>;
  };
}

export interface SampleArticle {
  id: string;
  category: string;
  title: string;
  content: string;
  expectedVerdict: 'FAKE' | 'REAL';
  badge: string;
  description: string;
}
