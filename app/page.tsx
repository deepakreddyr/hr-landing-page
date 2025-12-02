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
import WhyChooseSection from "@/components/WhyChooseSection"
import SpotlightCard from "@/components/SpotlightCard" 
import { Rocket, Sparkles, Building2, Package, Target, Globe } from "lucide-react" 
import PricingSection from "@/components/PricingSection"
import Footer from "@/components/Footer"
import { DemoModal } from "@/components/DemoModal"
import { useIsMobile } from '@/hooks/useIsMobile';

const PersonaContent = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 h-full flex flex-col justify-start">
    <div className="text-3xl mb-4 text-[#e0f0ff]">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const SpotlightPersonaCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <SpotlightCard
        className="bg-[#1a0f28] rounded-2xl shadow-xl border border-[#3b1e52] overflow-hidden transition-shadow duration-300"
        spotlightColor="rgba(192, 192, 192, 0.4)"
    >
        <PersonaContent
            icon={icon}
            title={title}
            description={description}
        />
    </SpotlightCard>
);

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const personasData = [
    {
      icon: <Sparkles size={32} />,
      title: 'Recruitment Agencies',
      description: 'Scale candidate sourcing, handle high client volume, and reduce time-to-fill for better client satisfaction.'
    },
    {
      icon: <Rocket size={32} />,
      title: 'Fast-Growing Startups',
      description: 'Automate initial screening and scheduling to focus founder and lead time on key product development, not repetitive HR tasks.'
    },
    {
      icon: <Building2 size={32} />,
      title: 'Enterprise HR Teams',
      description: 'Streamline mass hiring campaigns, standardize initial candidate experience globally, and integrate easily with existing ATS systems.'
    },
    {
      icon: <Package size={32} />,
      title: 'Gig Worker Platforms',
      description: 'Quickly onboard thousands of contractors with automated interviews, ensuring supply meets immediate market demand efficiently.'
    },
    {
      icon: <Target size={32} />,
      title: 'High-Volume Hiring Teams',
      description: 'Process hundreds of applicants daily for roles with high turnover, drastically cutting down manual screening and phone calls.'
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Remote Teams',
      description: 'Conduct time-zone agnostic, first-stage interviews 24/7, maintaining recruitment flow regardless of candidate location.'
    },
  ];
  const audioFileUrl = "/audio/call-recording.wav";
  const isMobile = useIsMobile();
  
  // Determine the correct text based on the device
  const orbText = isMobile 
    ? "Tap to listen to our AI Agent" 
    : "Hover to listen to our AI Agent";
  return (
    <>
      <Navbar onOpenModal={openModal} />
      
      {/* Hero Section */}
      {/* Hero Section */}
<section
  id="hero"
  style={{ position: "relative", height: "60vw", overflow: "hidden" }}
  className="relative z-10 flex flex-col"
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
    />
  </div>

  <div className="w-full relative z-10">
    <div className="text-center mt-[35vw] sm:mt-[25vw] md:mt-[20vw] lg:mt-[16vw] text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-sans font-medium px-4">
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
    </div>
  </div>

  <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none">
    <div className="w-full h-full bg-linear-to-t from-black via-black/80 to-transparent"></div>
  </div>
</section>

      <div className=""><TimeSavedStats /></div>

      {/* Orb Audio Section */}
      <section className="pt-20 px-4">
        <div className="flex justify-center items-center mb-8">
          <ShinyText
            text={orbText}
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl"
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

      {/* Who Uses TheHireAI Section */}
      <section id="who-uses" className="w-full py-20 px-4">
        <div className="flex justify-center items-center mb-16">
          <ShinyText
            text="Who Uses TheHireAI"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl"
          />
        </div>
        
        <div className="rounded-2xl shadow-xl font-sans border border-[#3b1e52] p-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personasData.map((persona, index) => (
              <SpotlightPersonaCard 
                key={index} 
                icon={persona.icon} 
                title={persona.title} 
                description={persona.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose">
        <div className="flex justify-center items-center my-16">
          <ShinyText
            text="Why Choose TheHireAI"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl mob:text-xl"
          />
        </div>
        <WhyChooseSection/>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
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