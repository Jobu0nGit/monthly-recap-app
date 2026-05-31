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
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setAnimateBars(true), 300);
    
    // Stagger section reveals
    const sectionTimers = [0, 1, 2, 3, 4, 5].map((i) =>
      setTimeout(() => {
        setVisibleSections((prev) => [...prev, i]);
      }, 200 + i * 150)
    );
    
    return () => {
      clearTimeout(timer);
      sectionTimers.forEach(clearTimeout);
    };
  }, []);

  const sectionClass = (index: number) =>
    `transition-all duration-700 ${
      visibleSections.includes(index)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`;

  return (
    <section className="pt-28 pb-20 px-6 min-h-screen noise">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <header className={`mb-16 ${sectionClass(0)}`}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-mono tracking-wider text-gold/80 border border-gold/20 rounded-full bg-gold/5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                MONTHLY RECAP
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                {handle}
              </h1>
              <p className="text-xl text-muted">
                <span className="text-foreground">{monthName}</span> {year}
              </p>
            </div>
            
            {/* Quick Stats Summary */}
            <div className="flex items-center gap-6 text-sm font-mono text-muted">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground stat-number">
                  {data.stats.find(s => s.label === "impressions")?.value || "—"}
                </div>
                <div className="text-xs uppercase tracking-wider">Impressions</div>
              </div>
              <div className="w-px h-10 bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground stat-number">
                  {data.stats.find(s => s.label === "new followers")?.value || "—"}
                </div>
                <div className="text-xs uppercase tracking-wider">New Followers</div>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className={`mb-16 ${sectionClass(1)}`}>
          <SectionHeader title="Performance Overview" subtitle="Your numbers this month" />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {data.stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* The Story */}
        <div className={`mb-16 ${sectionClass(2)}`}>
          <SectionHeader title="The Story" subtitle="Your month in words" />
          <div className="relative p-8 lg:p-10 bg-background-2 border border-border rounded-2xl">
            <div className="absolute top-6 left-6 text-6xl font-serif text-gold/10 leading-none">
              &ldquo;
            </div>
            <div 
              className="relative text-lg lg:text-xl leading-relaxed text-foreground-2 pl-4 border-l-2 border-gold/30"
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          </div>
        </div>

        {/* Top Tweets */}
        <div className={`mb-16 ${sectionClass(3)}`}>
          <SectionHeader title="Top Tweets" subtitle="Your best performing content" />
          <div className="space-y-4">
            {data.top_tweets.map((tweet, i) => (
              <TweetCard key={i} tweet={tweet} rank={i + 1} />
            ))}
          </div>
        </div>

        {/* Engagement Chart */}
        <div className={`mb-16 ${sectionClass(4)}`}>
          <SectionHeader title="Engagement Rhythm" subtitle="When your audience is most active" />
          <div className="p-8 bg-background-2 border border-border rounded-2xl">
            <div className="space-y-4">
              {data.daily_engagement.map((day, i) => (
                <EngagementBar 
                  key={day.day} 
                  day={day} 
                  animate={animateBars}
                  delay={i * 100}
                  isTopDay={day.pct === Math.max(...data.daily_engagement.map(d => d.pct))}
                />
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-border text-xs text-muted font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-gold" />
                Best day
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-gold/40" />
                Engagement
              </div>
            </div>
          </div>
        </div>

        {/* Two Column: Themes + Insights */}
        <div className={`grid lg:grid-cols-2 gap-6 mb-16 ${sectionClass(5)}`}>
          {/* Content Themes */}
          <div>
            <SectionHeader title="Content Themes" subtitle="What you talked about" />
            <div className="p-6 bg-background-2 border border-border rounded-2xl h-[calc(100%-4rem)]">
              <div className="flex flex-wrap gap-2">
                {data.themes.map((theme, i) => (
                  <span 
                    key={theme}
                    className="px-4 py-2 bg-background-3 border border-border rounded-full text-sm font-mono text-gold hover:border-gold/30 hover:bg-gold/5 transition-colors cursor-default"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div>
            <SectionHeader title="AI Insights" subtitle="Recommendations for growth" />
            <div className="space-y-3">
              {data.insights.map((insight, i) => (
                <div 
                  key={i}
                  className="group p-5 bg-background-2 border border-border rounded-xl hover:border-gold/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gold/10 text-gold text-sm font-mono">
                      {i + 1}
                    </div>
                    <p className="text-foreground-2 leading-relaxed pt-1">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted mb-4">Want to track another account?</p>
          <button
            onClick={onBack}
            className="btn-premium px-8 py-4 bg-gold text-background font-semibold rounded-xl"
          >
            Generate New Recap
          </button>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted mt-1">{subtitle}</p>
    </div>
  );
}

function StatCard({ stat, delay }: { stat: RecapData["stats"][0]; delay: number }) {
  return (
    <div 
      className="group relative p-6 bg-background-2 border border-border rounded-2xl card-hover overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500" />
      
      <div className="relative">
        <div className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
          {stat.label}
        </div>
        <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2 stat-number">
          {stat.value}
        </div>
        <div className={`inline-flex items-center gap-1 text-sm font-mono ${
          stat.dir === "up" ? "text-green" : 
          stat.dir === "down" ? "text-red" : 
          "text-muted"
        }`}>
          {stat.dir === "up" && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          )}
          {stat.dir === "down" && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          )}
          {stat.delta}
        </div>
      </div>
    </div>
  );
}

function TweetCard({ tweet, rank }: { tweet: RecapData["top_tweets"][0]; rank: number }) {
  return (
    <div className="group relative p-6 bg-background-2 border border-border rounded-2xl card-hover">
      <div className="flex items-start gap-4">
        {/* Rank Badge */}
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gold/10 text-gold font-bold text-lg border border-gold/20">
          {rank}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-foreground leading-relaxed mb-4">{tweet.text}</p>
          
          <div className="flex items-center gap-6">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm font-mono">
              <span className="flex items-center gap-1.5 text-red/80">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {tweet.likes.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5 text-green/80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {tweet.retweets.toLocaleString()}
              </span>
            </div>
            
            {/* Date */}
            <span className="text-xs font-mono text-muted-foreground ml-auto">
              {tweet.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EngagementBar({ 
  day, 
  animate, 
  delay,
  isTopDay 
}: { 
  day: RecapData["daily_engagement"][0]; 
  animate: boolean;
  delay: number;
  isTopDay: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-12 text-sm font-mono ${isTopDay ? "text-gold font-semibold" : "text-muted"}`}>
        {day.day}
      </div>
      <div className="flex-1 h-4 bg-background-3 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isTopDay ? "bg-gold" : "bg-gold/40"
          }`}
          style={{ 
            width: animate ? `${day.pct}%` : "0%",
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
      <div className={`w-12 text-right text-sm font-mono ${isTopDay ? "text-gold font-semibold" : "text-muted"}`}>
        {day.pct}%
      </div>
    </div>
  );
}
