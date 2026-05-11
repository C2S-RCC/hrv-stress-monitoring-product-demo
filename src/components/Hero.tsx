import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { currentMetrics, keywords } from '../data/mockData';
import { HospitalECGMonitor } from './HospitalECGMonitor';
import { StressLevelPill } from './StressLevelPill';

const heroItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-clinical-100 bg-clinical-50">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-clinical-500 via-signal-500 to-amber-500" />
      <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.13, delayChildren: 0.08 }}
        >
          <motion.p variants={heroItem} className="text-sm font-semibold text-clinical-700">
            HRV Stress Monitoring Product Demo
          </motion.p>
          <motion.h1
            variants={heroItem}
            className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            基于HRV的心理压力健康管理产品原型
          </motion.h1>
          <motion.p variants={heroItem} className="mt-6 max-w-3xl text-lg leading-8 text-ink-700">
            展示从ECG生理信号采集、HRV分析、压力状态识别、健康建议到用户反馈标注的产品闭环设计。
          </motion.p>
          <motion.div variants={heroItem} className="mt-7 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-clinical-100 bg-white px-3 py-1.5 text-sm font-medium text-ink-700"
              >
                {keyword}
              </span>
            ))}
          </motion.div>
          <motion.a
            variants={heroItem}
            href="#dashboard"
            className="mt-8 inline-flex rounded-md bg-ink-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            查看产品看板
          </motion.a>
        </motion.div>

        <motion.div
          className="rounded-md border border-clinical-100 bg-white p-5 shadow-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-ink-500">Current state</p>
              <p className="mt-1 text-xl font-semibold text-ink-900">{currentMetrics.stressLevelText}</p>
            </div>
            <StressLevelPill level={currentMetrics.stressLevel} label={currentMetrics.stressLevelText} />
          </div>
          <HospitalECGMonitor compact />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ['RMSSD', currentMetrics.rmssd, 'ms'],
              ['SDNN', currentMetrics.sdnn, 'ms'],
              ['压力指数', currentMetrics.stressScore, ''],
            ].map(([label, value, unit]) => (
              <div key={label} className="rounded-md bg-clinical-50 p-3">
                <p className="text-xs text-ink-500">{label}</p>
                <p className="mt-1 text-xl font-semibold text-ink-900">
                  <CountUp end={Number(value)} duration={1.5} />
                  {unit}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
}
