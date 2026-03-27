export type ProcessStep = {
  fcol: string;
  scol: string;
};

export type WorkExperience = {
  fcol: string;
  scol: {
    type: string;
    dateInterval: string;
  };
};

export type AboutData = {
  mainTitle: string;
  description: string;
  stats: {
    years: number;
    projects: number;
    satisfied: number;
    industries: number;
  };
  process: ProcessStep[];
  work_experience: WorkExperience[];
};

export const aboutData: AboutData = {
  mainTitle: "About me",
  description: "I'm Dawit Tesfaye From love of visuals to career in digital design. I've grown through hands on projects crafting brands and interfaces.",
  stats: {
    years: 3,
    projects: 14,
    satisfied: 96,
    industries: 4,
  },
  process: [
    {
      fcol: "Plan",
      scol: "lorem ipsum mnamn mnamn asd adf lkj lsde",
    },
    {
      fcol: "Analyze",
      scol: "lorem ipsum mnamn mnamn asd adf lkj lsde",
    },
    {
      fcol: "Wireframe",
      scol: "lorem ipsum mnamn mnamn asd adf lkj lsde",
    },
    {
      fcol: "Design",
      scol: "lorem ipsum mnamn mnamn asd adf lkj lsde",
    },
  ],
  work_experience: [
    {
      fcol: "UI/UX Designer",
      scol: {
        type: "Freelance",
        dateInterval: "2023 - Present",
      },
    },
    {
      fcol: "UI/UX Designer",
      scol: {
        type: "Intern",
        dateInterval: "2022 - 2023",
      },
    },
    {
      fcol: "UI/UX Designer",
      scol: {
        type: "Remote",
        dateInterval: "2021 - 2022",
      },
    },
    {
      fcol: "UI/UX Designer",
      scol: {
        type: "On-site",
        dateInterval: "2020 - 2021",
      },
    },
  ],
};
