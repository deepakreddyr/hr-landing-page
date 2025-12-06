// app/page.tsx
"use client"

import React, { useRef, useState } from "react"
import type { PixelCardHandle } from "@/components/PixelCard"
import TextType from "@/components/TextType"
import FloatingLines from "@/components/FloatingLines"
import Navbar from "@/components/NavBar"
import Orb from "@/components/Orb"
import TimeSavedStats from "@/components/TimeSaved"
import ShinyText from "@/components/ShinyText"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import { Rocket, Sparkles, Building2, Package, Target, Globe, Zap, Brain, Plug, Clock, TrendingUp, Heart, Database, Shield, MessageSquare, BarChart } from "lucide-react" 
import PricingSection from "@/components/PricingSection"
import Footer from "@/components/Footer"
import { DemoModal } from "@/components/DemoModal"
import { useIsMobile } from '@/hooks/useIsMobile';
import { ShimmerButton } from "@/components/ui/shimmer-button"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isMobile: boolean;
  isLast: boolean; 
}

const GridItem = ({ area, icon, title, description, isMobile, isLast }: GridItemProps) => {
  return (
    <li className={cn("min-h-40 sm:min-h-56 list-none", area, isLast && isMobile && "col-span-2")}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#3b1e52] p-1.5 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={isMobile ? 128 : 64} 
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] p-3 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-col gap-2">
            <div className="w-fit rounded-lg border-[0.75px] border-[#3b1e52] bg-[#2a1f38] p-1.5">
              {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4 text-[#e0f0ff] sm:h-5 sm:w-5' } as React.SVGProps<SVGSVGElement>)}
            </div>
            <div className="space-y-1">
              <h3 className="text-base leading-tight font-semibold font-sans tracking-[-0.04em] md:text-xl md:leading-tight lg:text-2xl lg:leading-tight text-white">
                {title}
              </h3>
              <p className="font-sans text-[10px] leading-relaxed md:text-sm md:leading-relaxed text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const isMobile = useIsMobile();
  
  // APPLY FADE-IN HOOKS
  const [orbRef, orbVisible] = useFadeInOnScroll({ threshold: isMobile ? 0.05 : 0.2 });
  const [statsRef, statsVisible] = useFadeInOnScroll({ threshold: isMobile ? 0.05 : 0.2 });
  const [whoUsesRef, whoUsesVisible] = useFadeInOnScroll({ threshold: isMobile ? 0.05 : 0.2 });
  const [whyChooseRef, whyChooseVisible] = useFadeInOnScroll({ threshold: isMobile ? 0.05 : 0.2 });
  const [pricingRef, pricingVisible] = useFadeInOnScroll({ threshold: isMobile ? 0.05 : 0.2 });

  // Utility class for the transition effect
  const fadeInClass = (isVisible: boolean) => 
    cn(
      "transition-all duration-1000 ease-out", 
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    );


  const personasData = [
    {
      icon: <Sparkles className="h-5 w-5 text-[#e0f0ff]" />,
      title: 'Recruitment Agencies',
      description: 'Scale candidate sourcing, handle high client volume, and reduce time-to-fill for better client satisfaction.',
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    },
    {
      icon: <Rocket className="h-5 w-5 text-[#e0f0ff]" />,
      title: 'Fast-Growing Startups',
      description: 'Automate initial screening and scheduling to focus founder and lead time on key product development, not repetitive HR tasks.',
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    },
    {
      icon: <Building2 className="h-5 w-5 text-[#e0f0ff]" />,
      title: 'Enterprise HR Teams',
      description: 'Streamline mass hiring campaigns, standardize initial candidate experience globally, and integrate easily with existing ATS systems.',
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    },
    {
      icon: <Package className="h-5 w-5 text-[#e0f0ff]" />,
      title: 'Gig Worker Platforms',
      description: 'Quickly onboard thousands of contractors with automated interviews, ensuring supply meets immediate market demand efficiently.',
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    },
    {
      icon: <Target className="h-5 w-5 text-[#e0f0ff]" />,
      title: 'High-Volume Hiring',
      description: 'Process hundreds of applicants daily for roles with high turnover, drastically cutting down manual screening and phone calls.',
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
    },
  ];
  const whyChooseTimelineData = [
    {
      id: 1,
      title: "Voice Calls",
      date: "Core Feature",
      content: "Candidates are called automatically within seconds of shortlisting, scheduling, no delays, just instant engagement that boosts conversion.",
      category: "Speed",
      icon: Zap,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 2,
      title: "AI Context",
      date: "AI Technology",
      content: "Our AI understands answers like a human recruiter—context, intent, clarity, and relevance—ensuring accurate evaluations every time.",
      category: "Intelligence",
      icon: Brain,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 3,
      title: "Security",
      date: "Data Protection",
      content: "All candidate data, call recordings, and summaries are encrypted end-to-end with strict compliance standards designed for HR workflows.",
      category: "Security",
      icon: Shield,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 4,
      title: "Follow-ups",
      date: "Automation",
      content: "If a candidate misses or reschedules a call, the system automatically retries at the perfect time—no manual follow-ups needed.",
      category: "Efficiency",
      icon: Clock,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 5,
      title: "Massive Scale",
      date: "Performance",
      content: "Whether you're hiring 10 or 500 people, handle every interview simultaneously with zero human load or infrastructure overhead.",
      category: "Scalability",
      icon: TrendingUp,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 6,
      title: "Sentiment Analysis",
      date: "AI Insights",
      content: "Get emotion-aware insights that detect clarity, confidence, hesitation, and enthusiasm—going far beyond what text résumés reveal.",
      category: "Analytics",
      icon: Heart,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 7,
      title: "Reports",
      date: "Documentation",
      content: "Every call generates transcripts, summaries, red flags, and skill scores—cleanly formatted and instantly exportable to your ATS.",
      category: "Reporting",
      icon: Database,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 8,
      title: "Multi-Language",
      date: "Global Reach",
      content: "Interview candidates in their preferred language—Hindi, English, Tamil, Telugu, Malayalam, Kannada, and more coming soon.",
      category: "Accessibility",
      icon: MessageSquare,
      relatedIds: [],
      status: "completed" as const,
    },
    {
      id: 9,
      title: "Insights",
      date: "Analytics",
      content: "Spot hiring patterns, predict top performers, identify drop-off points, and optimize your funnel with powerful analytics dashboards.",
      category: "Intelligence",
      icon: BarChart,
      relatedIds: [],
      status: "completed" as const,
    },
  ];

  const audioFileUrl = "/audio/call-recording.mp3";
  
  // Determine the correct text based on the device
  const orbText = isMobile 
    ? "Tap to listen to our AI Agent" 
    : "Click to listen to our AI Agent";
  
  // --- FLOATING LINES DIRECTION LOGIC ---
  const mobileLinePosition = { 
    x: -2.0, y: 1.0, rotate: -1.0 
  };
  const desktopLinePosition = { 
    x: 2.0, y: -0.7, rotate: 0.4 
  };
  const linePosition = isMobile ? mobileLinePosition : desktopLinePosition;
  // --- END LOGIC ---
  
  return (
    <>
      <Navbar onOpenModal={openModal} />
      
      {/* Hero Section */}
      <section
            id="hero"
            style={{ position: "relative", overflow: "hidden" }}
            className="relative z-10 flex flex-col h-[75vh] sm:h-[65vw] lg:h-[60vw]"
        >
            <div className="absolute inset-0 z-0">
                <FloatingLines
                    enabledWaves={["middle"]}
                    lineCount={[12]}
                    lineDistance={[20]}
                    bendRadius={5}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                    bottomWavePosition={linePosition} 
                />
            </div>

            {/* Content Container (Text and Button) */}
            <div className="w-full relative z-10 flex flex-col items-center">
                {/* SEO FIX: Wrapped the primary hero text in an <h1> tag */}
                <h1 
                    className="text-center mt-[45vw] sm:mt-[30vw] md:mt-[25vw] lg:mt-[16vw] text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-sans font-medium px-4"
                >
                    <TextType
                        text={[
                            "AI that hires as good as you do.",
                            "Automated candidate calls.",
                            "Human-like conversations.",
                            "HireAI — Recruitment, Reinvented.",
                        ]}
                        typingSpeed={65}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter=" "
                    />
                </h1>
                <ShimmerButton className="shadow-2xl mt-[22vw]" onClick={openModal} >
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Book Demo
                  </span>
                </ShimmerButton>
            </div>

            {/* Gradient Footer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none">
                <div className="w-full h-full bg-linear-to-t from-black via-black/80 to-transparent"></div>
            </div>
        </section>
      

      {/* Orb Audio Section */}
      <section 
        className={cn("pt-20 px-4", fadeInClass(orbVisible))}
        ref={orbRef as React.RefObject<HTMLElement>}
      >
        <div className="flex justify-center items-center mb-8">
          <ShinyText
            text={orbText}
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl text-center"
          />
        </div>

        <div style={{ width: "100%", height: "400px", position: "relative" }}>
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
            enableAudio={true}
            audioUrl={audioFileUrl}
          />
        </div>
      </section>
      
      {/* TIME SAVED STATS (SECTION 1) */}
      <div 
        ref={statsRef as React.RefObject<HTMLDivElement>}
        className={fadeInClass(statsVisible)}
      >
        <TimeSavedStats />
      </div>

      {/* WHO USES THEHIREAI (SECTION 2) */}
      <section 
        id="who-uses" 
        ref={whoUsesRef as React.RefObject<HTMLElement>}
        className={cn("w-full py-20 px-4", fadeInClass(whoUsesVisible))}
      >
        <div className="flex justify-center items-center mb-16">
          <ShinyText
            text="Who Uses TheHireAI"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl"
          />
        </div>
        
        <div className="mx-auto max-w-7xl">
          <ul className="grid grid-cols-2 sm:grid-cols-3 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-136 xl:grid-rows-2">
            {personasData.map((persona, index) => (
              <GridItem
                key={index}
                area={persona.area}
                icon={persona.icon}
                title={persona.title}
                description={persona.description}
                isMobile={isMobile}
                isLast={index === personasData.length - 1}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose Section */}
      <section 
        id="why-choose" 
        ref={whyChooseRef as React.RefObject<HTMLElement>}
        className={cn("w-full", fadeInClass(whyChooseVisible))}
      >
        <div className="flex justify-center items-center mb-8 px-4">
          <ShinyText
            text="Why Choose TheHireAI"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl"
          />
        </div>
        <RadialOrbitalTimeline timelineData={whyChooseTimelineData} />
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing"
        ref={pricingRef as React.RefObject<HTMLElement>}
        className={fadeInClass(pricingVisible)}
      >
        <PricingSection onOpenModal={openModal}/>
      </section>

      {/* Footer/Contact Section */}
      <section id="contact">
        <Footer/>
      </section>
      <DemoModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}