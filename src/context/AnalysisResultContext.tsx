
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';

export interface TranscriptItem {
  speaker: 'Agent' | 'Customer';
  text: string;
}

export interface AnalysisResult {
  metrics: { [key: string]: number | string };
  transcript: TranscriptItem[];
}

// Context가 가지게 될 값들의 타입을 정의합니다.
interface AnalysisResultContextType {
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  startAnalysis: (file: File) => Promise<void>;
}

// Context를 생성합니다.
const AnalysisResultContext = createContext<AnalysisResultContextType | undefined>(undefined);

// Provider 컴포넌트
export const AnalysisResultProvider = ({ children }: { children: ReactNode }) => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 분석 시작 함수
  const startAnalysis = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setPredictionId(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Replicate에 있는 모델에게 분석 시작을 요청해줍니다. 모델은 곧바로 predictionId 반환
      // /api/predictions 엔드포인트 사용
      const response = await axios.post('/api/predictions', file, {
        headers: {
          'Content-Type': file.type, // 파일의 MIME 타입 전달
        },
      });
      if (response.data && response.data.id) {
        setPredictionId(response.data.id);
      } else {
        throw new Error("Invalid response from server: No prediction ID");
      }
    } catch (err) {
      console.error("Replicate 예측 생성 오류:", err);
      setError('분석 시작 요청에 실패했습니다.');
      setIsLoading(false);
    }
  };

  // predictionId가 생기면, 폴링(polling) 시작
  useEffect(() => {
    if (!predictionId) return;

    const interval = setInterval(async () => {
      try {
        // 주기적으로 결과 확인 요청
        const response = await axios.get(`/api/predictions/${predictionId}`);
        const { status, output } = response.data;

        if (status === 'succeeded') {
          setAnalysisResult(output);
          setIsLoading(false);
          setPredictionId(null);
          clearInterval(interval); // 성공 시 폴링 중단
        } else if (status === 'failed') {
          setError('모델 분석에 실패했습니다.');
          setIsLoading(false);
          setPredictionId(null);
          clearInterval(interval); // 실패 시 폴링 중단
        }
        // 'processing' 상태일 때는 아무것도 하지 않고 다음 폴링을 기다립니다.
      } catch (err) {
        console.error(err);
        setError('분석 결과를 가져오는 데 실패했습니다.');
        setIsLoading(false);
        setPredictionId(null);
        clearInterval(interval); // 에러 시 폴링 중단
      }
    }, 5000); // 5초마다 확인

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(interval);
  }, [predictionId]);

  const value = { analysisResult, isLoading, error, startAnalysis };

  return (
    <AnalysisResultContext.Provider value={value}>
      {children}
    </AnalysisResultContext.Provider>
  );
};

// 커스텀 훅 생성
export const useAnalysisResult = () => {
  const context = useContext(AnalysisResultContext);

  if (context === undefined) {
    throw new Error('useAnalysisResult must be used within a AnalysisResultProvider');
  }
  return context;
};
