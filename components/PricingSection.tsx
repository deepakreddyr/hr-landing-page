import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Star, DollarSign, Briefcase, TrendingUp, TabletSmartphone, 
  PieChart, ShieldCheck, Server, X, UserCog, Bot, Users, 
  Bell, Download, Zap, LineChart
} from 'lucide-react'; 
import ShinyText from './ShinyText';
// Import the DemoModal component (assuming it's exported as a named export)
import { DemoModal } from './DemoModal';
// --- Pricing Plan Data ---
const pricingPlans = [
  {
    name: "Starter",
    priceMonthly: "100 credits",
    priceAnnually: "990", 
    currency: "",
    // billingFrequency: "/month",
    description: "Perfect for small teams or pilot projects to automate initial screening.",
    features: [
      "Voice AI screening calls",
      "Automatic call summaries & transcripts",
      "AI-powered candidate scoring",
      "Detailed performance reports",
      "Standard email support",
    ],
    buttonText: "Start Free Trial",
    isPopular: false,
    headerIcon: <Zap size={20} className="text-purple-400" />,
    // callLimit: "100 calls/month",
  },
  {
    name: "Pro Plan",
    priceMonthly: "399",
    priceAnnually: "3990", 
    currency: "$",
    billingFrequency: "/month",
    description: "Ideal for growing HR departments needing high-volume, reliable automation.",
    features: [
      "Voice AI screening calls",
      "Automatic call summaries & transcripts",
      "AI-powered candidate scoring",
      "Detailed performance reports",
      "Priority support assistance.",
      "Team collaboration tools",
    ],
    buttonText: "Get Started Now",
    isPopular: true,
    headerIcon: <LineChart size={20} className="text-pink-400" />,
    callLimit: "500 calls/month",
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnually: "Custom",
    currency: "",
    billingFrequency: "",
    description: "Tailored solution for large organizations with complex integration needs.",
    features: [
      "Dedicated account manager",
      "Customizable tools & API access",
      "Integration with third-party systems",
      "Advanced AI-driven insights",
      "Unlimited team collaboration",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
    headerIcon: <Briefcase size={20} className="text-indigo-400" />,
    callLimit: "Unlimited / Custom",
  },
];

// --- Feature Icons Mapping ---
const featureIcons: { [key: string]: React.ReactNode } = {
  "Voice AI screening calls": <CheckCircle2 size={20} className="text-purple-400" />,
  "Automatic call summaries & transcripts": <CheckCircle2 size={20} className="text-purple-400" />,
  "AI-powered candidate scoring": <CheckCircle2 size={20} className="text-purple-400" />,
  "Detailed performance reports": <CheckCircle2 size={20} className="text-purple-400" />,
  "Standard email support": <CheckCircle2 size={20} className="text-purple-400" />,
  "Priority support assistance.": <CheckCircle2 size={20} className="text-pink-400" />,
  "Team collaboration tools": <CheckCircle2 size={20} className="text-pink-400" />,
  "Dedicated account manager": <CheckCircle2 size={20} className="text-indigo-400" />,
  "Customizable tools & API access": <CheckCircle2 size={20} className="text-indigo-400" />,
  "Integration with third-party systems": <CheckCircle2 size={20} className="text-indigo-400" />,
  "Advanced AI-driven insights": <CheckCircle2 size={20} className="text-indigo-400" />,
  "Unlimited team collaboration": <CheckCircle2 size={20} className="text-indigo-400" />,
};

// --- Pricing Card Component (UPDATED with onOpenModal prop) ---
interface PricingCardProps {
  plan: typeof pricingPlans[0];
  isAnnual: boolean;
  onOpenModal: () => void; // New prop for modal
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual, onOpenModal }) => {
  const isCustom = plan.priceMonthly === "Custom";
  const currentPrice = isAnnual && !isCustom ? plan.priceAnnually : plan.priceMonthly;
  const currentBillingFrequency = isCustom ? "" : (isAnnual ? "/year" : "/month");

  const buttonClasses = plan.isPopular
    ? "bg-white text-gray-900 font-semibold hover:bg-gray-100 shadow-lg"
    : "bg-gray-800 text-white border border-purple-700 hover:bg-purple-900/50";

  return (
    <motion.div
      className="flex flex-col rounded-3xl border border-gray-800 bg-gray-900/40 p-6 backdrop-blur-md shadow-2xl relative
                 transition-all duration-300 ease-in-out
                 hover:border-purple-600 dark:hover:shadow-[0_0_25px_rgba(128,0,128,0.7)]"
      whileHover={{ 
        scale: 1.05,        
        y: -10,             
        zIndex: 10          
      }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      {plan.isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-purple-600 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={12} className="text-white fill-white" /> MOST POPULAR
        </div>
      )}

      {/* Header with Icon and Name */}
      <div className="flex items-center gap-3 mb-4 text-white">
        {plan.headerIcon}
        <h3 className="text-xl font-semibold">{plan.name}</h3>
      </div>

      {/* Call Limit */}
      <p className="text-sm font-medium text-purple-400 mb-2">{plan.callLimit}</p>

      {/* Price */}
      <div className="mb-6">
        {isCustom ? (
          <p className="text-5xl font-bold text-white leading-tight">Custom</p>
        ) : (
          <p className="text-6xl font-extrabold text-white leading-none">
            {plan.currency}{currentPrice}
            <span className="text-xl font-medium text-gray-400">{currentBillingFrequency}</span>
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

      {/* Features Section */}
      <p className="text-sm font-semibold uppercase tracking-wider mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
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

// --- Main Pricing Section Component (UPDATED to manage modal) ---
const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state added here

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
          Choose a plan that fits your investment goals, whether you're just starting or scaling your portfolio.
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
            Bill Annually
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-0"> 
          {pricingPlans.map((plan, index) => (
            <div key={index} className='relative z-0'> 
               <PricingCard 
                 plan={plan} 
                 isAnnual={isAnnual} 
                 onOpenModal={() => setIsModalOpen(true)} // Pass handler down
               />
            </div>
          ))}
        </div>
      </div>
      
      {/* Demo Modal Rendered Here */}
      <DemoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default PricingSection;