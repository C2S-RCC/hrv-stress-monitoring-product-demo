export type StressLevel = 'Low' | 'Medium' | 'High';

export type TrendDatum = {
  day: string;
  heartRate: number;
  hrv: number;
  stressIndex: number;
};

export type FeedbackValue = '准确' | '偏高' | '偏低';

export type FeedbackRecord = {
  id: string;
  userId: string;
  time: string;
  aiPrediction: string;
  userFeedback: FeedbackValue;
  reason: string;
  inSamplePool: boolean;
};

export type MetricDatum = {
  label: string;
  value: number;
  unit: string;
  helper: string;
  decimals?: number;
};

export const currentMetrics = {
  heartRate: 82,
  rmssd: 28,
  sdnn: 42,
  lfHf: 2.4,
  stressLevel: 'High' as StressLevel,
  stressLevelText: '压力偏高',
  emotionState: '紧张 / 注意力负荷较高',
  stressScore: 83,
};

export const metricCards: MetricDatum[] = [
  {
    label: '当前心率',
    value: currentMetrics.heartRate,
    unit: 'bpm',
    helper: '较静息基线略有升高',
  },
  {
    label: 'RMSSD',
    value: currentMetrics.rmssd,
    unit: 'ms',
    helper: '短时迷走神经活性偏低',
  },
  {
    label: 'SDNN',
    value: currentMetrics.sdnn,
    unit: 'ms',
    helper: '整体HRV波动收窄',
  },
  {
    label: 'LF/HF',
    value: currentMetrics.lfHf,
    unit: '',
    helper: '交感激活占比上升',
    decimals: 1,
  },
];

export const trendData: TrendDatum[] = [
  { day: 'D-6', heartRate: 73, hrv: 52, stressIndex: 35 },
  { day: 'D-5', heartRate: 76, hrv: 49, stressIndex: 39 },
  { day: 'D-4', heartRate: 74, hrv: 51, stressIndex: 36 },
  { day: 'D-3', heartRate: 79, hrv: 43, stressIndex: 50 },
  { day: 'D-2', heartRate: 82, hrv: 37, stressIndex: 61 },
  { day: 'D-1', heartRate: 85, hrv: 32, stressIndex: 69 },
  { day: '今日', heartRate: 82, hrv: 28, stressIndex: 83 },
];

export const feedbackReasons = [
  '刚运动',
  '睡眠不足',
  '情绪紧张',
  '咖啡因摄入',
  '无明显原因',
  '其他',
];

export const initialFeedbackRecords: FeedbackRecord[] = [
  {
    id: 'FB-1024',
    userId: 'U-2026-017',
    time: '2026-05-11 09:18',
    aiPrediction: '压力偏高',
    userFeedback: '准确',
    reason: '睡眠不足',
    inSamplePool: true,
  },
  {
    id: 'FB-1023',
    userId: 'U-2026-017',
    time: '2026-05-10 22:06',
    aiPrediction: '压力偏高',
    userFeedback: '偏低',
    reason: '刚运动',
    inSamplePool: true,
  },
  {
    id: 'FB-1022',
    userId: 'U-2026-017',
    time: '2026-05-09 14:40',
    aiPrediction: '压力偏低',
    userFeedback: '准确',
    reason: '无明显原因',
    inSamplePool: false,
  },
];

export const prdSections = [
  {
    title: '产品定位',
    content:
      '面向日常健康管理场景的HRV压力状态监测原型，帮助用户理解压力变化、获得调节建议，并通过反馈标注形成产品闭环。',
  },
  {
    title: '目标用户',
    content:
      '高压学习与办公人群、关注身心健康的可穿戴设备用户、企业健康管理项目中的非医疗场景用户。',
  },
  {
    title: '用户痛点',
    content:
      '用户难以及时感知压力累积，缺少能解释生理信号变化的产品语言，也缺少低门槛反馈入口帮助系统持续优化。',
  },
  {
    title: '核心功能',
    content:
      'ECG/心率数据展示、HRV指标计算结果展示、压力状态识别、趋势异常提示、健康管理建议、用户反馈标注。',
  },
  {
    title: '用户故事',
    content:
      '作为关注压力管理的用户，我希望看到近期HRV变化和压力提示，并能反馈AI判断是否符合我的真实状态。',
  },
  {
    title: '功能验收标准',
    content:
      '页面能展示当前指标、趋势图、状态解释、反馈记录和闭环流程；反馈提交后记录可见，且能标记是否进入样本池。',
  },
  {
    title: '数据闭环',
    content:
      'HRV数据进入压力识别模块，AI输出状态提示，用户反馈形成标注样本，经筛选后转化为模型优化需求。',
  },
  {
    title: '风险边界',
    content:
      '避免医疗诊断表达，不输出治疗方案；异常提示仅作为健康管理参考，明确建议用户在严重不适时寻求专业帮助。',
  },
];

export const regulationSuggestions = [
  '进行3分钟节律呼吸训练，观察心率是否回落。',
  '暂停高负荷任务，安排一次短时离屏休息。',
  '记录睡眠、咖啡因摄入和运动状态，辅助解释HRV波动。',
];

export const flowSteps = ['HRV数据', 'AI压力识别', '用户反馈', '数据标注', '样本筛选', '模型优化需求'];

export const keywords = ['HRV分析', '压力监测', 'AI健康管理', '用户反馈闭环', '产品原型'];
