"use client";

import { useState } from "react";

interface HeroSectionProps {
  onGenerate: (username: string) => void;
  error: string;
}

export function HeroSection({ onGenerate, error }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onGenerate(inputValue);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Glow Effect */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,169,110,0.25) 0%, transparent 70%)",
        }}
      />
      
      <div className="relative z-10 max-w-2xl text-center">
        <div className="inline-block mb-6 px-4 py-1.5 text-xs font-mono tracking-widest text-gold/90 border border-gold/30 rounded-full bg-gold/5">
          <span className="opacity-70 mr-1">&#10022;</span> REAL X DATA
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Your month,
          <br />
          <span className="text-muted">in</span>{" "}
          <span className="text-gold">numbers.</span>
        </h1>
        
        <p className="text-lg text-muted mb-10 max-w-md mx-auto leading-relaxed">
          Real stats from your X activity. Top tweets, engagement patterns, and AI insights.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="@byJobuu"
            className="flex-1 px-5 py-4 bg-background-2 border border-border-2 rounded-xl text-foreground placeholder:text-muted-foreground font-mono text-sm focus:outline-none focus:border-gold/50 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-gold text-background font-semibold rounded-xl hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            Generate Recap
          </button>
        </form>
        
        {error && (
          <p className="mt-4 text-sm text-red">{error}</p>
        )}
      </div>
    </section>
  );
}
