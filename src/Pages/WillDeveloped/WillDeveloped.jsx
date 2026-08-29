import { Link } from "react-router";
import { Code2, Hammer, Clock, Sparkles } from "lucide-react";

export default function WillDeveloped() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 py-10 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute rounded-full -z-10 left-1/2 -translate-x-1/2 blur-3xl -top-150 size-200 bg-radial-[at_50%_110%] to-zinc-950 via-blue-500 via-40% from-blue-300" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/60 rounded-full animate-float" />
      <div className="absolute top-1/3 right-1/5 w-3 h-3 bg-cyan-400/40 rounded-full animate-float-delayed" />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-300/50 rounded-full animate-float" />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-blue-500/30 rounded-full animate-float-delayed" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-cyan-300/50 rounded-full animate-float" />

      <div className="relative max-w-lg w-full text-center space-y-10">
        {/* Logo badge */}
        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
          <span className="text-xs font-bold tracking-[0.2em] text-cyan-300">
            4ORYOU
          </span>
        </div>

        {/* Animated construction icon */}
        <div className="relative mx-auto w-40 h-40">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30 animate-spin-slow" />

          {/* Inner glow */}
          <div className="absolute inset-4 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm" />

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Hammer
                size={56}
                className="text-blue-400 transform -rotate-12"
              />
              {/* Sparkle effects */}
              <Sparkles
                size={16}
                className="absolute -top-2 -right-2 text-cyan-300 animate-pulse"
              />
              <Sparkles
                size={12}
                className="absolute -bottom-1 -left-3 text-blue-300 animate-pulse"
              />
            </div>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50" />
          </div>
          <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 translate-y-1 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/50">
            <Code2 size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-zinc-300">Under Development</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-zinc-100">
            Will Developed{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Soon
            </span>
          </h1>

          <p className="text-zinc-400 text-lg max-w-md mx-auto leading-relaxed">
            We're working hard to bring you this feature. Our team is crafting
            something special that you'll love. Stay tuned!
          </p>
        </div>

        {/* Progress indicator */}
        <div className="space-y-3 max-w-sm mx-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400 font-medium">Development Progress</span>
            <span className="text-blue-400 font-bold">In Progress</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center text-zinc-500 text-sm">
            <Clock size={14} />
            <span>Estimated completion: Coming Soon</span>
          </div>
        </div>

        {/* Feature hints */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {['Bookmarks', 'User-Profile'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/30 text-zinc-400 text-sm font-medium hover:border-blue-500/30 hover:text-zinc-300 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
          <Link
            to="/"
            className="btn-primary flex items-center gap-3 px-8"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}