import {
  EDUCATION,
  EXPERIENCE,
  HERO_STATS,
  PROJECTS,
  SITE,
} from "../../data/portfolioContent";
import type {
  EducationItem,
  ExperienceItem,
  HeroStat,
  Project,
  ProjectImage,
} from "../../types/portfolio";
import { sortProjectsByYear } from "../../utils/sortProjects";
import { isSanityConfigured, sanityClient } from "./client";
import { urlForGalleryImage, urlForThumbnail } from "./image";
import { PORTFOLIO_QUERY } from "./queries";

type SanityProjectImage = {
  asset?: { _id: string; url?: string };
  alt?: string;
};

type SanityProject = {
  _id: string;
  name: string;
  year: string;
  type: string;
  desc: string;
  details?: string;
  tags?: string[];
  href?: string;
  image?: SanityProjectImage | null;
  gallery?: SanityProjectImage[] | null;
};

type SanityExperience = {
  _id: string;
  period: string;
  role: string;
  company: string;
  desc: string;
  highlights?: string[];
  tags?: string[];
};

type SanityEducation = {
  _id: string;
  period: string;
  degree: string;
  school: string;
};

type SanitySiteSettings = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroBody?: string;
  heroStats?: HeroStat[];
  email?: string;
  copyright?: string;
};

export type PortfolioContent = {
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  siteSettings: {
    heroEyebrow: string;
    heroTitle: string;
    heroBody: string;
    heroStats: HeroStat[];
    email: string;
    copyright: string;
  };
  source: "sanity" | "static";
};

const DEFAULT_SITE = {
  heroEyebrow: "front-end developer · jakarta, id",
  heroTitle: "Building interfaces\nthat feel right.",
  heroBody:
    "I craft fast, accessible, and thoughtfully designed web experiences — turning complex problems into clean, intuitive products.",
  heroStats: HERO_STATS,
  email: SITE.email,
  copyright: SITE.copyright,
};

function mapSanityThumbnail(
  image: SanityProjectImage | null | undefined,
): ProjectImage | undefined {
  if (image?.asset?._id == null) return undefined;
  return {
    url: urlForThumbnail(image),
    alt: image.alt,
  };
}

function mapSanityGalleryImage(
  image: SanityProjectImage | null | undefined,
): ProjectImage | undefined {
  if (image?.asset?._id == null) return undefined;
  return {
    url: urlForGalleryImage(image),
    alt: image.alt,
  };
}

function mapProject(doc: SanityProject): Project {
  const thumbnail = mapSanityThumbnail(doc.image);
  const gallery =
    doc.gallery
      ?.map((image) => mapSanityGalleryImage(image))
      .filter((image): image is ProjectImage => image != null) ?? [];
  const fallbackGallery = mapSanityGalleryImage(doc.image);
  const images =
    gallery.length > 0
      ? gallery
      : fallbackGallery
        ? [fallbackGallery]
        : undefined;

  return {
    year: doc.year,
    type: doc.type,
    name: doc.name,
    desc: doc.desc,
    details: doc.details?.trim() || undefined,
    tags: doc.tags ?? [],
    href: doc.href || "#",
    imageUrl: thumbnail?.url,
    imageAlt: thumbnail?.alt ?? doc.name,
    images,
  };
}

function mapExperience(doc: SanityExperience): ExperienceItem {
  return {
    period: doc.period,
    role: doc.role,
    company: doc.company,
    desc: doc.desc,
    highlights: doc.highlights,
    tags: doc.tags,
  };
}

function mapEducation(doc: SanityEducation): EducationItem {
  return {
    period: doc.period,
    degree: doc.degree,
    school: doc.school,
  };
}

export async function fetchPortfolioContent(): Promise<PortfolioContent> {
  if (!isSanityConfigured || !sanityClient) {
    return {
      projects: sortProjectsByYear(PROJECTS),
      experience: EXPERIENCE,
      education: EDUCATION,
      siteSettings: DEFAULT_SITE,
      source: "static",
    };
  }

  try {
    const data = await sanityClient.fetch<{
      projects?: SanityProject[];
      experience?: SanityExperience[];
      education?: SanityEducation[];
      siteSettings?: SanitySiteSettings | null;
    }>(PORTFOLIO_QUERY);

    const hasProjects = (data.projects?.length ?? 0) > 0;
    const hasExperience = (data.experience?.length ?? 0) > 0;

    if (!hasProjects && !hasExperience) {
      return {
        projects: sortProjectsByYear(PROJECTS),
        experience: EXPERIENCE,
        education: EDUCATION,
        siteSettings: DEFAULT_SITE,
        source: "static",
      };
    }

    const settings = data.siteSettings;

    return {
      projects: sortProjectsByYear(
        hasProjects ? data.projects!.map(mapProject) : PROJECTS,
      ),
      experience: hasExperience
        ? data.experience!.map(mapExperience)
        : EXPERIENCE,
      education:
        (data.education?.length ?? 0) > 0
          ? data.education!.map(mapEducation)
          : EDUCATION,
      siteSettings: {
        heroEyebrow: settings?.heroEyebrow ?? DEFAULT_SITE.heroEyebrow,
        heroTitle: settings?.heroTitle ?? DEFAULT_SITE.heroTitle,
        heroBody: settings?.heroBody ?? DEFAULT_SITE.heroBody,
        heroStats: settings?.heroStats?.length
          ? settings.heroStats
          : DEFAULT_SITE.heroStats,
        email: settings?.email ?? DEFAULT_SITE.email,
        copyright: settings?.copyright ?? DEFAULT_SITE.copyright,
      },
      source: "sanity",
    };
  } catch (error) {
    console.warn("[portfolio] Sanity fetch failed, using static content.", error);
    return {
      projects: sortProjectsByYear(PROJECTS),
      experience: EXPERIENCE,
      education: EDUCATION,
      siteSettings: DEFAULT_SITE,
      source: "static",
    };
  }
}
