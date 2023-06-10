import { ItemHrid } from "common/content/ItemHrid";
import { ItemDetail } from "common/game/items/ItemDetail";

export class Inventory {
  private readonly _itemDetailMap: Record<ItemHrid, ItemDetail>;

  constructor(itemDetailMap: Record<ItemHrid, ItemDetail>) {
    this._itemDetailMap = itemDetailMap;
  }

  get itemDetailMap(): Record<ItemHrid, ItemDetail> {
    return this._itemDetailMap;
  }
}
