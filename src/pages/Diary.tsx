import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { LightBulbIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5, staggerChildren: 0.1 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
};

const coachingData = {
  scores: {
    Politeness: { score: 0.54375, grade: "A+" },
    Empathy: { score: 0.1341, grade: "A" },
    ProblemSolving: { score: 0.2, grade: "C+" },
    EmotionalStability: { score: 0.76, grade: "B" },
    Stability: { score: 0.732, grade: "B+" },
  },
  feedback: {
    strengths:
      "상담사는 정중함 및 언어 품질에서 A+ 등급을 받아, 고객에게 긍정적이고 품격 있는 의사소통을 제공하고 있습니다. 또한, 감정 안정성에서 B 등급을 기록하여, 고객의 감정을 잘 이해하고 안정적인 대화를 유지하는 능력을 보여줍니다.",
    weaknesses:
      "상담사는 공감적 소통에서 A 등급을 기록하였으나, 점수가 낮아 좀 더 공감 표현을 강화할 필요가 있습니다. 문제 해결 역량에서는 C+ 등급으로, 고객의 문제를 보다 효과적으로 분석하고 해결하는 데 개선이 필요합니다.",
  },
  coachingTip:
    "고객과의 대화에서 더 많은 공감 표현을 사용해 보세요. 예를 들어, 고객이 어려움을 토로할 때 '그 기분 정말 이해해요'와 같은 반응이 효과적입니다. 또한, 문제 해결 과정에서 고객의 상황을 보다 심층적으로 파악하여, 맞춤형 해결책을 제시하는 연습을 해보세요.",
};

const metricMap: Record<string, string> = {
    Politeness: "정중함 및 언어 품질",
    Empathy: "공감적 소통",
    ProblemSolving: "문제 해결 역량",
    EmotionalStability: "감정 안정성",
    Stability: "대화 흐름 및 응대 태도",
};

const chartData = Object.entries(coachingData.scores).map(([key, value]) => ({
  subject: metricMap[key],
  score: value.score * 100, // 점수를 100점 만점으로 변환
  fullMark: 100,
}));

const Section = ({ title, icon: Icon, children, className }: { title: string; icon: React.ElementType; children: React.ReactNode, className?: string }) => (
  <motion.div variants={sectionVariants} className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
    <div className="flex items-center mb-4">
      <Icon className="w-7 h-7 text-uplus-magenta mr-3" />
      <h3 className="text-xl font-bold text-uplus-navy">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const FeedbackCard = ({ title, content, isStrength }: { title: string; content: string; isStrength: boolean; }) => (
  <div>
    <h4 className={`text-lg font-semibold mb-2 ${isStrength ? 'text-blue-600' : 'text-red-600'}`}>{title}</h4>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

export default function Diary() {
  return (
    <motion.div
      className="p-6 md:p-8 space-y-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={sectionVariants} className="text-2xl font-bold text-uplus-navy">
        코칭 다이어리
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <motion.div variants={sectionVariants} className="bg-white rounded-2xl p-6 shadow-lg h-full">
            <h3 className="text-xl font-bold text-uplus-navy mb-4">종합 역량 분석</h3>
            <div className="h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#02075D', fontSize: 15 }} />
                <PolarRadiusAxis axisLine={false} tickLine={false} tick={false} />
                <Radar
                    name="상담사님의 역량"
                    dataKey="score"
                    stroke="#FF007C"
                    fill="#FF007C"
                    fillOpacity={0.6}
                />
                <Legend wrapperStyle={{ paddingTop: '25px' }} />
                </RadarChart>
            </ResponsiveContainer>
            </div>
        </motion.div>

        <div className="space-y-8">
            <Section title="상세 피드백" icon={ChatBubbleBottomCenterTextIcon}>
                <div className="space-y-6">
                <FeedbackCard title="강점" content={coachingData.feedback.strengths} isStrength={true} />
                <hr/>
                <FeedbackCard title="개선점" content={coachingData.feedback.weaknesses} isStrength={false} />
                </div>
            </Section>
            
            <Section title="코칭 제안" icon={LightBulbIcon}>
                <p className="text-gray-700 leading-relaxed">{coachingData.coachingTip}</p>
            </Section>
        </div>
      </div>

    </motion.div>
  );
}
