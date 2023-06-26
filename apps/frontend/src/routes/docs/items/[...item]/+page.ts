import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { gameData } from "common/content/GameData";
import type { ItemHrid } from "common/game/items/ItemHrid";

export const load = (({ params }) => {
  const hrid = ("/items/" + params.item) as ItemHrid;
  const content = gameData.itemDetailMap[hrid];
  if (!content) {
    throw error(404, "Not found");
  }
  return {
    detail: content,
  };
}) satisfies PageLoad;
