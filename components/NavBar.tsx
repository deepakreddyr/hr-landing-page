import React from 'react';
export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  // isModalOpen state REMOVED from Navbar

  const navItems = [
    { label: "Use Cases", href: "#who-uses" },
    { label: "Features", href: "#why-choose" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          
          {/* Logo */}
          <a 
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="text-white text-xl font-bold hover:text-purple-400 transition-colors"
          >
            TheHireAI
          </a>

          {/* Center Navigation */}
          <div className="hidden lg:flex ml-8 bg-gray-900/80 border border-gray-700/50 shadow-2xl shadow-black/80 rounded-full px-8 py-2.5 space-x-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-white font-sans font-medium tracking-wide text-sm transition-colors duration-200 hover:text-purple-400 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Book Demo Button - USES PROP */}
          <button
            onClick={onOpenModal}
            className="px-6 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-blue-600 text-white font-medium text-sm whitespace-nowrap"
          >
            Book Demo
          </button>
        </div>
      </nav>

      {/* Demo Modal REMOVED from Navbar */}
    </>
  );
}