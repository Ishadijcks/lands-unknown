import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { gameData } from "common/content/GameData";
import type { ActivityHrid } from "common/game/activities/ActivityHrid";

export const load = (({ params }) => {
  const hrid = ("/activities/" + params.activity) as ActivityHrid;
  const content = gameData.activityDetailMap[hrid];
  if (!content) {
    throw error(404, "Not found");
  }
  return {
    detail: content,
  };
}) satisfies PageLoad;
