import {
  ACTIVITIES,
  FOUNDED_ON,
  FOUNDING_UNIVERSITIES,
  MEMBER_GROUPS,
  NUMBERS_THROUGH,
  PROJECTS,
  RWGS,
  memberCount,
  supporterCount,
  type ActivityKind,
  type Lang,
  type ProjectStatus,
} from "@/data/site";
import { SEEDED_PUBLICATIONS } from "@/data/publications";

/**
 * Public snapshot for "IA-CRC in Numbers".
 * Counts come from the lists in this repo. Website visits, social followers,
 * chat-group size, and grant amounts are not included.
 */
export type ForumNumbers = {
  years: number;
  foundedYear: number;
  throughYear: number;
  foundingUniversities: number;
  foundingNames: { en: string; id: string }[];
  rwgs: number;
  memberInstitutions: number;
  universities: number;
  auUniversities: number;
  idUniversities: number;
  industryPartners: number;
  researchers: number;
  supporters: number;
  activities: number;
  activitiesByKind: Record<ActivityKind, number>;
  projects: number;
  projectsByStatus: Record<ProjectStatus, number>;
  publications: number;
};

function yearOf(year: string | null | undefined): number | null {
  const match = (year ?? "").match(/(\d{4})/);
  return match ? Number(match[1]) : null;
}

export function formatFoundedDate(lang: Lang): string {
  const [year, month, day] = FOUNDED_ON.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function forumNumbers(): ForumNumbers {
  const foundedYear = Number(FOUNDED_ON.slice(0, 4));
  const throughYear = Number(NUMBERS_THROUGH.slice(0, 4));

  const founding = FOUNDING_UNIVERSITIES.filter((uni) =>
    MEMBER_GROUPS.some((group) => group.org === uni.org && group.country !== "industry"),
  );

  const activitiesByKind: Record<ActivityKind, number> = {
    seminar: 0,
    workshop: 0,
    talk: 0,
    conference: 0,
    meeting: 0,
  };
  for (const activity of ACTIVITIES) activitiesByKind[activity.kind] += 1;

  const projectsByStatus: Record<ProjectStatus, number> = {
    finished: 0,
    ongoing: 0,
    proposal: 0,
  };
  for (const project of PROJECTS) projectsByStatus[project.status] += 1;

  const publications = SEEDED_PUBLICATIONS.filter((paper) => {
    if ((paper.status ?? "approved") === "pending") return false;
    const year = yearOf(paper.year);
    return year !== null && year >= foundedYear && year <= throughYear;
  }).length;

  return {
    years: throughYear - foundedYear,
    foundedYear,
    throughYear,
    foundingUniversities: founding.length,
    foundingNames: founding.map((uni) => ({ en: uni.short.en, id: uni.short.id })),
    rwgs: RWGS.length,
    memberInstitutions: MEMBER_GROUPS.length,
    universities: MEMBER_GROUPS.filter((group) => group.country !== "industry").length,
    auUniversities: MEMBER_GROUPS.filter((group) => group.country === "au").length,
    idUniversities: MEMBER_GROUPS.filter((group) => group.country === "id").length,
    industryPartners: MEMBER_GROUPS.filter((group) => group.country === "industry").length,
    researchers: memberCount(),
    supporters: supporterCount(),
    activities: ACTIVITIES.length,
    activitiesByKind,
    projects: PROJECTS.length,
    projectsByStatus,
    publications,
  };
}
