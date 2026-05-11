import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { trendData } from '../data/mockData';
import { AnimatedSection } from './AnimatedSection';

export function TrendAnalysis() {
  return (
    <AnimatedSection surface="white" className="py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-clinical-700">HRV Trend Analysis</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">HRV趋势分析</h2>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            连续两天HRV下降，建议关注休息质量。
          </div>
        </div>

        <div className="h-[360px] rounded-md border border-clinical-100 bg-clinical-50 p-3 sm:p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={trendData} margin={{ top: 16, right: 12, bottom: 8, left: -12 }}>
              <CartesianGrid stroke="#d9f0ed" strokeDasharray="4 4" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#60757c', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#60757c', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  border: '1px solid #d9f0ed',
                  borderRadius: 8,
                  boxShadow: '0 12px 32px rgba(19, 32, 35, 0.12)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="stressIndex"
                name="压力指数"
                fill="#f5c987"
                stroke="#d9962b"
                fillOpacity={0.28}
                isAnimationActive
                animationBegin={200}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="heartRate"
                name="心率"
                stroke="#e95f5c"
                strokeWidth={3}
                dot={{ r: 4 }}
                isAnimationActive
                animationBegin={260}
                animationDuration={1400}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                dataKey="hrv"
                name="HRV"
                stroke="#2e9d92"
                strokeWidth={3}
                dot={{ r: 4 }}
                isAnimationActive
                animationBegin={420}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AnimatedSection>
  );
}
