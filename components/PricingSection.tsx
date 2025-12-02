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
    priceMonthly: "100", 
    priceAnnually: "1000", // Example annual credit block
    currency: "Credits",
    billingFrequency: "/month",
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
  },
  
  // 2. GROWTH PLAN (2000 Credits)
  {
    name: "Growth",
    priceMonthly: "2000", 
    priceAnnually: "20000", // Example annual credit block
    currency: "Credits",
    billingFrequency: "/month",
    description: "Ideal for growing HR departments needing high-volume screening capability.",
    features: [
      "Voice AI screening calls", // Consistent feature
      "Automatic call summaries",
      "Automatic call transcripts", // Consistent feature
      "AI-powered candidate scoring", // Consistent feature
      "Detailed performance reports", // Consistent feature
      "Priority support assistance.", // Added to Starter feature set
      "Team collaboration tools",      
    ],
    buttonText: "Get Started Now",
    isPopular: true,
    headerIcon: <LineChart size={20} className="text-purple-400" />,
    callLimit: "Credit Based Usage",
  },
  
  // 3. SCALE PLAN (Unlimited Screening, 500 Calls/Month Limit)
  {
    name: "Scale",
    priceMonthly: "Unlimited", // <--- MODIFIED to Unlimited
    priceAnnually: "Unlimited", // <--- MODIFIED to Unlimited
    currency: "", 
    billingFrequency: "/month",
    description: "Best for scaling companies who need high-volume, fixed-cost call capability.",
    features: [
      "Unlimited AI screening/scoring",
      "Unlimited call summaries",
      "Unlimited call transcripts",
      "AI-powered candidate scoring", // Added for consistency
      "Detailed performance reports", // Added for consistency
      "Priority support assistance.", // Consistent feature
      "Team collaboration tools", // Consistent feature
    ],
    buttonText: "Choose Plan",
    isPopular: false,
    headerIcon: <Server size={20} className="text-purple-400" />,
    callLimit: "500 Calls Included / Month", // Specific limit
  },
  
  // 4. ENTERPRISE PLAN (Custom)
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnually: "Custom",
    currency: "",
    billingFrequency: "",
    description: "Tailored solution for large organizations with complex integration needs and custom volume.",
    features: [
      "Unlimited AI screening/scoring", // For consistency with Scale
      "Unlimited call summaries",
      "Unlimited call transcripts", // For consistency with Scale
      "AI-powered candidate scoring", // For consistency
      "Detailed performance reports", // For consistency
      "Dedicated account manager",
      "Advanced AI-driven insights",
      "Unlimited team collaboration",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
    headerIcon: <Briefcase size={20} className="text-purple-400" />,
    callLimit: "Unlimited / Custom Volume",
  },
];

// --- Feature Icons Mapping (Standardized to Purple) ---
const featureIcons: { [key: string]: React.ReactNode } = {
  // All feature icons standardized to text-purple-400
  "Voice AI screening calls": <CheckCircle2 size={20} className="text-purple-400" />,
  "Automatic call summaries & transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "AI-powered candidate scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Detailed performance reports": <CheckCircle2 size={20} className="text-purple-400" />,
  "Standard email support": <CheckCircle2 size={20} className="text-purple-400" />,
  "Priority support assistance.": <CheckCircle2 size={20} className="text-purple-400" />,
  "Team collaboration tools": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited AI screening/scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited call summaries & transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "Customizable tools & API access (Basic)": <CheckCircle2 size={20} className="text-purple-400" />,
  "Dedicated account manager": <CheckCircle2 size={20} className="text-purple-400" />,
  "Customizable tools & API access (Full)": <CheckCircle2 size={20} className="text-purple-400" />,
  "Integration with third-party systems": <CheckCircle2 size={20} className="text-purple-400" />,
  "Advanced AI-driven insights": <CheckCircle2 size={20} className="text-purple-400" />,
  "Unlimited team collaboration": <CheckCircle2 size={20} className="text-purple-400" />,
};

// --- Pricing Card Component ---
interface PricingCardProps {
  plan: typeof pricingPlans[0];
  isAnnual: boolean;
  onOpenModal: () => void; 
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual, onOpenModal }) => {
  const isCustom = plan.priceMonthly === "Custom";
  const isUnlimited = plan.priceMonthly === "Unlimited"; // <-- New check
  
  let priceValue = plan.priceMonthly;
  if (isAnnual && !isCustom && !isUnlimited) {
      priceValue = plan.priceAnnually;
  }
  
  // Determine display price/currency
  let displayPrice = priceValue;
  let displayCurrency = plan.currency;
  // Frequency for Unlimited is still /month
  let displayFrequency = isCustom ? "" : (isAnnual && !isUnlimited ? "/year" : "/month"); 

  if (plan.currency === "Credits") {
      displayPrice = priceValue;
      displayCurrency = "Credits";
  }


  const buttonClasses = plan.isPopular
    ? "bg-white text-gray-900 font-semibold hover:bg-gray-100 shadow-lg"
    : "bg-gray-800 text-white border border-purple-700 hover:bg-purple-900/50";

  return (
    <motion.div
      // 💡 h-full ensures equal height within the grid row
      className="flex flex-col rounded-3xl border border-gray-800 bg-gray-900/40 p-6 backdrop-blur-md shadow-2xl relative
                 transition-all duration-300 ease-in-out h-full
                 hover:border-purple-600 dark:hover:shadow-[0_0_25px_rgba(128,0,128,0.7)]"
      whileHover={{ 
        scale: 1.05,        
        y: -10,             
        zIndex: 10          
      }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      {plan.isPopular && (
        // 💡 Standardized Popular Badge to purple gradient
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={12} className="text-white fill-white" /> BEST VALUE
        </div>
      )}

      {/* Header with Icon and Name */}
      <div className="flex items-center gap-3 mb-4 text-white">
        {plan.headerIcon}
        <h3 className="text-xl font-semibold">{plan.name}</h3>
      </div>

      {/* Call Limit (Standardized to purple text) */}
      <p className="text-sm font-medium mb-2 text-purple-400">
        {plan.callLimit}
      </p>

      {/* Price */}
      <div className="mb-6">
        {isCustom || isUnlimited ? ( // <-- Updated logic for Custom/Unlimited
          <p className="text-5xl font-bold text-white leading-tight">{displayPrice}</p>
        ) : (
          <p className="text-6xl font-extrabold text-white leading-none">
            {displayCurrency === '$' ? '$' : ''}{displayPrice}
            <span className="text-xl font-medium text-gray-400">
                {displayCurrency !== '$' ? ` ${displayCurrency}` : ''}{displayFrequency}
            </span>
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-400 text-base mb-8 grow">{plan.description}</p>

      {/* Action Button - ADDED onClick HANDLER */}
      <button 
        onClick={onOpenModal}
        className={`w-full py-3 rounded-xl transition-colors mb-8 ${buttonClasses}`}
      >
        {plan.buttonText}
      </button>

      {/* Features Section (Standardized to purple gradient) */}
      <p className="text-sm font-semibold uppercase tracking-wider mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
        WHAT YOU GET
      </p>
      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300">
            {featureIcons[feature] || <CheckCircle2 size={20} className="text-purple-500" />} 
            <span className="text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// --- Main Pricing Section Component ---
const PricingSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="w-full py-24 px-4 bg-black font-sans text-white">
      <div className="mx-auto max-w-7xl text-center">
        
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 text-sm text-gray-400 mb-4 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
          <DollarSign size={16} className="text-purple-500" /> PRICING
        </div>

        {/* Main Heading */}
        <div className="flex justify-center items-center mb-8">
          <ShinyText
            text="Pricing And Planning"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl"
          />
        </div>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
          Choose a plan that fits your staffing goals, from pay-as-you-go credits to unlimited usage tiers.
        </p>
        
        {/* Billing Toggle */}
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

        {/* Pricing Cards Grid (items-stretch ensures equal height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-0 items-stretch"> 
          {pricingPlans.map((plan, index) => (
            // h-full on the outer div is crucial for grid behavior
            <div key={index} className='relative z-0 h-full'> 
               <PricingCard 
                 plan={plan} 
                 isAnnual={isAnnual} 
                 onOpenModal={onOpenModal} 
               />
            </div>
          ))}
        </div>
      </div>
      
      {/* Note: DemoModal rendering logic should be in the parent component (e.g., Home.jsx) 
          and passed down via onOpenModal prop. */}
    </section>
  );
};

export default PricingSection;