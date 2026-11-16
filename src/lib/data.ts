import { prisma } from "@/lib/prisma";

export type ProfileData = {
  name: string;
  heroLabel: string;
  availabilityLabel: string;
  rotatingRoles: string[];
  resumeUrl: string;
  bio: string;
  responseTime: string;
  experienceStartYear: number;
  contactEmail: string;
  linkedinUrl: string;
  githubUrl: string;
};

const DEFAULT_PROFILE: ProfileData = {
  name: "Dhananjoy Chandra Das",
  heroLabel: "Web Developer | Educator | Research Enthusiast",
  availabilityLabel: "Open to internships, jobs, and freelance work",
  rotatingRoles: [
    "Full Stack web Developer",
    "Next.js Developer",
    "React Developer",
  ],
  resumeUrl: "https://drive.google.com/uc?export=download&id=14wDMPhN_NincwEaMl_3B3ikaeJ2Z9Ir1",
  bio: "I am a B.Sc. (Hons.) student in Mathematics at the University of Rajshahi and a passionate Full-Stack Web Developer. I specialize in building modern, scalable web applications using technologies like Next.js, React, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, and Tailwind CSS. In addition, I am actively engaged in research in biomathematics, applying mathematical modeling to real-world biological and health challenges.",
  responseTime: "24/7",
  experienceStartYear: 2023,
  contactEmail: "dhananjoychandradas@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/dhananjoycd",
  githubUrl: "https://github.com/dhananjoycd",
};

export async function getProfileData(): Promise<ProfileData> {
  try {
    const settings = await prisma.siteSetting.findMany();
    if (!settings || settings.length === 0) return DEFAULT_PROFILE;

    const map = new Map<string, string>();
    for (const item of settings) {
      map.set(item.key, item.value);
    }

    let roles = DEFAULT_PROFILE.rotatingRoles;
    const rolesJson = map.get("rotatingRoles");
    if (rolesJson) {
      try {
        const parsed = JSON.parse(rolesJson);
        if (Array.isArray(parsed) && parsed.length > 0) roles = parsed;
      } catch {
        // fallback
      }
    }

    return {
      name: map.get("name") || DEFAULT_PROFILE.name,
      heroLabel: map.get("heroLabel") || DEFAULT_PROFILE.heroLabel,
      availabilityLabel: map.get("availabilityLabel") || DEFAULT_PROFILE.availabilityLabel,
      rotatingRoles: roles,
      resumeUrl: map.get("resumeUrl") || DEFAULT_PROFILE.resumeUrl,
      bio: map.get("bio") || DEFAULT_PROFILE.bio,
      responseTime: map.get("responseTime") || DEFAULT_PROFILE.responseTime,
      experienceStartYear: Number(map.get("experienceStartYear")) || DEFAULT_PROFILE.experienceStartYear,
      contactEmail: map.get("contactEmail") || DEFAULT_PROFILE.contactEmail,
      linkedinUrl: map.get("linkedinUrl") || DEFAULT_PROFILE.linkedinUrl,
      githubUrl: map.get("githubUrl") || DEFAULT_PROFILE.githubUrl,
    };
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    return DEFAULT_PROFILE;
  }
}

export async function getSkillGroups() {
  try {
    const groups = await prisma.skillGroup.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return groups;
  } catch (error) {
    console.error("Error fetching skill groups:", error);
    return [];
  }
}

export async function getExperiences() {
  try {
    const list = await prisma.experience.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return list;
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getEducations() {
  try {
    const list = await prisma.education.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return list;
  } catch (error) {
    console.error("Error fetching educations:", error);
    return [];
  }
}

export async function getProjects() {
  try {
    const list = await prisma.project.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return list;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getActiveServices() {
  try {
    const list = await prisma.service.findMany({
      where: { active: true },
      orderBy: { orderIndex: "asc" },
    });
    return list;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getPublishedBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });
    return post;
  } catch (error) {
    console.error(`Error fetching blog post by slug (${slug}):`, error);
    return null;
  }
}

