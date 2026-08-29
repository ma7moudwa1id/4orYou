import { Link, useNavigate } from "react-router";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 py-10 overflow-hidden">
     
      <div className="relative max-w-lg w-full text-center space-y-8">
        {/* Logo badge */}
        <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
          <span className="text-xs font-bold tracking-[0.2em] text-cyan-300">
            4ORYOU
          </span>
        </div>

        {/* 404 Number with gradient */}
        <div className="relative">
          <h1 className="text-[12rem] md:text-[16rem] font-black leading-none select-none bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            404
          </h1>
          </div>

        {/* Main content */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-100">
            Lost in the Void?
          </h2>
          <p className="text-zinc-400 text-lg max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track!
          </p>
        </div>

        {/* Illustration - Abstract void/space theme */}
        

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-6 py-3.5 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 font-semibold hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>

          <Link
            to="/"
            className="btn-primary flex items-center gap-3 px-8"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}