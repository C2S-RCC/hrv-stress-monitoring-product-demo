import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { currentMetrics, regulationSuggestions } from '../data/mockData';
import { StressLevelPill, StressLevelScale } from './StressLevelPill';

export function StressGauge() {
  const score = currentMetrics.stressScore;

  return (
    <motion.div
      className="rounded-md border border-clinical-100 bg-white p-5 shadow-panel"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.48 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-ink-500">压力等级</p>
          <h3 className="mt-2 text-3xl font-semibold text-ink-900">{currentMetrics.stressLevelText}</h3>
          <div className="mt-3">
            <StressLevelPill level={currentMetrics.stressLevel} label={currentMetrics.stressLevelText} />
          </div>
          <p className="mt-3 text-sm text-ink-500">{currentMetrics.emotionState}</p>
        </div>
        <div
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#e95f5c ${score * 3.6}deg, #d9f0ed 0deg)`,
          }}
          aria-label={`压力指数 ${score}`}
        >
          <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-xl font-semibold text-ink-900">
            <CountUp end={score} duration={1.7} enableScrollSpy scrollSpyOnce />
          </div>
        </div>
      </div>
      <StressLevelScale activeLevel={currentMetrics.stressLevel} />
      <div className="mt-5 rounded-md bg-clinical-50 p-4">
        <p className="text-sm font-medium text-clinical-700">调节建议</p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-700">
          {regulationSuggestions.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clinical-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
