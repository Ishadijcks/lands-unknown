import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { gameData } from "common/content/GameData";
import type { SkillHrid } from "common/game/skills/SkillHrid";

export const load = (({ params }) => {
  const hrid = ("/skills/" + params.skill) as SkillHrid;
  const content = gameData.skillDetailMap[hrid];
  if (!content) {
    throw error(404, "Skill not found");
  }
  return {
    detail: content,
  };
}) satisfies PageLoad;
