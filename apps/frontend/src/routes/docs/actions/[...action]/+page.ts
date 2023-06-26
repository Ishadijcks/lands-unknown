import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { gameData } from "common/content/GameData";
import type { ActionHrid } from "common/game/actions/ActionHrid";

export const load = (({ params }) => {
  const hrid = ("/actions/" + params.action) as ActionHrid;
  const content = gameData.actionDetailMap[hrid];
  if (!content) {
    throw error(404, "Not found");
  }
  return {
    detail: content,
  };
}) satisfies PageLoad;
