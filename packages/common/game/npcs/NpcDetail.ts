import { z } from "zod";
import { NpcHrid } from "common/game/npcs/NpcHrid";

const NpcDetailSchema = z.object({
  hrid: z.nativeEnum(NpcHrid),
  name: z.string(),
  image: z.string(),

  // dialog: z.any(),
});

export type NpcDetail = z.infer<typeof NpcDetailSchema>;
