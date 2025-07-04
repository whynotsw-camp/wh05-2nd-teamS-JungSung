import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { ResultsDisplay } from "../components/ResultsDisplay";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 },
  },
};

// API 응답 결과의 타입을 정의
interface AnalysisResult {
  metrics: { [key: string]: number | string };
  transcript: { speaker: 'Agent' | 'Customer'; text: string }[];
  // 필요에 따라 다른 필드도 추가
}

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/predictions", {
        method: "POST",
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "분석에 실패했습니다.");
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 md:p-8 space-y-6"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-semibold text-uplus-navy">
        상담 파일 분석
      </h2>

      <div className="bg-white rounded-xl p-8 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <label
              htmlFor="audio-upload"
              className="cursor-pointer group inline-block"
            >
              <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-indigo-100 transition-colors">
                <ArrowUpTrayIcon className="w-10 h-10 text-gray-400 group-hover:text-uplus-magenta" />
              </div>
              <p className="mt-2 font-medium text-uplus-navy">
                분석할 파일을 선택하세요
              </p>
              <p className="text-xs text-gray-500">
                (MP3, WAV 파일)
              </p>
            </label>
            <input
              id="audio-upload"
              type="file"
              className="sr-only"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg">
              <DocumentIcon className="w-6 h-6 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-700 truncate">
                {selectedFile.name}
              </span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={!selectedFile || isLoading}
              className="w-full px-4 py-3 bg-uplus-magenta text-white font-bold rounded-lg disabled:bg-gray-300 hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uplus-magenta"
            >
              {isLoading ? "분석 중..." : "분석 시작"}
            </button>
          </div>
        </form>
      </div>

      {isLoading && (
          <div className="text-center mt-6">
              <p className="text-uplus-navy animate-pulse">AI가 열심히 분석하고 있어요. 잠시만 기다려주세요...</p>
          </div>
      )}

      {error && (
        <motion.div 
            className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <p className="font-bold">오류 발생</p>
            <p>{error}</p>
        </motion.div>
      )}

      {analysisResult && <ResultsDisplay data={analysisResult} />}
    </motion.div>
  );
}