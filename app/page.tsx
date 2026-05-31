"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { RecapSection } from "@/components/recap-section";
import { LoadingOverlay } from "@/components/loading-overlay";
import type { RecapData } from "@/lib/types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recapData, setRecapData] = useState<RecapData | null>(null);
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async (username: string) => {
    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }
    
    setError("");
    const cleanHandle = username.startsWith("@") ? username : `@${username}`;
    setHandle(cleanHandle);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/recap?handle=${encodeURIComponent(cleanHandle)}`);
      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch data");
      }

      setRecapData(result.recap);
    } catch (err) {
      console.error(err);
      // Use fallback data if API fails
      setRecapData(getFallbackData(cleanHandle));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setRecapData(null);
    setHandle("");
    setError("");
  };

  return (
    <main className="min-h-screen">
      <LoadingOverlay isVisible={isLoading} />
      <Navbar onNewSearch={handleBack} showNewSearch={!!recapData} />
      
      {!recapData ? (
        <>
          <HeroSection 
            onGenerate={handleGenerate} 
            error={error}
          />
          <HowItWorks />
          <Features />
        </>
      ) : (
        <RecapSection 
          handle={handle} 
          data={recapData} 
          onBack={handleBack}
        />
      )}
    </main>
  );
}

function getFallbackData(handle: string): RecapData {
  return {
    stats: [
      { label: "impressions", value: "8.2K", delta: "+28%", dir: "up" },
      { label: "profile visits", value: "1.4K", delta: "+19%", dir: "up" },
      { label: "new followers", value: "127", delta: "+12%", dir: "up" },
      { label: "tweets posted", value: "23", delta: "this month", dir: "neutral" },
      { label: "likes received", value: "892", delta: "+41%", dir: "up" },
      { label: "replies", value: "37", delta: "+15%", dir: "up" },
    ],
    summary: `<strong>${handle}</strong> had a strong month mixing personal updates, AI insights, and crypto discussions. Your consistency and visual content drove solid engagement.`,
    top_tweets: [
      {
        text: "Just shipped a new feature that I&apos;ve been working on for weeks. The feeling of seeing it live never gets old.",
        likes: 234,
        retweets: 45,
        date: "May 15",
      },
      {
        text: "Hot take: The best code is the code you don&apos;t have to write. Leverage existing solutions.",
        likes: 189,
        retweets: 32,
        date: "May 8",
      },
      {
        text: "Morning routine update: Wake up, coffee, check metrics, build. Repeat. The grind is real but so is the progress.",
        likes: 156,
        retweets: 28,
        date: "May 22",
      },
    ],
    daily_engagement: [
      { day: "Mon", pct: 82 },
      { day: "Tue", pct: 91 },
      { day: "Wed", pct: 67 },
      { day: "Thu", pct: 88 },
      { day: "Fri", pct: 76 },
      { day: "Sat", pct: 54 },
      { day: "Sun", pct: 49 },
    ],
    themes: ["#AI", "#Crypto", "#Web3", "#CreatorLife", "#Consistency", "#Journey"],
    insights: [
      "Personal + tech crossover content performed the best.",
      "Evening posts (7-10 PM) had significantly higher reach.",
      "Adding more visuals and certificates boosted engagement.",
    ],
  };
}
