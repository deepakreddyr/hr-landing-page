// components/PricingSection.tsx

"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { 
  CheckCircle2, DollarSign, Briefcase, Server, Zap, LineChart
} from 'lucide-react';

// Your existing pricing plans with the new UI structure
const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams or pilot projects to automate initial screening and testing.",
    price: 100,
    yearlyPrice: 1000,
    currency: "Credits",
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const,
    popular: false,
    callLimit: "Credit Based Usage",
    includes: [
      "START WITH:",
      "Voice AI screening calls",
      "Automatic call summaries",
      "Automatic call transcripts",
      "AI-powered candidate scoring",
      "Detailed performance reports",
      "Standard email support",
    ],
  },
  {
    name: "Growth",
    description: "Ideal for growing HR departments needing high-volume screening capability.",
    price: 2000,
    yearlyPrice: 20000,
    currency: "Credits",
    buttonText: "Choose Plan",
    buttonVariant: "default" as const,
    popular: true,
    callLimit: "Credit Based Usage",
    includes: [
      "EVERYTHING IN STARTER, PLUS:",
      "Voice AI screening calls",
      "Automatic call summaries",
      "Automatic call transcripts",
      "AI-powered candidate scoring",
      "Detailed performance reports",
      "Priority support assistance",
      "Team collaboration tools",
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations interested in additional features and tailored plans.",
    price: null, // Custom
    yearlyPrice: null,
    currency: "",
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
    popular: false,
    callLimit: "Unlimited / Custom Volume",
    includes: [
      "EVERYTHING IN SCALE, PLUS:",
      "Custom Plan Of Your Needs",
      "Advanced AI-driven insights",
      "Unlimited team collaboration",
    ],
  },
];

// Feature icons mapping
const featureIcons: { [key: string]: React.ReactNode } = {
  "Voice AI screening calls": <CheckCircle2 size={20} className="text-purple-400" />,
  "Automatic call summaries": <CheckCircle2 size={20} className="text-purple-400" />,
  "Automatic call transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "AI-powered candidate scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Detailed performance reports": <CheckCircle2 size={20} className="text-purple-400" />,
  "Standard email support": <CheckCircle2 size={20} className="text-purple-400" />,
  "Priority support assistance": <CheckCircle2 size={20} className="text-purple-400" />,
  "Team collaboration tools": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited AI screening/scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited call summaries": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited call transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "Dedicated account manager": <CheckCircle2 size={20} className="text-purple-400" />,
  "Advanced AI-driven insights": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited team collaboration": <CheckCircle2 size={20} className="text-purple-400" />,
  "Volume pricing": <DollarSign size={20} className="text-purple-400" />,
  "SSO": <Server size={20} className="text-purple-400" />,
  "Shared Slack channel": <LineChart size={20} className="text-purple-400" />,
  "Support SLA": <Briefcase size={20} className="text-purple-400" />,
};

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-200",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-purple-600 border-purple-600 bg-gradient-to-t from-purple-500 to-purple-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Bill Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-200",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-purple-600 border-purple-600 bg-gradient-to-t from-purple-500 to-purple-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Bill Annually (Save 17%)</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div
      className="min-h-screen mx-auto relative bg-black overflow-x-hidden"
      ref={pricingRef}
    >


      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-50">
        <h2 className="text-4xl font-medium text-white">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Pricing And Planning
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-300"
        >
          Choose a plan that fits your staffing goals, from pay-as-you-go credits to unlimited usage tiers.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      {/* MODIFICATION: Switched to Flexbox for better centering of 3 items in a wide container */}
      <div className="flex flex-wrap justify-center max-w-7xl gap-4 py-6 mx-auto px-4">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            // Added explicit widths for items to maintain responsiveness similar to the old grid:
            // Full width on mobile, 1/2 width on medium (md), and 1/4 width on large (lg).
            // NOTE: The inner Card component needs to be full width (w-full) inside this wrapper.
            className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
          >
            <Card className="relative text-white border-neutral-800 bg-gradient-to-br from-neutral-900/90 via-neutral-900/50 to-neutral-900/90 backdrop-blur-xl h-full flex flex-col">
              <CardHeader className="text-left pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                </div>
                
                <div className="flex flex-col mb-4 min-h-[48px]">
                  {plan.price === null ? (
                    // Logic corrected: Assuming "Enterprise" is custom
                    plan.name === "Enterprise" ? (
                      <span className="text-4xl font-bold leading-tight">Custom</span>
                    ) : (
                       // Fallback for other custom/unhandled cases
                       <span className="text-4xl font-bold leading-tight">N/A</span>
                    )
                  ) : (
                    <div className="flex items-baseline">
                      <NumberFlow
                        format={{ useGrouping: true }}
                        value={isYearly ? plan.yearlyPrice : plan.price}
                        className="text-4xl font-bold"
                      />
                      <span className="text-gray-300 ml-1 text-base">
                        {plan.currency} /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 min-h-[60px]">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col mt-0">
                <button
                  className={`w-full mb-6 p-3 text-base rounded-xl transition-all ${
                    plan.popular
                      ? "bg-white text-gray-900 font-semibold hover:bg-gray-100 shadow-lg shadow-blue-500/50"
                      : "bg-gradient-to-b from-neutral-800 to-neutral-900 text-white font-semibold hover:from-neutral-700 hover:to-neutral-800 border border-neutral-700"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-3">
                  <h4 className="font-medium text-xs mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 uppercase tracking-wider">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2.5">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        {featureIcons[feature] || <CheckCircle2 size={20} className="text-purple-400 flex-shrink-0" />}
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}