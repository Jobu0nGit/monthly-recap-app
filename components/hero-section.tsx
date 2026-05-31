"use client";

import { useState, useEffect } from "react";

interface HeroSectionProps {
  onGenerate: (username: string) => void;
  error: string;
}

export function HeroSection({ onGenerate, error }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(inputValue);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden noise"
    >
      {/* Premium Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Primary Gold Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, rgba(212,184,150,0.06) 0%, transparent 50%)",
        }}
      />
      
      {/* Secondary Ambient Glow */}
      <div 
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(212,184,150,0.04) 0%, transparent 60%)",
        }}
      />
      
      <div className="relative z-10 max-w-3xl text-center">
        {/* Premium Badge */}
        <div 
          className="inline-flex items-center gap-2 mb-8 px-5 py-2 text-xs font-mono tracking-[0.2em] text-gold/90 border border-gold/20 rounded-full bg-gold/5 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          {"REAL X DATA"}
        </div>
        
        {/* Cinematic Headline */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 animate-fade-up text-balance"
          style={{ animationDelay: "100ms" }}
        >
          Your month,
          <br />
          <span className="text-muted">in</span>{" "}
          <span className="gradient-text">numbers.</span>
        </h1>
        
        {/* Supporting Copy */}
        <p 
          className="text-lg md:text-xl text-muted mb-12 max-w-lg mx-auto leading-relaxed animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Real stats from your X activity. Top tweets, engagement patterns, and AI-powered insights to grow your presence.
        </p>
        
        {/* Premium Input Group */}
        <form 
          onSubmit={handleSubmit} 
          className="animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <div 
            className={`relative flex flex-col sm:flex-row gap-3 max-w-lg mx-auto p-2 rounded-2xl border transition-all duration-500 ${
              isFocused 
                ? "border-gold/30 bg-background-2 shadow-[0_0_40px_-10px_rgba(212,184,150,0.15)]" 
                : "border-border bg-background-2/50"
            }`}
          >
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">
                @
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="username"
                className="w-full pl-9 pr-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground font-mono text-base focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="btn-premium px-8 py-4 bg-gold text-background font-semibold rounded-xl whitespace-nowrap"
            >
              Generate Recap
            </button>
          </div>
          
          {error && (
            <p className="mt-4 text-sm text-red animate-fade-in">{error}</p>
          )}
        </form>
        
        {/* Trust Signal */}
        <div 
          className="mt-12 flex items-center justify-center gap-6 text-xs text-muted-foreground animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            No login required
          </span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Private & secure
          </span>
          <span className="w-px h-3 bg-border hidden sm:block" />
          <span className="hidden sm:flex items-center gap-2">
            <svg className="w-4 h-4 text-gold/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Instant results
          </span>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
