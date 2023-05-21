import { CharacterFeature } from "backend/character/CharacterFeature";
import { ItemHrid } from "common/game/items/ItemHrid";
import { CharacterItem } from "common/game/items/CharacterItem";
import { ItemAmount } from "common/game/items/ItemAmount";

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

  // TODO(@Isha): Implement
  load(data: any): void {}

  save(): any {}
}
