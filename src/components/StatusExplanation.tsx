import { AnimatedSection } from './AnimatedSection';

export function StatusExplanation() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold text-clinical-700">Explainable Feedback</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">状态解释模块</h2>
        </div>
        <div className="rounded-md border border-clinical-100 bg-white p-6 shadow-panel">
          <h3 className="text-xl font-semibold text-ink-900">压力状态提示：当前压力偏高</h3>
          <p className="mt-4 leading-8 text-ink-700">
            系统观察到当前心率高于近几日静息水平，同时RMSSD与SDNN下降，说明心率间期的自然波动变小。
            在健康管理语境下，这通常提示身体可能处于较高唤醒或恢复不足状态。结合LF/HF上升，系统给出
            “压力偏高”的状态提示，并建议优先关注休息、呼吸节律和近期生活事件。
          </p>
          <div className="mt-5 rounded-md bg-slate-50 p-4 text-sm leading-6 text-ink-500">
            该解释仅用于帮助用户理解HRV相关指标变化，不作为疾病判断、医疗诊断或治疗建议。
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
