import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Star, DollarSign, Briefcase, Server, Zap, LineChart
} from 'lucide-react'; 
import ShinyText from './ShinyText';
// Import the DemoModal component (assuming it's exported as a named export)
import { DemoModal } from './DemoModal';

// --- Pricing Plan Data (Standardized structure) ---
const pricingPlans = [
  // 1. STARTER PLAN (100 Credits)
  {
    name: "Starter",
    priceMonthly: "100 credits", 
    priceAnnually: "1000", 
    currency: "Credits",
    billingFrequency: "/mo", 
    description: "Perfect for small teams or pilot projects to automate initial screening and testing.",
    features: [
      "Voice AI screening calls",
      "Automatic call summaries",
      "Automatic call transcripts",
      "AI-powered candidate scoring",
      "Detailed performance reports",
      "Standard email support",
    ],
    buttonText: "Start Free Trial",
    isPopular: false,
    headerIcon: <Zap size={20} className="text-purple-400" />,
    callLimit: "Credit Based Usage",
    callToActionStyle: "primary", 
    showPricing: true,
  },
  
  // 2. GROWTH PLAN (2000 Credits)
  {
    name: "Growth",
    priceMonthly: "2000 credits", 
    priceAnnually: "20000", 
    currency: "Credits",
    billingFrequency: "/mo",
    description: "Ideal for growing HR departments needing high-volume screening capability.",
    features: [
      "Voice AI screening calls", 
      "Automatic call summaries",
      "Automatic call transcripts", 
      "AI-powered candidate scoring", 
      "Detailed performance reports", 
      "Priority support assistance.", 
      "Team collaboration tools",      
    ],
    buttonText: "Choose Plan",
    isPopular: true,
    headerIcon: <LineChart size={20} className="text-purple-400" />,
    callLimit: "Credit Based Usage",
    callToActionStyle: "popular", 
    showPricing: true,
  },
  
  // 3. SCALE PLAN (Unlimited Screening, 500 Calls/Month Limit)
  {
    name: "Scale",
    priceMonthly: "Unlimited", 
    priceAnnually: "Unlimited", 
    currency: "", 
    billingFrequency: "/mo",
    description: "Best for scaling companies who need high-volume, fixed-cost call capability.",
    features: [
      "Unlimited AI screening/scoring",
      "Unlimited call summaries",
      "Unlimited call transcripts",
      "AI-powered candidate scoring", 
      "Detailed performance reports", 
      "Priority support assistance.", 
      "Team collaboration tools", 
    ],
    buttonText: "Choose Plan",
    isPopular: false,
    headerIcon: <Server size={20} className="text-purple-400" />,
    callLimit: "500 Calls Included / Month", 
    callToActionStyle: "primary",
    showPricing: true,
  },
  
  // 4. ENTERPRISE PLAN (Custom)
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnually: "Custom",
    currency: "",
    billingFrequency: "",
    description: "For organizations interested in additional features and tailored plans.",
    features: [
      "Dedicated account manager",
      "Volume pricing",
      "SSO",
      "Shared Slack channel",
      "Support SLA",
      "Advanced AI-driven insights",
      "Unlimited team collaboration",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
    headerIcon: <Briefcase size={20} className="text-purple-400" />,
    callLimit: "Unlimited / Custom Volume",
    callToActionStyle: "custom", 
    showPricing: false, 
  },
];

// --- Feature Icons Mapping (Standardized to Purple) ---
const featureIcons: { [key: string]: React.ReactNode } = {
  // Use CheckCircle2 for most features
  "Voice AI screening calls": <CheckCircle2 size={20} className="text-purple-400" />,
  "Automatic call summaries": <CheckCircle2 size={20} className="text-purple-400" />,
  "Automatic call transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "AI-powered candidate scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Detailed performance reports": <CheckCircle2 size={20} className="text-purple-400" />,
  "Standard email support": <CheckCircle2 size={20} className="text-purple-400" />,
  "Priority support assistance.": <CheckCircle2 size={20} className="text-purple-400" />,
  "Team collaboration tools": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited AI screening/scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited call summaries": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited call transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "Dedicated account manager": <CheckCircle2 size={20} className="text-purple-400" />,
  "Advanced AI-driven insights": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited team collaboration": <CheckCircle2 size={20} className="text-purple-400" />,
  
  // Custom icons for Enterprise features to match the image structure
  "Volume pricing": <DollarSign size={20} className="text-purple-400" />, 
  "SSO": <Server size={20} className="text-purple-400" />, 
  "Shared Slack channel": <LineChart size={20} className="text-purple-400" />, 
  "Support SLA": <Briefcase size={20} className="text-purple-400" />, 
};

// --- Pricing Card Component ---
interface PricingCardProps {
  plan: typeof pricingPlans[0];
  isAnnual: boolean;
  onOpenModal: () => void; 
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual, onOpenModal }) => {
  const isCustom = plan.priceMonthly === "Custom";
  const isUnlimited = plan.priceMonthly === "Unlimited"; 
  
  let priceValue = plan.priceMonthly;
  if (isAnnual && !isCustom && !isUnlimited) {
      priceValue = plan.priceAnnually;
  }
  
  let displayPrice = priceValue;
  let displayFrequency = isCustom ? "" : (isAnnual && !isUnlimited ? "/yr" : "/mo"); 

  // --- Button Classes based on callToActionStyle ---
  let buttonClasses = "";
  switch (plan.callToActionStyle) {
    case 'popular':
      // White button for the "BEST VALUE" plan
      buttonClasses = "bg-white text-gray-900 font-semibold hover:bg-gray-100 shadow-lg";
      break;
    case 'custom':
      // Dark border button for Contact Sales / Custom plan
      buttonClasses = "bg-transparent text-white border border-white/30 hover:bg-white/10";
      break;
    case 'primary':
    default:
      // Purple button for the main CTA
      buttonClasses = "bg-purple-600 text-white font-semibold hover:bg-purple-700 shadow-md shadow-purple-900/50";
      break;
  }
  
  // --- Price Content Construction ---
  const priceContent = plan.name === "Enterprise" ? (
      // FIX: Changed color from cyan to a subtle purple
      <p className="text-4xl font-bold text-white pt-3 leading-tight">Custom</p>
  ) : (
      <>
          {plan.name !== "Enterprise" && (
            <p className="text-sm font-medium text-gray-400 leading-tight mb-1 uppercase">
              Starting At
            </p>
          )}
          <p className="text-3xl font-extrabold text-white leading-none">
            {isUnlimited ? displayPrice : `${displayPrice}`}
            <span className="text-xl font-medium text-gray-400">
                {isUnlimited ? '' : displayFrequency}
            </span>
          </p>
      </>
  );

  return (
    <motion.div
      className="flex flex-col rounded-3xl border border-gray-800 bg-gray-900/40 p-6 backdrop-blur-md shadow-2xl relative
                 transition-all duration-300 ease-in-out h-full text-left
                 hover:border-purple-600"
      whileHover={{ 
        // FIX: Removed scale and y transformation, kept only boxShadow (the glow)
        boxShadow: "0 0 35px rgba(168, 85, 247, 0.4)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={12} className="text-white fill-white" /> BEST VALUE
        </div>
      )} */}

      {/* Header with Icon and Name */}
      <div className="flex items-center gap-3 mb-4 text-white flex-shrink-0">
        {plan.headerIcon}
        <h3 className="text-xl font-semibold">{plan.name}</h3>
      </div>
      
      {/* Short Description (Fills available space) */}
      <p className="text-gray-400 text-base mb-6 **grow**">{plan.description}</p>
      
      {/* Action Button Container: Push Button to the bottom (Key for alignment) */}
      <div className='flex flex-col flex-shrink-0 justify-end'>
          <button 
            onClick={onOpenModal}
            className={`w-full py-3 rounded-xl transition-colors mb-6 ${buttonClasses}`}
          >
            {plan.buttonText}
          </button>
      </div>


      {/* Price Section (Flex-shrink-0 to push the button) */}
      <div className="mb-6 flex-shrink-0">
        {priceContent}
      </div>


      {/* Features Section (Uses grow class to fill vertical space) */}
      <p className="text-sm font-semibold uppercase tracking-wider mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 flex-shrink-0">
        {plan.name === "Starter" ? "Start with:" : `Everything in ${pricingPlans[plan.name === "Growth" ? 0 : 1].name}, plus:`}
      </p>
      {/* HEIGHT CONTROL: overflow-y-auto is the key to containing long lists while maintaining card height */}
      <ul className="space-y-3 **grow** overflow-y-auto pr-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            {featureIcons[feature] || <CheckCircle2 size={20} className="text-purple-500" />} 
            <span className="text-sm leading-relaxed whitespace-normal break-words">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// --- Main Pricing Section Component ---
const PricingSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section id="pricing" className="w-full py-24 px-4 bg-black font-sans text-white overflow-hidden">
      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="mx-auto max-w-7xl"> 
        {/* Main Heading - LEFT ALIGNED */}
        <div className="flex justify-center items-center mb-8">
          <ShinyText
            text="Pricing And Planning"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl"
          />
        </div>
        {/* Paragraph - LEFT ALIGNED */}
        {/* <p className="text-xl text-gray-400 max-w-3xl mb-16 text-left md:mx-auto md:text-center">
          Choose a plan that fits your staffing goals, from pay-as-you-go credits to unlimited usage tiers.
        </p> */}
        
        {/* Billing Toggle - Remains centered */}
        <div className="flex justify-center">
            <div className="inline-flex rounded-xl bg-gray-800 p-1 mb-16">
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !isAnnual ? 'bg-purple-700 text-white shadow-md shadow-purple-900/50' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsAnnual(false)}
              >
                Bill Monthly
              </button>
              <button
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isAnnual ? 'bg-purple-700 text-white shadow-md shadow-purple-900/50' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsAnnual(true)}
              >
                Bill Annually (Save 17%)
              </button>
            </div>
        </div>


        {/* Pricing Cards Container - Mobile Scrollable with Framer Motion */}
        <motion.div 
          className="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 relative z-0 md:items-stretch
                     flex md:flex-none overflow-x-auto gap-4 pb-8 snap-x snap-mandatory scrollbar-hide
                     [-webkit-overflow-scrolling:touch] px-6 -mx-6 md:px-0 md:mx-0"
          onScroll={(e) => {
            const container = e.currentTarget;
            const cardWidth = container.scrollWidth / pricingPlans.length;
            const newIndex = Math.round(container.scrollLeft / cardWidth);
            setActiveCard(newIndex);
          }}
        > 
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index} 
              className='relative z-0 h-full w-[90vw] sm:w-[75vw] md:w-auto md:min-w-0 snap-center flex-shrink-0'
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              // Removed whileHover for the card itself
            > 
               <PricingCard 
                 plan={plan} 
                 isAnnual={isAnnual} 
                 onOpenModal={onOpenModal} 
               />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Active Scroll Indicator Dots for Mobile */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {pricingPlans.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeCard === index 
                  ? 'w-8 bg-purple-500' 
                  : 'w-2 bg-purple-500/30'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={{
                scale: activeCard === index ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;