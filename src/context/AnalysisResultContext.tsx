
import React, { createContext, useState, useContext, ReactNode } from 'react';

// ResultsDisplay.tsx에서 사용하는 타입을 가져옵니다.
interface TranscriptItem {
  speaker: 'Agent' | 'Customer';
  text: string;
}

// 다른 파일에서 이 타입을 사용할 수 있도록 export 합니다.
export interface AnalysisResult {
  metrics: { [key: string]: number | string };
  transcript: TranscriptItem[];
}

// Context가 가지게 될 값들의 타입을 정의합니다.
interface AnalysisResultContextType {
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// Context를 생성합니다.
const AnalysisResultContext = createContext<AnalysisResultContextType | undefined>(undefined);

// Provider 컴포넌트
export const AnalysisResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AnalysisResultContext.Provider value={{ result, setResult, isLoading, setIsLoading }}>
      {children}
    </AnalysisResultContext.Provider>
  );
};

// 커스텀 훅
export const useAnalysisResult = () => {
  const context = useContext(AnalysisResultContext);
  if (context === undefined) {
    throw new Error('useAnalysisResult must be used within a AnalysisResultProvider');
  }
  return context;
};

