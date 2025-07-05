import React from 'react';
import { motion } from 'framer-motion';
import { 
    ClockIcon, ChatBubbleLeftRightIcon, UserGroupIcon, BeakerIcon, 
    ArrowTrendingUpIcon, ArrowTrendingDownIcon, ArrowsRightLeftIcon 
} from '@heroicons/react/24/outline';

interface Metric {
  name: string;
  unit: string;
}
interface TranscriptItem {
  speaker: '상담사' | '고객';
  text: string;
}
interface ResultsData {
  metrics: { [key: string]: number | string };
  transcript: TranscriptItem[];
}

const metricDetails: Record<string, Metric> = {
    mid_category: { name: "상담 주제", unit: "" },
    result_label: { name: "상담 결과", unit: "" },
    profane: { name: "비속어 사용", unit: "회" },
    honorific_ratio: { name: "존댓말 사용률", unit: "%" },
    positive_word_ratio: { name: "긍정 표현 비율", unit: "%" },
    negative_word_ratio: { name: "부정 표현 비율", unit: "%" },
    euphonious_word_ratio: { name: "완곡어 사용률", unit: "%" },
    empathy_ratio: { name: "공감 표현 비율", unit: "%" },
    apology_ratio: { name: "사과 표현 비율", unit: "%" },
    avg_response_latency: { name: "평균 응답 속도", unit: "초" },
    interruption_count: { name: "대화 가로채기", unit: "회" },
    silence_ratio: { name: "침묵 비율", unit: "%" },
};

// 1. 문제 해결력 점수를 설명으로 변환
const getSuggestionDescription = (score: number) => {
    if (score >= 1.0) return "첫 제안으로 해결";
    if (score >= 0.6) return "두 번째 제안으로 해결";
    if (score >= 0.2) return "여러 번의 제안으로 해결";
    return "미해결";
};

// 2. 고객 감정 변화를 설명과 아이콘으로 변환
const SentimentTrend: React.FC<{ trend: number }> = ({ trend }) => {
    let text, Icon, colorClass;
    if (trend > 0.1) {
        text = "긍정적으로 개선됨";
        Icon = ArrowTrendingUpIcon;
        colorClass = "text-green-500";
    } else if (trend < -0.1) {
        text = "부정적으로 악화됨";
        Icon = ArrowTrendingDownIcon;
        colorClass = "text-red-500";
    } else {
        text = "변화 없음";
        Icon = ArrowsRightLeftIcon;
        colorClass = "text-gray-500";
    }
    return (
        <div className="text-center">
            <p className="text-sm text-gray-500">고객 감정 변화</p>
            <div className={`flex items-center justify-center mt-1 font-bold text-xl ${colorClass}`}>
                <Icon className="w-6 h-6 mr-2" />
                <span>{text}</span>
            </div>
        </div>
    );
};

// 3. 발화량 비율을 설명으로 변환
const TalkRatio: React.FC<{ ratio: number }> = ({ ratio }) => {
    let text;
    if (ratio > 1.2) text = `고객이 ${ratio.toFixed(1)}배 더 많음`;
    else if (ratio < 0.8) text = `상담사가 ${(1 / ratio).toFixed(1)}배 더 많음`;
    else text = "유사한 수준";
    
    return (
        <div className="text-center">
            <p className="text-sm text-gray-500">상담사-고객 발화량</p>
            <p className="text-xl font-bold text-uplus-navy mt-1">{text}</p>
        </div>
    );
};


// --- 메인 컴포넌트 ---

const Section: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <div>
        <div className="flex items-center mb-4">
            <Icon className="w-6 h-6 text-uplus-magenta mr-2" />
            <h3 className="text-xl font-semibold text-uplus-navy">{title}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {children}
        </div>
    </div>
);

const MetricCard: React.FC<{ label: string; value: number | string; unit?: string }> = ({ label, value, unit }) => {
    const formatValue = (val: number | string) => {
        if (typeof val !== 'number') return val;
        // '회' 또는 '점' 단위는 소수점 없이 표시
        if (unit === '회' || (unit === '점' && val % 1 === 0)) {
            return val.toFixed(0);
        }
        return val.toFixed(2);
    };

    return (
      <motion.div 
        className="bg-white p-4 rounded-lg shadow-md text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-uplus-navy mt-1">
          {formatValue(value)}
          {unit && <span className="text-lg font-medium ml-1">{unit}</span>}
        </p>
      </motion.div>
    );
};


export const ResultsDisplay: React.FC<{ data: ResultsData }> = ({ data }) => {
  const { metrics, transcript } = data;

  return (
    <motion.div 
      className="space-y-10 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
        <Section title="상담 요약" icon={UserGroupIcon}>
            <MetricCard label="상담 주제" value={metrics.mid_category} />
            <MetricCard label="상담 결과" value={metrics.result_label} />
            <MetricCard label="문제 해결력" value={getSuggestionDescription(metrics.suggestions as number)} />
            <MetricCard label="비속어 사용" value={metrics.profane} unit="회" />
        </Section>
        
        <Section title="감정 및 태도 분석" icon={BeakerIcon}>
            <div className="col-span-2 md:col-span-2 bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                <SentimentTrend trend={metrics.customer_sentiment_trend as number} />
            </div>
            <MetricCard label="긍정 표현" value={metrics.positive_word_ratio} unit="%" />
            <MetricCard label="부정 표현" value={metrics.negative_word_ratio} unit="%" />
            <MetricCard label="존댓말 사용" value={metrics.honorific_ratio} unit="%" />
            <MetricCard label="완곡어 사용" value={metrics.euphonious_word_ratio} unit="%" />
            <MetricCard label="공감 표현" value={metrics.empathy_ratio} unit="%" />
            <MetricCard label="사과 표현" value={metrics.apology_ratio} unit="%" />
        </Section>
        
        <Section title="대화 흐름 분석" icon={ClockIcon}>
            <div className="col-span-2 md:col-span-2 bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
                <TalkRatio ratio={metrics.talk_ratio as number} />
            </div>
            <MetricCard label="평균 응답 속도" value={metrics.avg_response_latency} unit="초" />
            <MetricCard label="대화 가로채기" value={metrics.interruption_count} unit="회" />
        </Section>
        
        <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-uplus-navy mb-4 flex items-center">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-uplus-magenta mr-2" />
                상담 스크립트
            </h3>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4 max-h-96 overflow-y-auto">
                {transcript.map((item, index) => (
                    <div key={index} className={`flex ${item.speaker === '상담사' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-xl max-w-lg ${item.speaker === '상담사' ? 'bg-indigo-100 text-uplus-navy' : 'bg-gray-100 text-gray-800'}`}>
                            <p className="font-bold text-sm mb-1">{item.speaker}</p>
                            <p className="text-base leading-relaxed">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
  );
};