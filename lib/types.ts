export interface Stat {
  label: string;
  value: string | number;
  delta: string;
  dir: "up" | "down" | "neutral";
}

export interface Tweet {
  text: string;
  likes: number;
  retweets: number;
  date: string;
}

export interface DailyEngagement {
  day: string;
  pct: number;
}

export interface RecapData {
  stats: Stat[];
  summary: string;
  top_tweets: Tweet[];
  daily_engagement: DailyEngagement[];
  themes: string[];
  insights: string[];
}
