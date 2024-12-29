type Emotion = 'happy' | 'sad' | 'angry' | 'scared' | 'neutral';

export type TimeFilter = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';

export interface Analysis {
  submission_count: number;
  comments: string[];
  predictions: Array<Emotion>;
}

export async function fetchAnalysis(query: string, timeFilter: TimeFilter) {
  const posts = await fetch('/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, time_filter: timeFilter }),
  });
  const data: Analysis = await posts.json();
  await new Promise((r) => setTimeout(r, 3000));
  return data;
}
