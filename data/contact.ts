export type SocialLink = {
  platform: string;
  url: string;
  icon: string;
};

export const socialLinks: SocialLink[] = [
    { platform: "GitHub", url: "https://github.com/example", icon: "🐙" },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/example",
      icon: "💼",
    },
    { platform: "Twitter", url: "https://twitter.com/example", icon: "🐦" },
  ];