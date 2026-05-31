"use client";

import { useEffect, useState } from "react";
import type { RecapData } from "@/lib/types";

interface RecapSectionProps {
  handle: string;
  data: RecapData;
  onBack: () => void;
}

export function RecapSection({ handle, data, onBack }: RecapSectionProps) {
  const [animateBars, setAnimateBars] = useState(false);
  
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateBars(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-border">
          <div>
            <div className="text-xl font-mono text-gold mb-1">{handle}</div>
            <div className="text-2xl md:text-3xl font-bold">{monthName} Recap</div>
            <div className="text-sm text-muted mt-1">{monthName} {year}</div>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-muted border border-border rounded-lg hover:text-foreground hover:border-border-2 transition-colors"
          >
            &#8592; New search
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {data.stats.map((stat, i) => (
            <div 
              key={stat.label}
              className="p-5 bg-background-2 border border-border rounded-xl animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className={`text-sm font-mono ${
                stat.dir === "up" ? "text-green" : 
                stat.dir === "down" ? "text-red" : 
                "text-muted"
              }`}>
                {stat.dir === "up" && "↑ "}
                {stat.dir === "down" && "↓ "}
                {stat.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mb-12">
          <SectionLabel>The story</SectionLabel>
          <div 
            className="p-6 bg-background-2 border border-border rounded-xl text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </div>

        {/* Top Tweets */}
        <div className="mb-12">
          <SectionLabel>Top tweets this month</SectionLabel>
          <div className="space-y-4">
            {data.top_tweets.map((tweet, i) => (
              <div 
                key={i}
                className="p-5 bg-background-2 border border-border rounded-xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-1">
                  <p className="text-foreground leading-relaxed mb-3">{tweet.text}</p>
                  <div className="flex gap-4 text-sm font-mono text-muted">
                    <span className="text-red">&#9829; {tweet.likes.toLocaleString()}</span>
                    <span className="text-green">&#8635; {tweet.retweets.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {tweet.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement by Day */}
        <div className="mb-12">
          <SectionLabel>Engagement by day of week</SectionLabel>
          <div className="p-6 bg-background-2 border border-border rounded-xl space-y-3">
            {data.daily_engagement.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-10 text-sm font-mono text-muted">{day.day}</div>
                <div className="flex-1 h-3 bg-background-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold rounded-full transition-all duration-700 ease-out"
                    style={{ width: animateBars ? `${day.pct}%` : "0%" }}
                  />
                </div>
                <div className="w-12 text-right text-sm font-mono text-muted">
                  {day.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="mb-12">
          <SectionLabel>Content themes</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {data.themes.map((theme) => (
              <span 
                key={theme}
                className="px-4 py-2 bg-background-2 border border-border rounded-full text-sm font-mono text-gold"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mb-12">
          <SectionLabel>AI insights for next month</SectionLabel>
          <div className="space-y-3">
            {data.insights.map((insight, i) => (
              <div 
                key={i}
                className="p-5 bg-background-2 border border-border rounded-xl text-foreground leading-relaxed flex items-start gap-3"
              >
                <span className="text-gold">&#10022;</span>
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-mono text-muted uppercase tracking-widest mb-4">
      {children}
    </div>
  );
}
