import { HeroSection } from '../components/home/HeroSection.jsx';
import { TurningPointSection } from '../components/home/TurningPointSection.jsx';
import { CapabilitiesSection } from '../components/home/CapabilitiesSection.jsx';
import { SelectedWorksPreview } from '../components/home/SelectedWorksPreview.jsx';
import { FaqSection } from '../components/home/FaqSection.jsx';
import { MarqueeRibbon } from '../components/common/MarqueeRibbon.jsx';
import { NextChapterNav } from '../components/common/NextChapterNav.jsx';
import { SiteFooter } from '../components/common/SiteFooter.jsx';
import { ElasticDivider } from '../components/physics/ElasticDivider.jsx';
import { ScrollPendulumDial } from '../components/physics/ScrollPendulumDial.jsx';
import { PhysicsTokenTray } from '../components/physics/PhysicsTokenTray.jsx';

export function HomePage({ onNavigate }) {
  return (
    <main className="w-full bg-[#f4f1ea] text-[#141413]">
      <HeroSection onNavigate={onNavigate} />

      <MarqueeRibbon
        items={[
          'MERN Stack Developer',
          'Vanguard CRM',
          'Groq AI T&C Summarizer',
          'Galaxy Service CCO',
          '3+ Years Ugana Medico Ops',
          '2D GSAP Motion Systems',
          'Darbhanga · Remote / Relocate',
        ]}
        speed={28}
      />

      <ScrollPendulumDial />

      <TurningPointSection onNavigate={onNavigate} />

      <ElasticDivider />

      <CapabilitiesSection />

      <PhysicsTokenTray title="Interactive 2D Physics Stack — Drag, Toss or Scroll Fast" />

      <MarqueeRibbon
        items={[
          'React.js',
          'JavaScript ES6+',
          'Node.js',
          'Express.js',
          'MongoDB',
          'Groq LLM API',
          'GSAP & ScrollTrigger',
          'Tactile Ivory UI',
        ]}
        speed={22}
        reverse
        dark
      />

      <SelectedWorksPreview onNavigate={onNavigate} />

      <ElasticDivider accent />

      <FaqSection />

      <NextChapterNav currentPage="home" onNavigate={onNavigate} />

      <SiteFooter onNavigate={onNavigate} />
    </main>
  );
}
