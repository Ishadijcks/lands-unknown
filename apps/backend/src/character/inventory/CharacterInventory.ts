import { CharacterFeature } from "backend/character/CharacterFeature";
import type { ItemHrid } from "common/game/items/ItemHrid";
import { CharacterItem } from "common/game/items/CharacterItem";
import { ItemAmount } from "common/game/items/ItemAmount";
import { CharacterInventorySaveData } from "backend/character/inventory/CharacterInventorySaveData";

export class CharacterInventory extends CharacterFeature {
  private _inventory: { [Key in ItemHrid]?: CharacterItem } = {};

  constructor() {
    super("inventory");
  }

  public gainItemAmounts(itemAmounts: ItemAmount[]): void {
    itemAmounts.forEach((itemAmount) => {
      const item = this._inventory[itemAmount.hrid];
      if (item != undefined) {
        item.amount += itemAmount.amount;
      } else {
        this._inventory[itemAmount.hrid] = {
          itemHrid: itemAmount.hrid,
          amount: itemAmount.amount,
        };
      }

      const items = Object.values(this._inventory).filter((item) => item != undefined);
      this._character.sendInventoryUpdated(items);
    });
  }

  load(data: CharacterInventorySaveData): void {
    data?.items?.forEach((item) => {
      this._inventory[item.itemHrid] = item;
    });
  }

  save(): CharacterInventorySaveData {
    return {
      items: this.items,
    };
  }

  get items(): CharacterItem[] {
    return Object.values(this._inventory);
  }
}
