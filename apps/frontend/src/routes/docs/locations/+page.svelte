<script lang="ts">
  import { gameData } from "common/content/GameData";
  import EntitySidebar from "$lib/components/EntitySidebar.svelte";
  import LocationPage from "./LocationPage.svelte";
  import type { LocationDetail } from "common/game/worldmap/LocationDetail";

  const locations: LocationDetail[] = Object.values(gameData.locationDetailMap);

  let selectedLocation: LocationDetail | null = null;

  const selectItem = (action: LocationDetail) => {
    selectedLocation = action;
  };
</script>

<EntitySidebar
  entities={locations}
  selectedEntity={selectedLocation}
  on:select={(event) => selectItem(event.detail.entity)}
/>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Action Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each locations as action}
      <a href="/docs{action.hrid}">
        <span>{JSON.stringify(action)}</span>
      </a>
    {/each}
  </div>
  <br />
  {#if selectedLocation}
    <LocationPage location={selectedLocation} />
  {/if}
</div>
