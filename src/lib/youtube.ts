/**
 * Build-time YouTube channel feed (brief §10). No API key: reads the public
 * RSS feed. Failure never breaks the build: it falls back to the last-known
 * data committed in src/data/latest-videos.json, or to an empty list, in
 * which case the homepage section hides itself.
 *
 * While YOUTUBE.channelId is empty (open question 5: the briefed handle
 * @mylifedoula7 no longer exists on YouTube), the network is never touched.
 */
import { YOUTUBE } from '../config/site';
import lastKnown from '../data/latest-videos.json';

export interface Video {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
}

function decodeEntities(text: string): string {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function parseFeed(xml: string, limit: number): Video[] {
  const videos: Video[] = [];
  for (const entry of xml.split('<entry>').slice(1)) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (!id || !title || !published) continue;
    videos.push({
      id,
      title: decodeEntities(title),
      published,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    });
    if (videos.length >= limit) break;
  }
  return videos;
}

export async function getLatestVideos(limit = 4): Promise<Video[]> {
  if (!YOUTUBE.channelId) return [];
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE.channelId}`,
      { signal: AbortSignal.timeout(10_000) },
    );
    if (!response.ok) throw new Error(`Feed responded ${response.status}`);
    const videos = parseFeed(await response.text(), limit);
    if (videos.length === 0) throw new Error('Feed parsed to zero videos');
    return videos;
  } catch (error) {
    console.warn(
      `[youtube] Feed unavailable (${error instanceof Error ? error.message : 'unknown'}); using last-known data.`,
    );
    return (lastKnown as Video[]).slice(0, limit);
  }
}
