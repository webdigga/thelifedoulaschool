/**
 * Site-wide configuration constants. Anything that could ever change lives
 * here once: domain, names, contact details, the YouTube channel.
 */
export const SITE = {
  name: 'The Life Doula School',
  /** Pending client confirmation (open question 1 in CLAUDE.md). */
  alternateName: 'Ascending to Joy',
  url: 'https://thelifedoulaschool.co.uk',
  titleSuffix: ' | The Life Doula School',
  description:
    'The Life Doula Bridge: bridging heaven and earth. A middle path uniting the human and spiritual experience, open to all faiths and none.',
  author: 'Rebecca Sarah',
  /**
   * Not rendered anywhere. Client confirmed on 2026-07-16 that no contact
   * details or social media should be published for now (open question 4).
   */
  email: 'becca@thelifedoulaschool.co.uk',
  ogDefault: {
    src: '/og-default.png',
    width: 1200,
    height: 630,
    alt: 'Bridging Heaven and Earth: The Life Doula School',
  },
} as const;

/**
 * YouTube channel configuration (open question 5 in CLAUDE.md).
 * The brief named @mylifedoula7, but that handle returned 404 on YouTube as of
 * 2026-07-16, so no channel is configured. While channelId is empty, every
 * YouTube section and subscribe CTA hides itself and the build never touches
 * the network for it. When the real channel is confirmed, fill both fields.
 */
export const YOUTUBE = {
  channelId: '',
  channelUrl: '',
} as const;

/**
 * Confirmed public profiles for Person JSON-LD sameAs. Empty until contact
 * and channel details are confirmed (open questions 4 and 5).
 */
export const SAME_AS: readonly string[] = [];
