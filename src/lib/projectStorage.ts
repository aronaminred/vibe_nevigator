import type { Project } from "@/types/project";
import { emptyProject } from "@/lib/steps";

export const storageKey =
  process.env.NEXT_PUBLIC_STORAGE_KEY ?? "vibe-coding-navigator:v1";

export function loadProject(): Project {
  if (typeof window === "undefined") {
    return emptyProject;
  }

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return emptyProject;
    }

    return { ...emptyProject, ...JSON.parse(saved) };
  } catch {
    return emptyProject;
  }
}

export function saveProject(project: Project) {
  window.localStorage.setItem(storageKey, JSON.stringify(project));
}

export function clearProject() {
  window.localStorage.removeItem(storageKey);
}
