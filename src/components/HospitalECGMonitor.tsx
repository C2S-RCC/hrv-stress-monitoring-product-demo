import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useId, useMemo } from 'react';
import { currentMetrics } from '../data/mockData';
import { classNames } from '../utils/classNames';

type HospitalECGMonitorProps = {
  compact?: boolean;
  showTitle?: boolean;
};

function ecgSample(phase: number) {
  const p = Math.exp(-(((phase - 0.18) / 0.045) ** 2)) * 0.14;
  const q = -Math.exp(-(((phase - 0.36) / 0.018) ** 2)) * 0.18;
  const r = Math.exp(-(((phase - 0.395) / 0.011) ** 2)) * 1.18;
  const s = -Math.exp(-(((phase - 0.425) / 0.018) ** 2)) * 0.34;
  const t = Math.exp(-(((phase - 0.68) / 0.085) ** 2)) * 0.3;
  const baseline = Math.sin(phase * Math.PI * 2) * 0.012;

  return p + q + r + s + t + baseline;
}

function createEcgPath(width: number, height: number, beats = 4.25) {
  const baseline = height * 0.56;
  const amplitude = height * 0.27;
  const points = Array.from({ length: 760 }, (_, index) => {
    const x = (index / 759) * width;
    const phase = (index / 759) * beats;
    const value = ecgSample(phase % 1);
    const y = baseline - value * amplitude;

    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return points.join(' ');
}

function MonitorScreen({ compact }: { compact?: boolean }) {
  const id = useId().replace(/:/g, '');
  const path = useMemo(() => createEcgPath(900, 260), []);
  const clipId = `ecgClip-${id}`;
  const fineGridId = `fineGrid-${id}`;
  const mainGridId = `mainGrid-${id}`;
  const glowId = `ecgGlow-${id}`;
  const scanId = `scanBand-${id}`;

  return (
    <div
      className={classNames(
        'relative overflow-hidden rounded-md border border-emerald-300/25 bg-[#050d0b] p-3',
        'shadow-[inset_0_0_32px_rgba(85,255,162,0.08),0_18px_42px_rgba(6,17,15,0.24)]',
      )}
      aria-label="医院监护仪风格模拟ECG波形"
    >
      <div className="pointer-events-none absolute inset-0 rounded-md bg-[radial-gradient(circle_at_center,rgba(92,255,169,0.12),transparent_58%)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 rounded-md bg-[linear-gradient(rgba(255,255,255,0.035)_50%,rgba(0,0,0,0)_50%)] bg-[length:100%_4px] opacity-25" />
      <div className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-white/5" />

      <div className="relative mb-2 flex items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-wide text-emerald-200/85">
        <div>
          <p className="text-emerald-100">LEAD II</p>
          <p className="mt-1 text-[10px] normal-case tracking-normal text-emerald-300/62">
            Simulated ECG for demo
          </p>
        </div>
        <motion.div
          className="rounded border border-emerald-300/15 bg-emerald-300/5 px-2 py-1 text-right"
          animate={{
            scale: [1, 1.045, 1],
            borderColor: ['rgba(110,231,183,0.15)', 'rgba(110,231,183,0.5)', 'rgba(110,231,183,0.15)'],
          }}
          transition={{
            duration: 0.42,
            repeat: Infinity,
            repeatDelay: 1.18,
            ease: 'easeOut',
          }}
        >
          <p className="text-emerald-100">
            HR <span className="text-lg font-semibold text-[#6cff9d]">{currentMetrics.heartRate}</span> bpm
          </p>
          {!compact && (
            <p className="mt-1 text-[10px] normal-case tracking-normal text-emerald-300/62">
              Not for medical diagnosis
            </p>
          )}
        </motion.div>
      </div>

      <div className="relative aspect-[16/6] min-h-32 w-full overflow-hidden rounded bg-[#020705] sm:min-h-40 lg:min-h-44">
        <svg viewBox="0 0 900 260" className="h-full w-full" role="img" aria-label="模拟P-QRS-T心电波形">
          <defs>
            <pattern id={fineGridId} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#0f754c" strokeOpacity="0.17" strokeWidth="1" />
            </pattern>
            <pattern id={mainGridId} width="90" height="90" patternUnits="userSpaceOnUse">
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#22c97a" strokeOpacity="0.22" strokeWidth="1.1" />
            </pattern>
            <filter id={glowId} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id={scanId} x1="0%" x2="100%">
              <stop offset="0%" stopColor="#6cff9d" stopOpacity="0" />
              <stop offset="36%" stopColor="#6cff9d" stopOpacity="0.04" />
              <stop offset="56%" stopColor="#a7ffbf" stopOpacity="0.22" />
              <stop offset="74%" stopColor="#6cff9d" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#6cff9d" stopOpacity="0" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="900" height="260" rx="4" />
            </clipPath>
          </defs>

          <rect width="900" height="260" fill="#020705" />
          <rect width="900" height="260" fill={`url(#${fineGridId})`} />
          <rect width="900" height="260" fill={`url(#${mainGridId})`} />

          <g clipPath={`url(#${clipId})`}>
            <motion.g
              animate={{ x: [0, -900] }}
              transition={{ duration: 6.8, ease: 'linear', repeat: Infinity }}
            >
              {[0, 900].map((offset) => (
                <g key={offset} transform={`translate(${offset} 0)`}>
                  <path
                    d={path}
                    fill="none"
                    stroke="#39ff88"
                    strokeOpacity="0.22"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#${glowId})`}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="#7cff9f"
                    strokeWidth="2.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter={`url(#${glowId})`}
                  />
                </g>
              ))}
            </motion.g>

            <motion.rect
              y="0"
              width="120"
              height="260"
              fill={`url(#${scanId})`}
              animate={{ x: [-140, 920] }}
              transition={{ duration: 6.8, ease: 'linear', repeat: Infinity }}
            />
            <motion.line
              y1="0"
              y2="260"
              stroke="#a7ffbf"
              strokeOpacity="0.45"
              strokeWidth="1.2"
              animate={{ x1: [-20, 990], x2: [-20, 990] }}
              transition={{ duration: 6.8, ease: 'linear', repeat: Infinity }}
            />
          </g>
        </svg>
      </div>

      <div className="relative mt-2 flex flex-col gap-2 font-mono text-[10px] text-emerald-200/70 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>25mm/s</span>
          <span>10mm/mV</span>
          <span>Demo Signal</span>
        </div>
        <span>Simulated ECG for demo, not a medical diagnosis</span>
      </div>
    </div>
  );
}

function VitalSummaryCard() {
  const items = [
    { label: '当前心率', value: currentMetrics.heartRate, unit: 'bpm' },
    { label: 'RMSSD', value: currentMetrics.rmssd, unit: 'ms' },
    { label: 'SDNN', value: currentMetrics.sdnn, unit: 'ms' },
    { label: '压力状态', value: currentMetrics.stressLevel, unit: '' },
  ];

  return (
    <div className="rounded-md border border-clinical-100 bg-white p-4 shadow-panel">
      <p className="text-sm font-semibold text-ink-900">HRV状态摘要</p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md bg-clinical-50 px-3 py-2">
            <span className="text-sm text-ink-500">{item.label}</span>
            <span className="text-sm font-semibold text-ink-900">
              {typeof item.value === 'number' ? <CountUp end={item.value} duration={1.2} enableScrollSpy scrollSpyOnce /> : item.value}
              {item.unit && <span className="ml-1 text-xs text-ink-500">{item.unit}</span>}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-3 text-sm leading-6 text-amber-900">
        状态提示：HRV偏低，建议短时休息
      </div>
    </div>
  );
}

export function HospitalECGMonitor({ compact = false, showTitle = true }: HospitalECGMonitorProps) {
  if (compact) {
    return <MonitorScreen compact />;
  }

  return (
    <div>
      {showTitle && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-clinical-700">Real-time ECG Monitor</p>
          <h3 className="mt-1 text-xl font-semibold text-ink-900">实时心电波形监测模拟</h3>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-[1.55fr_0.65fr]">
        <div>
          <MonitorScreen />
        </div>
        <VitalSummaryCard />
      </div>
    </div>
  );
}
