import { NpcHrid } from "common/game/npcs/NpcHrid";
import { NpcDetail } from "common/game/npcs/NpcDetail";

export const npcDetailMap: Record<NpcHrid, NpcDetail> = {
  [NpcHrid.Npc1]: {
    hrid: NpcHrid.Npc1,
    name: "Npc 1",
    image: "base-npc",
  },
  [NpcHrid.Npc2]: {
    hrid: NpcHrid.Npc2,
    name: "Npc 2",
    image: "base-npc",
  },
  [NpcHrid.Npc3]: {
    hrid: NpcHrid.Npc3,
    name: "Npc 3",
    image: "base-npc",
  },
};
