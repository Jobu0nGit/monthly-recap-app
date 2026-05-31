"use client";

import { useState, useEffect } from "react";

interface LoadingOverlayProps {
  isVisible: boolean;
}

const loadingMessages = [
  "Analyzing your timeline",
  "Discovering your voice",
  "Ranking your best moments",
  "Building your narrative",
  "Crafting your story",
];

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
      {/* Deep Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-glow-pulse pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,184,150,0.08) 0%, transparent 60%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Premium Spinner */}
        <div className="relative h-20 w-20 mb-10">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-border-2" />
          {/* Spinning arc */}
          <svg className="absolute inset-0 animate-ring-spin" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="60 180"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold animate-pulse-soft" />
        </div>
        
        {/* Brand Mark */}
        <div className="text-sm font-mono tracking-[0.3em] text-gold/80 mb-8">
          XRECAP
        </div>
        
        {/* Animated Message */}
        <div className="h-8 overflow-hidden">
          <div 
            key={messageIndex}
            className="font-mono text-sm text-muted animate-text-reveal"
          >
            {loadingMessages[messageIndex]}...
          </div>
        </div>
        
        {/* Progress dots */}
        <div className="flex gap-2 mt-8">
          {loadingMessages.map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i === messageIndex 
                  ? "bg-gold w-6" 
                  : i < messageIndex 
                    ? "bg-gold/40" 
                    : "bg-border-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
