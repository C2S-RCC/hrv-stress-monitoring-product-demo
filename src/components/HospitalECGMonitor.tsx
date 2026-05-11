import { motion } from 'framer-motion';
import { useId, useMemo } from 'react';
import { currentMetrics } from '../data/mockData';

type HospitalECGMonitorProps = {
  compact?: boolean;
};

function ecgSample(phase: number) {
  const p = Math.exp(-(((phase - 0.18) / 0.045) ** 2)) * 0.16;
  const q = -Math.exp(-(((phase - 0.36) / 0.018) ** 2)) * 0.18;
  const r = Math.exp(-(((phase - 0.395) / 0.012) ** 2)) * 1.1;
  const s = -Math.exp(-(((phase - 0.425) / 0.018) ** 2)) * 0.35;
  const t = Math.exp(-(((phase - 0.68) / 0.085) ** 2)) * 0.32;
  const baseline = Math.sin(phase * Math.PI * 2) * 0.015;

  return p + q + r + s + t + baseline;
}

function createEcgPath(width: number, height: number, beats = 4.3) {
  const baseline = height * 0.56;
  const amplitude = height * 0.26;
  const points = Array.from({ length: 720 }, (_, index) => {
    const x = (index / 719) * width;
    const phase = (index / 719) * beats;
    const value = ecgSample(phase % 1);
    const y = baseline - value * amplitude;

    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return points.join(' ');
}

export function HospitalECGMonitor({ compact = false }: HospitalECGMonitorProps) {
  const id = useId().replace(/:/g, '');
  const path = useMemo(() => createEcgPath(900, 260), []);
  const clipId = `ecgClip-${id}`;
  const fineGridId = `fineGrid-${id}`;
  const mainGridId = `mainGrid-${id}`;
  const glowId = `ecgGlow-${id}`;
  const scanId = `scanFade-${id}`;

  return (
    <div
      className="overflow-hidden rounded-md border border-emerald-400/30 bg-[#06110f] p-3 shadow-[0_18px_42px_rgba(6,17,15,0.26)]"
      aria-label="医院监护仪风格模拟ECG波形"
    >
      <div className="mb-2 flex items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-wide text-emerald-200/90">
        <div>
          <p className="text-emerald-100">LEAD II</p>
          <p className="mt-1 text-[10px] normal-case tracking-normal text-emerald-300/70">
            Simulated ECG for demo
          </p>
        </div>
        <div className="text-right">
          <p className="text-emerald-100">
            HR <span className="text-lg font-semibold text-[#64ff9a]">82</span> bpm
          </p>
          {!compact && (
            <p className="mt-1 text-[10px] normal-case tracking-normal text-emerald-300/70">
              Not for medical diagnosis
            </p>
          )}
        </div>
      </div>

      <div className="relative aspect-[16/6] min-h-36 w-full overflow-hidden rounded bg-[#020806]">
        <svg viewBox="0 0 900 260" className="h-full w-full" role="img" aria-label="模拟P-QRS-T心电波形">
          <defs>
            <pattern id={fineGridId} width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#0b6b43" strokeOpacity="0.28" strokeWidth="1" />
            </pattern>
            <pattern id={mainGridId} width="90" height="90" patternUnits="userSpaceOnUse">
              <path d="M 90 0 L 0 0 0 90" fill="none" stroke="#19b56f" strokeOpacity="0.34" strokeWidth="1.2" />
            </pattern>
            <filter id={glowId} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id={scanId} x1="0%" x2="100%">
              <stop offset="0%" stopColor="#020806" stopOpacity="0" />
              <stop offset="35%" stopColor="#020806" stopOpacity="0.82" />
              <stop offset="68%" stopColor="#9cffb8" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#9cffb8" stopOpacity="0" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="900" height="260" rx="4" />
            </clipPath>
          </defs>

          <rect width="900" height="260" fill="#020806" />
          <rect width="900" height="260" fill={`url(#${fineGridId})`} />
          <rect width="900" height="260" fill={`url(#${mainGridId})`} />

          <g clipPath={`url(#${clipId})`}>
            <motion.g
              animate={{ x: [0, -900] }}
              transition={{ duration: 6.8, ease: 'linear', repeat: Infinity }}
            >
              <path
                d={path}
                fill="none"
                stroke="#39ff88"
                strokeOpacity="0.2"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${glowId})`}
              />
              <path
                d={path}
                transform="translate(900 0)"
                fill="none"
                stroke="#39ff88"
                strokeOpacity="0.2"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${glowId})`}
              />
              <path
                d={path}
                fill="none"
                stroke="#64ff9a"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${glowId})`}
              />
              <path
                d={path}
                transform="translate(900 0)"
                fill="none"
                stroke="#64ff9a"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${glowId})`}
              />
            </motion.g>

            <motion.rect
              y="0"
              width="70"
              height="260"
              fill={`url(#${scanId})`}
              animate={{ x: [-90, 920] }}
              transition={{ duration: 6.8, ease: 'linear', repeat: Infinity }}
            />
            <motion.line
              y1="0"
              y2="260"
              stroke="#9cffb8"
              strokeOpacity="0.5"
              strokeWidth="1.4"
              animate={{ x1: [-20, 990], x2: [-20, 990] }}
              transition={{ duration: 6.8, ease: 'linear', repeat: Infinity }}
            />
          </g>
        </svg>
      </div>

      <div className="mt-2 flex flex-col gap-2 font-mono text-[10px] text-emerald-200/75 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span>25mm/s</span>
          <span>10mm/mV</span>
          <span>Demo Signal</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-right sm:flex sm:gap-4">
          <span>RMSSD {currentMetrics.rmssd}ms</span>
          <span>SDNN {currentMetrics.sdnn}ms</span>
          <span>{currentMetrics.stressLevel}</span>
        </div>
      </div>
    </div>
  );
}
