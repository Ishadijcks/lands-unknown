<script lang="ts">
  import { gameData } from "common/content/GameData";
  import ItemDisplay from "$lib/components/ItemDisplay.svelte";
  import type { ItemDetail } from "common/game/items/ItemDetail";

  const items: ItemDetail[] = Object.values(gameData.itemDetailMap);
</script>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Item Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each items as item}
      <a href="/docs{item.hrid}">
        <ItemDisplay {item} />
      </a>
    {/each}
  </div>
</div>
