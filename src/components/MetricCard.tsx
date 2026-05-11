import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { MetricDatum } from '../data/mockData';

type MetricCardProps = {
  metric: MetricDatum;
  index: number;
};

export function MetricCard({ metric, index }: MetricCardProps) {
  return (
    <motion.div
      className="rounded-md border border-slate-100 bg-slate-50 p-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.08, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, borderColor: '#86c9c2' }}
    >
      <p className="text-sm text-ink-500">{metric.label}</p>
      <div className="mt-3 flex items-end gap-1">
        <span className="text-3xl font-semibold text-ink-900">
          <CountUp
            end={metric.value}
            duration={1.6}
            decimals={metric.decimals ?? 0}
            enableScrollSpy
            scrollSpyOnce
          />
        </span>
        {metric.unit && <span className="pb-1 text-sm text-ink-500">{metric.unit}</span>}
      </div>
      <p className="mt-3 text-xs leading-5 text-ink-500">{metric.helper}</p>
    </motion.div>
  );
}
