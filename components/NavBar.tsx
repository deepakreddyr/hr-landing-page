import React, { useRef, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const menuRef = useRef<any>(null);

  const navItems = [
    { label: "Use Cases", href: "#who-uses" },
    { label: "Features", href: "#why-choose" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  // Menu items for StaggeredMenu (mobile)
  const menuItems = [
    { label: 'Use Cases', ariaLabel: 'View use cases', link: '#who-uses' },
    { label: 'Features', ariaLabel: 'Explore features', link: '#why-choose' },
    { label: 'Pricing', ariaLabel: 'View pricing', link: '#pricing' },
    { label: 'Contact', ariaLabel: 'Contact us', link: '#contact' },
    // { label: 'Login', ariaLabel: 'Login or Sign Up', link: 'https://www.thehireai.in/login' },

  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHamburgerClick = () => {
    const toggleBtn = document.querySelector('.sm-toggle') as HTMLButtonElement;
    if (toggleBtn) {
      toggleBtn.click();
    }
  };

  // Add click handlers to menu items after component mounts
  useEffect(() => {
    const handleMenuClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const menuItem = target.closest('.sm-panel-item') as HTMLAnchorElement;
      
      if (menuItem) {
        const link = menuItem.getAttribute('href');
        
        if (link && link.startsWith('#')) {
          e.preventDefault();
          
          // Close the menu
          const toggleBtn = document.querySelector('.sm-toggle') as HTMLButtonElement;
          if (toggleBtn) {
            toggleBtn.click();
          }
          
          // Scroll to section after menu closes
          setTimeout(() => {
            const targetId = link.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 350);
        }
      }
    };

    // Attach event listener to the menu panel
    const menuPanel = document.querySelector('.staggered-menu-panel');
    if (menuPanel) {
      menuPanel.addEventListener('click', handleMenuClick);
    }

    return () => {
      if (menuPanel) {
        menuPanel.removeEventListener('click', handleMenuClick);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:block fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-sm">
        <div className="grid grid-cols-3 items-center max-w-7xl mx-auto">
          
          {/* Column 1: Logo */}
          <div className="flex justify-start">
            <a 
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="text-white text-xl font-bold hover:text-purple-400 transition-colors"
            >
              TheHireAI
            </a>
          </div>

          {/* Column 2: Center Navigation */}
          <div className="flex col-span-1 justify-center"> 
            <div className="bg-gray-900/80 border border-gray-700/50 shadow-2xl shadow-black/80 rounded-full px-8 py-2.5 space-x-10">
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
          </div>

          {/* Column 3: Buttons */}
          <div className="flex items-center space-x-4 justify-end">
            <a
              href="https://app.thehireai.in/login"
              className="px-6 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-blue-600 text-white font-medium text-sm whitespace-nowrap hover:bg-purple-900/30 transition-colors"
            >
              Login
            </a>

            <button
              onClick={onOpenModal}
              className="px-6 py-2.5 rounded-full bg-linear-to-r from-purple-500 to-blue-600 text-white font-medium text-sm whitespace-nowrap"
            >
              Book Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar with StaggeredMenu */}
      <div className="lg:hidden">
        {/* Custom Mobile Header */}
        <div className="fixed top-0 left-0 w-full z-60 p-4 flex items-center justify-between backdrop-blur-sm">
          {/* Hamburger Menu - Left Side */}
          <button
            onClick={handleHamburgerClick}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-70 relative"
            aria-label="Open menu"
          >
            <span className="w-6 h-0.5 bg-white transition-all duration-300" />
            <span className="w-6 h-0.5 bg-white transition-all duration-300" />
            <span className="w-6 h-0.5 bg-white transition-all duration-300" />
          </button>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2 z-70">
            <a
              href="https://www.app.thehireai.in/login"
              className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-600 text-white font-medium text-xs whitespace-nowrap hover:bg-gray-700/80 transition-colors"
            >
              Login
            </a>
            <button
              onClick={onOpenModal}
              className="px-4 py-2 rounded-full bg-linear-to-r from-purple-500 to-blue-600 text-white font-medium text-xs whitespace-nowrap"
            >
              Book Demo
            </button>
          </div>
        </div>

        {/* StaggeredMenu - Hidden header, visible panel */}
        <div ref={menuRef} className="staggered-menu-mobile-wrapper">
          <style>{`
            .staggered-menu-mobile-wrapper .staggered-menu-header {
              display: none !important;
            }
            .staggered-menu-mobile-wrapper .staggered-menu-wrapper {
              pointer-events: none;
            }
            .staggered-menu-mobile-wrapper .staggered-menu-panel,
            .staggered-menu-mobile-wrapper .sm-prelayers {
              pointer-events: auto;
            }
            .staggered-menu-mobile-wrapper .staggered-menu-panel {
              background: linear-gradient(135deg, #f3e7ff 0%, #e9d5ff 100%) !important;
            }
            .staggered-menu-mobile-wrapper .sm-panel-list {
              gap: 2rem !important;
            }
            .staggered-menu-mobile-wrapper .sm-panel-item {
              font-size: 2.5rem !important;
              letter-spacing: -1px !important;
            }
            .staggered-menu-mobile-wrapper .sm-prelayers .sm-prelayer:first-child {
              background: #c084fc !important;
            }
            .staggered-menu-mobile-wrapper .sm-prelayers .sm-prelayer:last-child {
              background: #a855f7 !important;
            }
            @media (max-width: 480px) {
              .staggered-menu-mobile-wrapper .sm-panel-item {
                font-size: 2rem !important;
              }
            }
          `}</style>
          <StaggeredMenu
            position="left"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={false}
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={['#c084fc', '#a855f7']}
            logoUrl=""
            accentColor="#7c3aed"
            isFixed={true}
            closeOnClickAway={true}
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>
      </div>
    </>
  );
} 