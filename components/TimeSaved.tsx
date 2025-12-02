import { Phone, Mail, MessageCircle, TrendingUp } from "lucide-react"
import ShinyText from "./ShinyText"

export default function TimeSavedStats() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative max-w-7xl mx-auto pt-10 pb-24 px-4">
        {/* Header */}
        <div className="flex justify-center items-center mb-12">
          <ShinyText
            text="Time Saved Per Job"
            disabled={false}
            speed={5}
            className="font-sans font-medium text-4xl md:text-6xl text-center"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: 500 Calls Saved Per Candidate */}
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-[#8A00C4] shadow-xl flex flex-col justify-between"> {/* Added flex-col justify-between */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white font-semibold">500 Calls</span>
              <span className="text-slate-400">Saved</span>
            </div>

            {/* Gauge */}
            <div className="flex justify-center my-auto"> {/* Changed mb-6 to my-auto for vertical centering */}
              <svg width="200" height="120" viewBox="0 0 200 120">
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
                      height="35"
                      rx="5"
                      fill={color}
                      transform={`rotate(${angle} 100 100)`}
                    />
                  )
                })}
              </svg>
            </div>

            <div className="text-center mt-auto"> {/* Changed mb-4 to mt-auto for bottom alignment */}
              <div className="text-3xl font-bold text-white mb-1">Per Candidate</div> {/* Reduced text size and mb */}
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Phone className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wide">Manual Calls Saved</span> {/* Reduced text size */}
            </div>
          </div>

          {/* Card 2: 1000+ Manual Screening from Portals Saved */}
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-[#8A00C4] shadow-xl flex flex-col justify-between"> {/* Added flex-col justify-between */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white font-semibold">1000+</span>
              <span className="text-slate-400">Saved</span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-center gap-3 h-40 my-auto pb-4"> {/* Added my-auto for vertical centering, added pb-4 for spacing */}
              {[60, 75, 45, 55, 65, 50, 70, 90].map((height, i) => (
                <div
                  key={i}
                  className={`w-8 rounded-t-lg ${i === 7 ? "bg-purple-500" : "bg-slate-700"}`}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="text-center mt-auto"> {/* Changed mb-4 to mt-auto */}
              <div className="text-3xl font-bold text-white mb-1">Hours</div> {/* Reduced text size and mb */}
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Mail className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wide">Screening from Portals</span> {/* Reduced text size */}
            </div>
          </div>

          {/* Card 3: Time saved for managing data (Storage/Tracking) */}
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-[#8A00C4] shadow-xl flex flex-col justify-between"> {/* Added flex-col justify-between */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white font-semibold">Data</span>
              <span className="text-slate-400">Managed</span>
            </div>

            {/* Area Chart */}
            <div className="relative h-40 my-auto pb-4"> {/* Added my-auto for vertical centering, added pb-4 for spacing */}
              <svg width="100%" height="100%" viewBox="0 0 300 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,120 L30,100 L60,85 L90,90 L120,70 L150,75 L180,50 L210,45 L240,48 L270,60 L300,55 L300,160 L0,160 Z"
                  fill="url(#areaGradient)"
                />

                <path
                  d="M0,120 L30,100 L60,85 L90,90 L120,70 L150,75 L180,50 L210,45 L240,48 L270,60 L300,55"
                  fill="none"
                  stroke="#FB923C"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M0,120 L30,115 L60,105 L90,110 L120,95 L150,100 L180,85 L210,80 L240,85 L270,90 L300,88"
                  fill="none"
                  stroke="#EC4899"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="text-center mt-auto"> {/* Changed mb-4 to mt-auto */}
              <div className="text-3xl font-bold text-white mb-1">Automated</div> {/* Reduced text size and mb */}
            </div>

            <div className="flex items-center justify-center gap-2 text-slate-400">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wide">Storage and Tracking</span> {/* Reduced text size */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}