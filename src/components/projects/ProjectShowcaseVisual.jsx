import { VanguardPreview } from './VanguardPreview.jsx';
import { SummarizerPreview } from './SummarizerPreview.jsx';
import { KineticLabPreview } from './KineticLabPreview.jsx';
import { OperationsPreview } from './OperationsPreview.jsx';

export function ProjectShowcaseVisual({ type, compact = false }) {
  if (type === 'vanguard') return <VanguardPreview compact={compact} />;
  if (type === 'summarizer') return <SummarizerPreview />;
  if (type === 'kinetic2d') return <KineticLabPreview />;
  return <OperationsPreview />;
}
