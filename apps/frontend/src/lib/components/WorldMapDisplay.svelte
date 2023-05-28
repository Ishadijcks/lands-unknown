<script lang="ts">
  import type { WorldMap } from "common/game/worldmap/WorldMap";

  export let worldMap: WorldMap;
</script>

<div class="flex flex-row">
  <div class="flex flex-col space-y-2">
    {#each worldMap.locations as location}
      <div class="flex flex-col card p-4 variant-filled-primary items-center">
        <span>{location.name}</span>
        <span>Activities: {location.activities.join(", ")}</span>
        <span>Facilities: {location.facilities.join(", ")}</span>
        <span>Npcs: {location.npcs.join(", ")}</span>
      </div>
    {/each}
  </div>
</div>
