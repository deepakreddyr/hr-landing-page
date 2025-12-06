// TubelightNavbar.tsx
"use client"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  label: string
  url: string
  icon?: LucideIcon
}

interface TubelightNavbarProps {
  items: NavItem[]
  className?: string
  onItemClick?: (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => void
  defaultActive?: string
  // Using explicit vibrant neon purple colors
  glowColor?: string // e.g., "rgb(192, 132, 252)" (purple-400)
  activeTextColor?: string // e.g., "rgb(255, 255, 255)"
  hoverTextColor?: string // e.g., "rgb(192, 132, 252)" (purple-400)
}

export function TubelightNavbar({ 
  items, 
  className,
  onItemClick,
  defaultActive,
  glowColor = "rgb(192, 132, 252)", // Neon purple-400
  activeTextColor = "rgb(255, 255, 255)", // White for contrast against dark background/glow
  hoverTextColor = "rgb(192, 132, 252)", // Neon purple-400
}: TubelightNavbarProps) {
  const [activeTab, setActiveTab] = useState(defaultActive || items[0]?.name || "")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => {
        const id = item.url.replace('#', '')
        return {
          name: item.name,
          element: document.getElementById(id)
        }
      }).filter(section => section.element !== null)

      // Get current scroll position, adjusted by an offset (100px fixed navbar height)
      const scrollPosition = window.scrollY + 100 

      let newActiveTab = activeTab;

      // Iterate from the bottom section upwards (highest offset to lowest)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionHeight = section.element.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // Check if the scroll position has passed the top of the section
          if (sectionTop <= scrollPosition) {
            newActiveTab = section.name
            break // Found the highest section in view, stop searching
          }
          
          // **Additional check for the last section (Contact/Footer)**
          // If we are scrolling near the very bottom of the page, 
          // ensure the last section remains active.
          if (i === sections.length - 1) {
            const pageScrollMax = document.documentElement.scrollHeight - window.innerHeight;
            
            // If scroll is near max, activate the last section
            if (window.scrollY >= pageScrollMax - 10) { 
              newActiveTab = section.name;
              break;
            }
          }
        }
      }

      if (newActiveTab !== activeTab) {
          setActiveTab(newActiveTab);
      }
    }

    // Set initial active tab correctly on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items, activeTab]) // Added activeTab to dependency array to refine setting logic

  const handleClick = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveTab(item.name)
    if (onItemClick) {
      onItemClick(item, e)
    }
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6",
        className,
      )}
    >
      <div 
        // MODIFIED: Simplified wrapper styles to remove heavy background/border
        className="flex items-center gap-2 backdrop-blur-lg py-1 px-1 rounded-full shadow-none"
        style={{
          backgroundColor: 'transparent',
          borderWidth: '0px',
        }}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(item, e)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-all duration-200", // Smaller padding
                "whitespace-nowrap select-none",
                isActive ? 'shadow-lg' : '' // Keep shadow on active tab
              )}
              style={{
                color: isActive ? activeTextColor : 'rgba(255, 255, 255, 0.7)', // Slightly transparent white for inactive
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = hoverTextColor
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                }
              }}
            >
              {/* Desktop: Show label */}
              <span className="hidden md:inline">{item.label}</span>
              
              {/* Mobile: Show icon if available */}
              {Icon && (
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
              )}
              
              {/* Mobile fallback: Show label if no icon */}
              {!Icon && (
                <span className="md:hidden text-xs">{item.label}</span>
              )}

              {/* Tubelight Animation */}
              {isActive && (
                <motion.div
                  layoutId="tubelight-glow"
                  className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                  style={{
                    backgroundColor: `${glowColor.replace('rgb', 'rgba').replace(')', ', 0.2)')}`, // Base background for the glow area
                    boxShadow: `0 0 15px 5px ${glowColor.replace('rgb', 'rgba').replace(')', ', 0.6)')}` // Primary glow
                  }}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Top Tube Light Element (The actual neon line) */}
                  <div 
                    className="absolute -top-1 left-0 right-0 h-1"
                    style={{
                      backgroundColor: glowColor,
                      boxShadow: `0 0 10px 1px ${glowColor}`,
                    }}
                  >
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default TubelightNavbar