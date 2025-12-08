// Navbar.tsx
import React, { useRef, useEffect } from 'react';
import StaggeredMenu from './StaggeredMenu';
import { GradientButton } from './ui/gradient-button';
import { TubelightNavbar } from './ui/tubelight-navbar';
import { Users, Sparkles, DollarSign, Mail } from 'lucide-react';
import { ShimmerButton } from './ui/shimmer-button'; // Imported for Login button

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const menuRef = useRef<any>(null);
  
  // Define button classes here for readability, matching the gradient button size/font
  const DESKTOP_BUTTON_CLASSES = "px-6 py-2.5 text-sm font-medium rounded-full";
  const MOBILE_BUTTON_CLASSES = "px-4 py-2 text-xs font-medium";

  // Navigation items for TubelightNavbar (desktop)
  const navItems = [
    { 
      name: "use-cases", 
      label: "Use Cases", 
      url: "#who-uses", 
      icon: Users 
    },
    { 
      name: "features", 
      label: "Features", 
      url: "#why-choose", 
      icon: Sparkles 
    },
    { 
      name: "pricing", 
      label: "Pricing", 
      url: "#pricing", 
      icon: DollarSign 
    },
    { 
      name: "contact", 
      label: "Contact", 
      url: "#contact", 
      icon: Mail 
    },
  ];

  // Menu items for StaggeredMenu (mobile)
  const menuItems = [
    { label: 'Use Cases', ariaLabel: 'View use cases', link: '#who-uses' },
    { label: 'Features', ariaLabel: 'Explore features', link: '#why-choose' },
    { label: 'Pricing', ariaLabel: 'View pricing', link: '#pricing' },
    { label: 'Contact', ariaLabel: 'Contact us', link: '#contact' },
    // ADDED: Book Demo option to the mobile menu
    { label: 'Book Demo', ariaLabel: 'Book a demonstration', onClick: onOpenModal },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ];

  // Smooth scroll function
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle navbar item click
  const handleNavItemClick = (item: any, e: React.MouseEvent<HTMLAnchorElement>) => {
    scrollToSection(e, item.url);
  };

  // Handle hamburger menu click
  const handleHamburgerClick = () => {
    const toggleBtn = document.querySelector('.sm-toggle') as HTMLButtonElement;
    if (toggleBtn) {
      toggleBtn.click();
    }
  };

  // Add click handlers to mobile menu items
  useEffect(() => {
    const handleMenuClick = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check for both the regular link and the custom 'Book Demo' element
      const menuItem = target.closest('.sm-panel-item') as HTMLAnchorElement | HTMLButtonElement;
      
      if (menuItem) {
        // If it's a link (navigation)
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
        } else if (menuItem.getAttribute('data-action') === 'book-demo') {
            // If it's the custom button action
            const toggleBtn = document.querySelector('.sm-toggle') as HTMLButtonElement;
            if (toggleBtn) {
                toggleBtn.click();
            }
            onOpenModal();
        }
      }
    };

    const menuPanel = document.querySelector('.staggered-menu-panel');
    if (menuPanel) {
      menuPanel.addEventListener('click', handleMenuClick);
    }

    return () => {
      if (menuPanel) {
        menuPanel.removeEventListener('click', handleMenuClick);
      }
    };
  }, [onOpenModal]); // Dependency on onOpenModal for the custom click handler

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <nav className="fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-sm">
          <div className="grid grid-cols-3 items-center max-w-7xl mx-auto">
            
            {/* Column 1: Logo */}
            <div className="flex justify-start">
              <a 
                href="#hero"
                onClick={(e) => scrollToSection(e, "#hero")}
                className="text-white text-xl font-bold hover:text-purple-400 transition-colors duration-200"
              >
                TheHireAI
              </a>
            </div>

            {/* Column 2: Tubelight Navigation (Centered) */}
            <div className="flex col-span-1 justify-center relative">
              <TubelightNavbar 
                items={navItems} 
                onItemClick={handleNavItemClick}
                className="relative top-0 pt-0 mr-5"
                defaultActive="use-cases"
                glowColor="rgb(192, 132, 252)" 
                activeTextColor="rgb(255, 255, 255)" 
                hoverTextColor="rgb(192, 132, 252)" 
              />
            </div>

            {/* Column 3: Login Button (Primary CTA) */}
            <div className="flex items-center space-x-4 justify-end">
              <a href="https://app.thehireai.in/dashboard">
              <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Login
                  </span>
              </ShimmerButton>
              </a>
            </div>
          </div> 
        </nav>
      </div>

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

          {/* Logo - Center (Mobile) */}
          <a 
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="text-white text-lg font-bold hover:text-purple-400 transition-colors absolute left-1/2 -translate-x-1/2"
          >
            TheHireAI
          </a>

          {/* Right Side - Login & Book Demo Buttons */}
          <div className="flex items-center gap-2 z-70">

            {/* Login Button (Secondary CTA on mobile header) */}
            <a href="https://app.thehireai.in/dashboard">
              <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Login
                  </span>
              </ShimmerButton>
              </a>
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