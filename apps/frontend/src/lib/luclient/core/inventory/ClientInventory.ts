import type { CharacterItem } from "common/game/items/CharacterItem";
import { Inventory } from "common/game/inventory/Inventory";
import type { ItemHrid } from "common/game/items/ItemHrid";
import type { ItemDetail } from "common/game/items/ItemDetail";

export class ClientInventory extends Inventory {
  private _characterItems: CharacterItem[] = [];

  constructor(detailMap: Record<ItemHrid, ItemDetail>) {
    super(detailMap);
  }

  public updateCharacterItems(items: CharacterItem[]): void {
    this._characterItems = items;
  }

  public get characterItems() {
    return this._characterItems;
  }
}
