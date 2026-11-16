import { AboutHero } from '../components/about/AboutHero.jsx';
import { ExperienceTimeline } from '../components/about/ExperienceTimeline.jsx';
import { SkillsMatrix } from '../components/about/SkillsMatrix.jsx';
import { CredentialsLedger } from '../components/about/CredentialsLedger.jsx';
import { MarqueeRibbon } from '../components/common/MarqueeRibbon.jsx';
import { NextChapterNav } from '../components/common/NextChapterNav.jsx';
import { SiteFooter } from '../components/common/SiteFooter.jsx';
import { ElasticDivider } from '../components/physics/ElasticDivider.jsx';
import { ScrollPendulumDial } from '../components/physics/ScrollPendulumDial.jsx';

export function AboutPage({ onNavigate }) {
  return (
    <main className="w-full bg-[#f4f1ea] text-[#141413]">
      <AboutHero />

      <MarqueeRibbon
        items={[
          'Galaxy Service (CCO)',
          'Ugana Medico (3 Yrs)',
          'InCodec Technology Intern',
          'Sheryians Full Stack + DSA',
          'Darbhanga · Bihar',
        ]}
        speed={24}
      />

      <ScrollPendulumDial />

      <ExperienceTimeline />

      <ElasticDivider />

      <SkillsMatrix />

      <CredentialsLedger />

      <NextChapterNav currentPage="about" onNavigate={onNavigate} />

      <SiteFooter onNavigate={onNavigate} />
    </main>
  );
}
