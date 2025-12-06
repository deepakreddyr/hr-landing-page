// components/TimeSavedStats.tsx
"use client";

import { Phone, Mail, MessageCircle, TrendingUp } from "lucide-react";
import ShinyText from "./ShinyText";
import { GlowingEffect } from "./ui/glowing-effect"; 
import { cn } from "@/lib/utils"; 
import { useIsMobile } from '@/hooks/useIsMobile'; 

interface StatCardProps {
  icon: React.ReactNode;
  statText: string;
  statSubText: string;
  title: string;
  footerIcon: React.ReactNode;
  footerText: string;
  chart: React.ReactNode;
  isMobile: boolean;
  isFullWidth?: boolean;
}

const StatCard = ({ 
  icon, 
  statText, 
  statSubText, 
  title, 
  footerIcon, 
  footerText, 
  chart, 
  isMobile,
  isFullWidth = false,
}: StatCardProps) => {
  
  const chartHeightClass = isFullWidth && isMobile ? "h-28" : "h-16 md:h-20";

  return (
    <li className={cn("min-h-[14rem] md:min-h-[18rem] list-none", isFullWidth && isMobile && "col-span-2")}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#3b1e52] p-1.5 md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={isMobile ? 128 : 64} 
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] p-3 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-1 mb-3 md:mb-6">
              <div className="bg-green-500/20 p-1.5 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-sm text-white font-semibold md:text-base">{statText}</span>
              <span className="text-xs text-slate-400 md:text-sm">{statSubText}</span>
            </div>

            <div className={cn("flex justify-center my-auto", chartHeightClass)}>
                {chart}
            </div>

            <div className="text-center mt-auto">
              <div className="text-xl md:text-3xl font-bold text-white mb-1">{title}</div>
            </div>

            <div className="flex items-center justify-center gap-1 text-slate-400">
              {footerIcon}
              <span className="text-[10px] uppercase tracking-wide md:text-xs">{footerText}</span>
            </div>
        </div>
      </div>
    </li>
  );
};


export default function TimeSavedStats() {
  const isMobile = useIsMobile();
  
  const GaugeChart = (
    <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
      {[...Array(12)].map((_, i) => {
        const angle = -180 + (i * 180) / 11
        const isActive = i < 7
        let color = "#475569"
        if (isActive) {
          if (i < 3) color = "#8B5CF6"
          else if (i < 5) color = "#A78BFA"
          else color = "#C4B5FD"
        }
        return (
          <rect
            key={i}
            x="95"
            y="10"
            width="10"
            height="25"
            rx="5"
            fill={color}
            transform={`rotate(${angle} 100 100)`}
          />
        )
      })}
      <text x="100" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold">500</text>
    </svg>
  );

  const BarChart = (
    <div className="flex items-end justify-center gap-2 h-full my-auto pb-1 md:pb-4 w-full">
      {[60, 75, 45, 55, 65, 50, 70, 90].map((height, i) => (
        <div
          key={i}
          className={`w-4 md:w-8 rounded-t-lg ${i === 7 ? "bg-purple-500" : "bg-slate-700"}`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );

  const AreaChart = (
    <div className="relative h-full my-auto pb-1 md:pb-4">
      <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d="M0,75 L30,62 L60,53 L90,56 L120,44 L150,47 L180,31 L210,28 L240,30 L270,37 L300,34 L300,100 L0,100 Z"
          fill="url(#areaGradient)"
        />

        <path
          d="M0,75 L30,62 L60,53 L90,56 L120,44 L150,47 L180,31 L210,28 L240,30 L270,37 L300,34"
          fill="none"
          stroke="#FB923C"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M0,75 L30,72 L60,66 L90,69 L120,59 L150,62 L180,53 L210,50 L240,53 L270,56 L300,55"
          fill="none"
          stroke="#EC4899"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative max-w-7xl mx-auto pt-10 pb-24 px-4">
        <div className="flex justify-center items-center mb-12">
          <ShinyText
            text="Time Saved Per Job"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl text-center"
          />
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          
          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            statText="500 Calls"
            statSubText="Saved"
            title="Per Candidate"
            footerIcon={<Phone className="w-5 h-5" />}
            footerText="Manual Calls Saved"
            chart={GaugeChart}
            isMobile={isMobile}
          />

          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            statText="1000+"
            statSubText="Saved"
            title="Hours"
            footerIcon={<Mail className="w-5 h-5" />}
            footerText="Screening from Portals"
            chart={BarChart}
            isMobile={isMobile}
          />

          <StatCard 
            icon={<TrendingUp className="w-5 h-5 text-green-400" />}
            statText="Data"
            statSubText="Managed"
            title="Automated"
            footerIcon={<MessageCircle className="w-5 h-5" />}
            footerText="Storage and Tracking"
            chart={AreaChart}
            isMobile={isMobile}
            isFullWidth={true}
          />
        </ul>
      </div>
    </div>
  )
}