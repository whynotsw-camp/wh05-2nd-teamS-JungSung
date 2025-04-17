import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CoachingDiary from "./CoachingDiary";
import PredictiveFeedbackCard from "./PredictiveFeedbackCard";
import GamificationPanel from "./GamificationPanel";

const tabs = [
  { id: "diary", label: "코칭 다이어리" },
  { id: "predict", label: "예측 피드백" },
  { id: "gamify", label: "이번 주 미션" },
];

export default function FeedbackTabs() {
  const [active, setActive] = useState("diary");

  return (
    <div className="bg-card border border-border rounded-xl shadow-card">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 text-sm font-medium transition-all ${
              active === tab.id
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-accent"
            }`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 min-h-[300px]">
        <AnimatePresence mode="wait">
          {active === "diary" && (
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
          {active === "predict" && (
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
          {active === "gamify" && (
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
