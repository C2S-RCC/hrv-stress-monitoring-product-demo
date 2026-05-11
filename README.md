# HRV Stress Monitoring Product Demo

一个适合放入简历作品集的 AI 健康管理产品前端 Demo。项目以五导联 ECG 采集与 HRV 算法为背景，展示从生理信号采集、HRV 特征分析、压力状态识别、健康建议到用户反馈标注的数据闭环设计。

## Online Demo

- Demo: [https://hrv-stress-monitoring-product-demo.vercel.app/](https://hrv-stress-monitoring-product-demo.vercel.app/)
- GitHub: [https://github.com/C2S-RCC/hrv-stress-monitoring-product-demo](https://github.com/C2S-RCC/hrv-stress-monitoring-product-demo)

## 项目定位

该 Demo 面向 AI 健康管理产品实习岗位展示，重点体现：

- 将 ECG/HRV 生理指标转化为用户可理解的压力状态提示
- 通过趋势图展示心率、HRV 与压力指数变化
- 使用用户反馈完成 AI 判断修正和数据标注闭环
- 用 PRD 视角表达产品定位、用户痛点、核心功能和风险边界
- 明确健康管理产品边界，不构成医疗诊断或治疗建议

## 功能模块

- 首页 Hero：展示项目定位、核心关键词和产品闭环价值
- 压力状态仪表盘：展示心率、RMSSD、SDNN、LF/HF、压力等级和当前情绪状态
- HospitalECGMonitor：深色医院监护仪风格 ECG 屏幕，包含绿色网格、P-QRS-T 波形、扫描刷新线和 Demo 边界提示
- HRV 趋势分析：使用 Recharts 展示近 7 天心率、HRV、压力指数趋势，并给出异常波动提示
- 状态解释模块：用通俗语言解释压力状态提示，避免医疗诊断表达
- 用户反馈标注模块：支持用户选择 AI 判断是否准确、反馈原因，并生成反馈记录表
- 产品闭环流程：展示 HRV 数据 → AI 压力识别 → 用户反馈 → 数据标注 → 样本筛选 → 模型优化需求
- 简版 PRD 模块：展示产品定位、目标用户、痛点、核心功能、用户故事、验收标准、数据闭环和风险边界

## 技术栈

- Vite
- React
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion
- React CountUp

## 动态效果设计

本项目的动效保持专业、克制，主要服务于“实时监测、数据变化、反馈闭环”的产品表达：

- Hero 首屏：标题、描述、关键词、按钮和右侧健康数据卡片依次淡入上浮，表达产品信息逐步展开
- 模块进入视野：每个 Section 使用淡入和轻微上浮，提升浏览节奏但不打断阅读
- 核心指标：心率、RMSSD、SDNN、LF/HF 和压力指数使用数字滚动，强调健康数据的变化感
- HospitalECGMonitor：使用 SVG 实现深色监护仪屏幕、绿色网格、荧光 ECG 波形和扫描刷新条，模拟医院监护仪的实时 ECG 展示感
- HRV 趋势图：Recharts 折线和面积图启用绘制动画，Tooltip 悬停展示详细数据
- 压力等级：Low / Medium / High 标签加入轻微 pulse 呼吸效果，用柔和颜色提示风险等级
- 用户反馈：新增反馈记录淡入滑入，并短暂高亮，强化“反馈已进入记录”的交互确认
- 产品闭环流程：节点依次点亮，连线从左到右推进，表达 HRV 数据到模型优化需求的闭环链路

## 本地运行

如果在当前 Windows 电脑上运行，可以直接双击：

```text
setup-and-run.bat
```

也可以使用命令行：

```bash
npm install
npm run dev
```

默认访问地址：

```text
http://localhost:5173
```

构建生产版本：

```bash
npm run build
```

当前项目也提供了 Windows 构建脚本：

```text
build.bat
```

本地预览生产构建：

```bash
npm run preview
```

## 部署到 Vercel

1. 将项目推送到 GitHub。
2. 打开 [Vercel](https://vercel.com/) 并导入该 GitHub 仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用：

```bash
npm run build
```

5. Output Directory 使用：

```text
dist
```

6. 点击 Deploy，部署完成后即可获得可放入简历的在线链接。

## 免责声明

本 Demo 仅用于健康管理产品原型展示，不构成医疗诊断或治疗建议。
