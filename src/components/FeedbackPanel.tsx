import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  feedbackReasons,
  initialFeedbackRecords,
  type FeedbackRecord,
  type FeedbackValue,
} from '../data/mockData';
import { classNames } from '../utils/classNames';
import { AnimatedSection } from './AnimatedSection';
import { ProductFlow } from './ProductFlow';

export function FeedbackPanel() {
  const [feedback, setFeedback] = useState<FeedbackValue>('准确');
  const [reason, setReason] = useState(feedbackReasons[1]);
  const [records, setRecords] = useState<FeedbackRecord[]>(initialFeedbackRecords);
  const [latestId, setLatestId] = useState(initialFeedbackRecords[0].id);

  const submitFeedback = () => {
    const now = new Date();
    const record: FeedbackRecord = {
      id: `FB-${1025 + records.length}`,
      userId: 'U-2026-017',
      time: now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      aiPrediction: '压力偏高',
      userFeedback: feedback,
      reason,
      inSamplePool: feedback !== '准确' || reason !== '无明显原因',
    };

    setLatestId(record.id);
    setRecords((current) => [record, ...current].slice(0, 5));
  };

  return (
    <AnimatedSection surface="white" className="py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-clinical-700">Human-in-the-loop Labeling</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink-900 sm:text-3xl">用户反馈标注模块</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md border border-clinical-100 bg-clinical-50 p-5">
            <p className="text-sm font-medium text-ink-700">AI判断是否准确</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(['准确', '偏高', '偏低'] as FeedbackValue[]).map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setFeedback(item)}
                  className={classNames(
                    'rounded-md border px-3 py-2 text-sm font-medium transition',
                    feedback === item
                      ? 'border-clinical-500 bg-clinical-500 text-white'
                      : 'border-clinical-100 bg-white text-ink-700 hover:border-clinical-300',
                  )}
                  whileTap={{ scale: 0.97 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <p className="mt-5 text-sm font-medium text-ink-700">可能原因</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {feedbackReasons.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => setReason(item)}
                  className={classNames(
                    'rounded-md border px-3 py-2 text-sm transition',
                    reason === item
                      ? 'border-signal-500 bg-white text-signal-600'
                      : 'border-clinical-100 bg-white text-ink-700 hover:border-clinical-300',
                  )}
                  whileTap={{ scale: 0.97 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={submitFeedback}
              className="mt-5 w-full rounded-md bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              生成反馈记录
            </motion.button>

            <ProductFlow />
          </div>

          <div className="overflow-hidden rounded-md border border-clinical-100 bg-white shadow-panel">
            <div className="border-b border-clinical-100 px-5 py-4">
              <h3 className="text-lg font-semibold text-ink-900">反馈记录表</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-ink-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">用户ID</th>
                    <th className="px-4 py-3 font-medium">时间</th>
                    <th className="px-4 py-3 font-medium">AI预测</th>
                    <th className="px-4 py-3 font-medium">用户反馈</th>
                    <th className="px-4 py-3 font-medium">可能原因</th>
                    <th className="px-4 py-3 font-medium">样本池</th>
                  </tr>
                </thead>
                <motion.tbody layout className="divide-y divide-slate-100">
                  <AnimatePresence initial={false}>
                    {records.map((record) => (
                      <motion.tr
                        layout
                        key={record.id}
                        className={classNames(
                          'text-ink-700',
                          record.id === latestId && 'bg-clinical-50',
                        )}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          backgroundColor: record.id === latestId ? ['#d9f0ed', '#f4fbfa'] : '#ffffff',
                        }}
                        exit={{ opacity: 0, x: 16 }}
                        transition={{ duration: 0.45 }}
                      >
                        <td className="px-4 py-3">{record.userId}</td>
                        <td className="px-4 py-3">{record.time}</td>
                        <td className="px-4 py-3">{record.aiPrediction}</td>
                        <td className="px-4 py-3">{record.userFeedback}</td>
                        <td className="px-4 py-3">{record.reason}</td>
                        <td className="px-4 py-3">
                          <span
                            className={classNames(
                              'rounded-full px-2.5 py-1 text-xs font-medium',
                              record.inSamplePool
                                ? 'bg-clinical-100 text-clinical-700'
                                : 'bg-slate-100 text-ink-500',
                            )}
                          >
                            {record.inSamplePool ? '是' : '否'}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </motion.tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
