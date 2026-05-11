import { metricCards } from '../data/mockData';
import { AnimatedSection } from './AnimatedSection';
import { HospitalECGMonitor } from './HospitalECGMonitor';
import { MetricCard } from './MetricCard';
import { StressGauge } from './StressGauge';

export function Dashboard() {
  return (
    <AnimatedSection id="dashboard" className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-clinical-700">Stress Status Dashboard</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">压力状态仪表盘</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-ink-500">
          基于五导联ECG采集后的HRV特征结果，展示当前状态、压力等级与可执行的健康管理建议。
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-md border border-clinical-100 bg-white p-5 shadow-panel">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metricCards.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} />
            ))}
          </div>
          <div className="mt-5">
            <HospitalECGMonitor />
          </div>
        </div>
        <StressGauge />
      </div>
    </AnimatedSection>
  );
}
