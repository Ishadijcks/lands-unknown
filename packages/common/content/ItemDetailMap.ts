import { ItemHrid } from "common/game/items/ItemHrid";
import { ItemDetail } from "common/game/items/ItemDetail";

export const itemDetailMap: Record<ItemHrid, ItemDetail> = {
  [ItemHrid.Fish]: {
    name: "Fish",
    icon: "fish",
    hrid: ItemHrid.Fish,
    description: "Splish splash",
  },
  [ItemHrid.Log]: {
    name: "Log",
    icon: "log-regular",
    hrid: ItemHrid.Log,
    description: "Fresh from the tree",
  },
  [ItemHrid.Leaf]: {
    name: "Leaf",
    icon: "leaf-regular",
    hrid: ItemHrid.Leaf,
    description: "Fresh from the tree",
  },
  [ItemHrid.Pearl]: {
    name: "Pearl",
    icon: "gem-pearl",
    hrid: ItemHrid.Pearl,
    description: "Shiny",
  },
};
