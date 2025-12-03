import React from 'react';
import { Mail, ArrowUpRight, Linkedin, Facebook, Twitter, Plus } from 'lucide-react';
import ShinyText from './ShinyText';
const Footer = () => {

  // 💡 UPDATED Navigation Links Data to match Navbar
  const navLinks = [
    { title: "Use Cases", href: "#who-uses" },
    { title: "Features", href: "#why-choose" },
    { title: "Pricing", href: "#pricing" },
  ];

  // Social Links Data
  const socialLinks = [
    { title: "LinkedIn", href: "#linkedin", icon: <Linkedin size={16} /> },
    { title: "Facebook", href: "#facebook", icon: <Facebook size={16} /> },
    { title: "Twitter", href: "#twitter", icon: <Twitter size={16} /> },
  ];

  return (
    <footer className="w-full bg-black text-white pt-20 pb-8 px-4 font-sans relative overflow-hidden">
      
      {/* Container for standard content (contact info and nav links) */}
      <div className="mx-auto max-w-7xl">
        
        {/* --- Middle Links & Contact Info --- */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-24">
          
          {/* Contact Email */}
          <div className="mb-8 md:mb-0">
            <p className="text-sm text-gray-400 mb-2">Contact TheHireAI at:</p>
            <a 
              href="mailto:contact@thehireai.com" 
              className="flex items-center text-xl font-medium text-white hover:text-purple-400 transition-colors group"
            >
              contact@thehireai.com
              <ArrowUpRight size={20} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <a key={link.title} href={link.href} className="hover:text-white transition-colors">
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
      
      {/* --- Full-Width Logo, Copyright, and Social --- */}
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-end mx-auto max-w-7xl pt-4 px-4 lg:px-0">
          <ShinyText
            text="TheHireAI"
            disabled={false}
            speed={5}
            className="text-[12vw] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-extrabold tracking-tight leading-none text-white opacity-80 mb-0"
          />
          
          {/* Social Links (Repositioned to the bottom right) */}
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 lg:mt-0">
            {socialLinks.map((link) => (
              <a key={link.title} href={link.href} className="hover:text-white transition-colors flex items-center gap-1">
                {link.title}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright (Placed in a separate full-width container for alignment) */}
        <div className="mx-auto max-w-7xl border-t border-gray-800 mt-4 pt-4 px-4 lg:px-0">
            <p className="text-sm text-gray-500">
              &copy; 2025 TheHireAI. All rights reserved.
            </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;