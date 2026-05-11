import { Dashboard } from './components/Dashboard';
import { FeedbackPanel } from './components/FeedbackPanel';
import { Hero } from './components/Hero';
import { PrdModule } from './components/PrdModule';
import { SignatureBadge } from './components/SignatureBadge';
import { StatusExplanation } from './components/StatusExplanation';
import { TrendAnalysis } from './components/TrendAnalysis';

export default function App() {
  return (
    <main>
      <Hero />
      <Dashboard />
      <TrendAnalysis />
      <StatusExplanation />
      <FeedbackPanel />
      <PrdModule />
      <SignatureBadge />
    </main>
  );
}
