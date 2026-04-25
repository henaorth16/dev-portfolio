
export type HeroData = {
  name: string;
  mainTitle: string;
  paragraph: string;
  card1: {
    title: string;
    paragraph: string;
  };
  card2: {
    title: string;
    paragraph: string;
  };
  resumeLink?: string;
};

export const hero: HeroData =  {
    name: "DAWIT",
    mainTitle: "Product And UI/UX [newline] Designer.",
    paragraph: "Dawit is a product and UI/UX designer focused on turning complex ideas into simple, user centered digital products.",
    card1: {
        title: "Selected work",
        paragraph: "View My Portfolio"
    },
    card2: {
        title: "Contact",
        paragraph: "Let's Start Your Project"
    },
    resumeLink: "https://googleDriveLink"
}