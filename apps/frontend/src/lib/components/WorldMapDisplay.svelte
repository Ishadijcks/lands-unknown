<script lang="ts">
  import type { ClientWorldMap } from "$lib/luclient/core/worldmap/ClientWorldMap";
  import type { LocationHrid } from "common/game/worldmap/LocationHrid";
  import TiledCanvas from "$lib/components/TiledCanvas.svelte";
  import { gameData } from "common/content/GameData";
  import type { LocationDetail } from "common/game/worldmap/LocationDetail";
  import LocationDisplay from "$lib/components/LocationDisplay.svelte";

  export let worldMap: ClientWorldMap;

  let selectedLocation: LocationDetail | null = null;

  const showLocationDisplay = (location: LocationHrid) => {
    if (!location) {
      selectedLocation = null;
      return;
    }
    selectedLocation = gameData.locationDetailMap[location];
  };
</script>

<div class="flex flex-row">
  <span class="absolute">Current location: {worldMap.characterLocation}</span>

  <TiledCanvas
    mapId="tutorial"
    on:locationClicked={(e) => {
      showLocationDisplay(e.detail.location);
    }}
  />
  <div class="h-full z-10 flex flex-col justify-end w-96">
    {#if selectedLocation}
      <LocationDisplay location={selectedLocation} />
    {/if}
  </div>
</div>
