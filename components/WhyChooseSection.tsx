// components/WhyChooseSection.tsx
import React, { useState, useEffect } from 'react';
import SpotlightCard from '@/components/SpotlightCard';
import { 
  Zap, Brain, Plug, Clock, TrendingUp, Heart, Database, 
  Shield, MessageSquare, Monitor, BarChart
} from 'lucide-react';

const featuresData = [
  {
    icon: <Zap size={48} />,
    title: "Instant Voice Interviews",
    description:
      "Candidates are interviewed automatically within seconds of applying—no scheduling, no delays, just instant engagement that boosts conversion.",
  },
  {
    icon: <Brain size={48} />,
    title: "Smart AI Candidate Understanding",
    description:
      "Our AI understands answers like a human recruiter—context, intent, clarity, and relevance—ensuring accurate evaluations every time.",
  },
  {
    icon: <Shield size={48} />,
    title: "Enterprise-Grade Security",
    description:
      "All candidate data, call recordings, and summaries are encrypted end-to-end with strict compliance standards designed for HR workflows.",
  },
  {
    icon: <Plug size={48} />,
    title: "Plug-and-Play With Your Workflow",
    description:
      "Connect your ATS, job boards, and internal hiring tools effortlessly. No engineering hours, no complex setup—start in under 5 minutes.",
  },
  {
    icon: <Clock size={48} />,
    title: "Follows-Up & Reschedules Automatically",
    description:
      "If a candidate misses or reschedules a call, the system automatically retries at the perfect time—no manual follow-ups needed.",
  },
  {
    icon: <TrendingUp size={48} />,
    title: "Scales to 500+ Calls in Parallel",
    description:
      "Whether you’re hiring 10 or 10,000 people, handle every interview simultaneously with zero human load or infrastructure overhead.",
  },
  {
    icon: <Heart size={48} />,
    title: "Sentiment + Confidence Scoring",
    description:
      "Get emotion-aware insights that detect clarity, confidence, hesitation, and enthusiasm—going far beyond what text résumés reveal.",
  },
  {
    icon: <Database size={48} />,
    title: "ATS-Ready Structured Reports",
    description:
      "Every call generates transcripts, summaries, red flags, and skill scores—cleanly formatted and instantly exportable to your ATS.",
  },
  {
    icon: <MessageSquare size={48} />,
    title: "Multi-Language Calling",
    description:
      "Interview candidates in their preferred language—Hindi, English, Tamil, Telugu, Malayalam, Kannada, and more coming soon.",
  },
  {
    icon: <BarChart size={48} />,
    title: "AI-Powered Hiring Insights",
    description:
      "Spot hiring patterns, predict top performers, identify drop-off points, and optimize your funnel with powerful analytics dashboards.",
  },
];

const WhyChooseSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuresData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentFeature = featuresData[currentIndex];

  return (
    <section className="w-full py-20 px-4 relative overflow-hidden">
      {/* Container 1: Auto-Rotating Spotlight Feature */}
      <div className="rounded-2xl shadow-xl font-sans border border-[#3b1e52] bg-[#0a0614] p-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          
          {/* Left Side - Centered Big Heading */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Why Choose
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  TheHireAI
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-lg mx-auto">
                Powered by cutting-edge AI that transforms recruitment efficiency and candidate experience.
              </p>
            </div>
          </div>

          {/* Right Side - Animated SpotlightCard */}
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md">
              <SpotlightCard
                className="bg-[#1a0f28] rounded-2xl shadow-xl border border-[#3b1e52] overflow-hidden transition-all duration-500"
                spotlightColor="rgba(192, 192, 192, 0.4)"
              >
                <FeatureContent
                  icon={currentFeature.icon}
                  title={currentFeature.title}
                  description={currentFeature.description}
                  currentIndex={currentIndex}
                  totalFeatures={featuresData.length}
                />
              </SpotlightCard>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Feature Content Component with animation
const FeatureContent = ({ 
  icon, 
  title, 
  description,
  currentIndex,
  totalFeatures
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  currentIndex: number;
  totalFeatures: number;
}) => {
  return (
    <div className="p-8 h-full flex flex-col justify-between min-h-[400px]">
      {/* Icon */}
      <div className="text-5xl mb-6 text-[#e0f0ff] flex justify-center animate-fade-in">
        {icon}
      </div>
      
      {/* Title */}
      <h3 className="text-3xl font-bold text-white mb-4 text-center animate-fade-in">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-base text-gray-400 leading-relaxed text-center flex-grow animate-fade-in">
        {description}
      </p>

      {/* Progress Indicator */}
      <div className="mt-6 pt-6 border-[#3b1e52]">
        <div className="flex gap-2">
          {Array.from({ length: totalFeatures }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default WhyChooseSection;