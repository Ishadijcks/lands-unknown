<script lang="ts">
  import type { ClientInventory } from "$lib/luclient/core/inventory/ClientInventory";
  import ItemDisplay from "$lib/components/ItemDisplay.svelte";
  import type { ItemHrid } from "common/content/ItemHrid";

  export let inventory: ClientInventory;

  const itemDetail = (hrid: ItemHrid) => {
    return inventory.itemDetailMap[hrid];
  };
</script>

<div class="flex flex-col items-center w-52 h-64">
  <div class="logo-cloud grid-cols-4 gap-1">
    {#each inventory.characterItems as characterItem}
      <ItemDisplay item={itemDetail(characterItem.itemHrid)} amount={characterItem.amount} />
    {/each}
  </div>
</div>
