import { ActionHrid } from "common/game/actions/ActionHrid";
import type { ActionDetail } from "common/game/actions/ActionDetail";
import { ItemHrid } from "common/game/items/ItemHrid";
import { SkillHrid } from "common/game/skills/SkillHrid";

export const actionDetailMap: Record<ActionHrid, ActionDetail> = {
  [ActionHrid.GatherWood]: {
    name: "Gather Wood",
    hrid: ActionHrid.GatherWood,
    outputItems: [{ hrid: ItemHrid.Log, amount: 1 }],
    baseDuration: 3,
    experienceRewards: [{ skillHrid: SkillHrid.Woodcutting, value: 5 }],
  },
  [ActionHrid.GatherLeaf]: {
    name: "Gather Leaf",
    hrid: ActionHrid.GatherLeaf,
    outputItems: [{ hrid: ItemHrid.Leaf, amount: 1 }],
    baseDuration: 2,
    experienceRewards: [{ skillHrid: SkillHrid.Woodcutting, value: 3 }],
  },
  [ActionHrid.CatchShrimp]: {
    name: "Catch Shrimp",
    hrid: ActionHrid.CatchShrimp,
    outputItems: [{ hrid: ItemHrid.Fish, amount: 1 }],
    baseDuration: 3,
    experienceRewards: [{ skillHrid: SkillHrid.Fishing, value: 3 }],
  },
  [ActionHrid.CatchPearl]: {
    name: "Catch Pearl",
    hrid: ActionHrid.CatchPearl,
    outputItems: [{ hrid: ItemHrid.Pearl, amount: 1 }],
    baseDuration: 10,
    experienceRewards: [{ skillHrid: SkillHrid.Fishing, value: 8 }],
  },
};
