// the data stored in this foders are only for default. most and imporant data here can be changed from the admin panel.

import { socialLinks, type SocialLink } from "./contact";
import { projects, type Project } from "./projects";
import { hero, type HeroData } from "./hero";
import { aboutData, type AboutData, type ProcessStep, type WorkExperience } from "./about";
// export all files in this folder (data). in order to import them as {socialLinks, projects, ...}
export {aboutData, hero, socialLinks, projects};
export type { SocialLink, Project, HeroData, AboutData, ProcessStep, WorkExperience };