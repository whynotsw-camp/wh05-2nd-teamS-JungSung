import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, ChatBubbleLeftRightIcon, UserGroupIcon, BeakerIcon } from '@heroicons/react/24/outline';

interface Metric {
  name: string;
  unit: string;
}

interface TranscriptItem {
  speaker: 'Agent' | 'Customer';
  text: string;
}

interface ResultsData {
  metrics: { [key: string]: number | string };
  transcript: TranscriptItem[];
}

// 요청하신 모든 지표의 한글 이름, 단위, 카테고리를 매핑
const metricDetails: Record<string, Metric> = {
    // 메타데이터
    mid_category: { name: "상담 주제", unit: "" },
    result_label: { name: "상담 결과", unit: "" },
    profane: { name: "비속어 사용", unit: "회" },
    // 정중함 및 언어 품질
    honorific_ratio: { name: "존댓말 사용률", unit: "%" },
    positive_word_ratio: { name: "긍정 표현 비율", unit: "%" },
    negative_word_ratio: { name: "부정 표현 비율", unit: "%" },
    euphonious_word_ratio: { name: "완곡어 사용률", unit: "%" },
    // 공감적 소통
    empathy_ratio: { name: "공감 표현 비율", unit: "%" },
    apology_ratio: { name: "사과 표현 비율", unit: "%" },
    // 문제 해결 역량
    suggestions: { name: "문제 해결력", unit: "점" },
    // 감정 안정성
    customer_sentiment_early: { name: "초반 고객 감정", unit: "점" },
    customer_sentiment_late: { name: "후반 고객 감정", unit: "점" },
    customer_sentiment_trend: { name: "고객 감정 변화", unit: "점" },
    // 대화 흐름 및 응대 태도
    avg_response_latency: { name: "평균 응답 속도", unit: "초" },
    interruption_count: { name: "대화 가로채기", unit: "회" },
    silence_ratio: { name: "침묵 비율", unit: "%" },
    talk_ratio: { name: "발화량 비율", unit: "배" },
};

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div>
        <div className="flex items-center mb-4">
            <Icon className="w-6 h-6 text-uplus-magenta mr-2" />
            <h3 className="text-xl font-semibold text-uplus-navy">{title}</h3>
        </div>
        {children}
    </div>
);

const MetricCard: React.FC<{ label: string; value: number | string; unit: string; }> = ({ label, value, unit }) => (
  <motion.div 
    className="bg-white p-4 rounded-lg shadow-md text-center"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-uplus-navy mt-1">
      {typeof value === 'number' ? value.toFixed(2) : value}
      {unit && <span className="text-lg font-medium ml-1">{unit}</span>}
    </p>
  </motion.div>
);

export const ResultsDisplay: React.FC<{ data: ResultsData }> = ({ data }) => {
  const { metrics, transcript } = data;

  const renderMetrics = (keys: string[]) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {keys.map(key => (
        <MetricCard 
          key={key} 
          label={metricDetails[key]?.name || key}
          value={key === 'silence_ratio' ? (metrics[key] as number) * 100 : metrics[key]}
          unit={metricDetails[key]?.unit || ""}
        />
      ))}
    </div>
  );
  
  return (
    <motion.div 
      className="space-y-10 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
        <Section title="상담 요약" icon={UserGroupIcon}>
            {renderMetrics(['mid_category', 'result_label', 'profane', 'suggestions'])}
        </Section>
        
        <Section title="감정 및 태도 분석" icon={BeakerIcon}>
            {renderMetrics(['honorific_ratio', 'positive_word_ratio', 'negative_word_ratio', 'euphonious_word_ratio', 'empathy_ratio', 'apology_ratio', 'customer_sentiment_trend'])}
        </Section>
        
        <Section title="대화 흐름 분석" icon={ClockIcon}>
            {renderMetrics(['avg_response_latency', 'interruption_count', 'silence_ratio', 'talk_ratio'])}
        </Section>
        
        <Section title="통화 스크립트" icon={ChatBubbleLeftRightIcon}>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 max-h-96 overflow-y-auto">
                {transcript.map((item, index) => (
                    <div key={index} className={`flex ${item.speaker === 'Agent' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-xl max-w-lg ${item.speaker === 'Agent' ? 'bg-indigo-100 text-uplus-navy' : 'bg-gray-100 text-gray-800'}`}>
                            <p className="font-bold text-sm mb-1">{item.speaker}</p>
                            <p className="text-base leading-relaxed">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    </motion.div>
  );
};