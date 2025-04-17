import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "react-countup";
import ScoreLineChart from "./ScoreLineChart";
import TypePieChart from "./TypePieChart";
import CoachingDiary from "./CoachingDiary";
import PredictiveFeedbackCard from "./PredictiveFeedbackCard";
import GamificationPanel from "./GamificationPanel";

const ranks = [
  { name: "오정우", score: 95 },
  { name: "김기훈", score: 92 },
  { name: "오현서", score: 87 },
  { name: "노준석", score: 85 },
  { name: "김상담", score: 83 },
];

export default function FeedbackTabs() {
  const [activeTab, setActiveTab] = useState("trend");

  const tabs = [
    { id: "trend", label: "상담 추이 및 분포" },
    { id: "rank", label: "팀 순위 Top 5" },
    { id: "diary", label: "코칭 다이어리" },
    { id: "predict", label: "예측 피드백" },
    { id: "gamify", label: "이번 주 미션" },
  ];

  return (
    <div className="bg-card border border-border shadow-card rounded-xl">
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-accent"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          {activeTab === "trend" && (
            <motion.div
              key="trend"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScoreLineChart />
                <TypePieChart />
              </div>
            </motion.div>
          )}
          {activeTab === "rank" && (
            <motion.div
              key="rank"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4 text-primary">
                팀 순위 Top 5
              </h2>
              <ul className="divide-y divide-border">
                {ranks.map((user, index) => {
                  const isMe = user.name === "오정우";
                  return (
                    <li
                      key={index}
                      className={`flex justify-between items-center px-4 py-3 rounded-lg transition-all ${
                        isMe
                          ? "bg-primary/10 border-l-4 border-primary text-primary font-semibold"
                          : "hover:bg-gray-100 text-accent"
                      }`}
                    >
                      <span>
                        <span className="font-medium mr-1">{index + 1}.</span>{" "}
                        {user.name}
                      </span>
                      <span className="text-sm font-medium">
                        <CountUp end={user.score} duration={1.2} suffix="점" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
          {activeTab === "diary" && (
            <motion.div
              key="diary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <CoachingDiary />
            </motion.div>
          )}
          {activeTab === "predict" && (
            <motion.div
              key="predict"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PredictiveFeedbackCard />
            </motion.div>
          )}
          {activeTab === "gamify" && (
            <motion.div
              key="gamify"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GamificationPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
