<script lang="ts">
  import { gameData } from "common/content/GameData";
  import ItemDisplay from "$lib/components/ItemDisplay.svelte";
  import type { ItemDetail } from "common/game/items/ItemDetail";
  import ItemPage from "./ItemPage.svelte";
  import EntitySidebar from "$lib/components/EntitySidebar.svelte";

  const items: ItemDetail[] = Object.values(gameData.itemDetailMap);

  let selectedItem = null;

  const selectItem = (item: ItemDetail) => {
    selectedItem = item;
  };
</script>

<EntitySidebar entities={items} selectedEntity={selectedItem} on:select={(event) => selectItem(event.detail.entity)} />

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Item Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each items as item}
      <button on:click={() => selectItem(item)}>
        <ItemDisplay {item} />
      </button>
    {/each}
  </div>
  <br />
  {#if selectedItem}
    <ItemPage item={selectedItem} />
  {/if}
</div>
