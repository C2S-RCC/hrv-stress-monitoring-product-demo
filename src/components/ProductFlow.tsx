import { motion } from 'framer-motion';
import { flowSteps } from '../data/mockData';

export function ProductFlow() {
  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-ink-700">闭环流程</p>
      <div className="relative mt-4 overflow-hidden rounded-md border border-clinical-100 bg-white p-4">
        <div className="absolute left-8 right-8 top-8 hidden h-0.5 bg-clinical-100 md:block" />
        <motion.div
          className="absolute left-8 top-8 hidden h-0.5 bg-clinical-500 md:block"
          initial={{ width: 0 }}
          whileInView={{ width: 'calc(100% - 4rem)' }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
        <div className="relative grid gap-3 md:grid-cols-6">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step}
              className="flex items-center gap-3 rounded-md bg-clinical-50 px-3 py-2 text-sm text-ink-700 md:flex-col md:bg-transparent md:px-1 md:text-center"
              initial={{ opacity: 0.45 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ delay: index * 0.22, duration: 0.35 }}
            >
              <motion.span
                className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-clinical-100 text-xs font-semibold text-clinical-700 ring-4 ring-white"
                whileInView={{ backgroundColor: '#2e9d92', color: '#ffffff' }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ delay: index * 0.22, duration: 0.28 }}
              >
                {index + 1}
              </motion.span>
              <span>{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
