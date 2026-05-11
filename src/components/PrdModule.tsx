import { motion } from 'framer-motion';
import { prdSections } from '../data/mockData';
import { AnimatedSection } from './AnimatedSection';

export function PrdModule() {
  return (
    <AnimatedSection className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-clinical-700">Product Requirement Brief</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">简版PRD模块</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {prdSections.map((section, index) => (
          <motion.article
            key={section.title}
            className="rounded-md border border-clinical-100 bg-white p-5 shadow-panel"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.04, duration: 0.36 }}
          >
            <h3 className="text-base font-semibold text-ink-900">{section.title}</h3>
            <p className="mt-3 text-sm leading-6 text-ink-600">{section.content}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-signal-100 bg-red-50 px-5 py-4 text-sm leading-6 text-ink-700">
        免责声明：本Demo仅用于健康管理产品原型展示，不构成医疗诊断或治疗建议。
      </div>
    </AnimatedSection>
  );
}
