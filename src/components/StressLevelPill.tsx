import { motion } from 'framer-motion';
import type { StressLevel } from '../data/mockData';
import { classNames } from '../utils/classNames';

const levelStyles: Record<StressLevel, string> = {
  Low: 'border-clinical-100 bg-clinical-50 text-clinical-700',
  Medium: 'border-amber-200 bg-amber-50 text-amber-800',
  High: 'border-signal-100 bg-red-50 text-signal-600',
};

const labelMap: Record<StressLevel, string> = {
  Low: '压力偏低',
  Medium: '压力中等',
  High: '压力偏高',
};

export function StressLevelPill({ level, label }: { level: StressLevel; label: string }) {
  return (
    <motion.span
      className={classNames(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold',
        levelStyles[level],
      )}
      animate={{
        scale: [1, 1.035, 1],
        boxShadow: [
          '0 0 0 0 rgba(233, 95, 92, 0.00)',
          '0 0 0 8px rgba(233, 95, 92, 0.08)',
          '0 0 0 0 rgba(233, 95, 92, 0.00)',
        ],
      }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level} / {label}
    </motion.span>
  );
}

export function StressLevelScale({ activeLevel }: { activeLevel: StressLevel }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {(['Low', 'Medium', 'High'] as StressLevel[]).map((level) => {
        const active = level === activeLevel;

        return (
          <motion.span
            key={level}
            className={classNames(
              'rounded-md border px-2.5 py-2 text-center text-xs font-semibold',
              levelStyles[level],
              !active && 'opacity-70',
            )}
            animate={
              active
                ? {
                    scale: [1, 1.025, 1],
                    opacity: [0.92, 1, 0.92],
                  }
                : { scale: 1, opacity: 0.7 }
            }
            transition={active ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
          >
            {level}
            <span className="mt-1 block font-normal">{labelMap[level]}</span>
          </motion.span>
        );
      })}
    </div>
  );
}
