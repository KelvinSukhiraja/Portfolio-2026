import { defineQuery } from "groq";

export const PORTFOLIO_QUERY = defineQuery(`{
  "projects": *[_type == "project" && featured != false] | order(year desc, order asc) {
    _id,
    name,
    year,
    "type": coalesce(category, type),
    "desc": description,
    details,
    tags,
    href,
    image {
      asset->{ _id, url },
      alt
    },
    gallery[] {
      asset->{ _id, url },
      alt
    }
  },
  "experience": *[_type == "experience"] | order(order asc) {
    _id,
    period,
    role,
    company,
    "desc": description,
    highlights,
    tags
  },
  "education": *[_type == "education"] | order(order asc) {
    _id,
    period,
    degree,
    school
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    heroEyebrow,
    heroTitle,
    heroBody,
    heroStats,
    email,
    copyright
  }
}`);
