<script lang="ts">
  import type { ClientWorldMap } from "$lib/luclient/core/worldmap/ClientWorldMap";
  import { luClientStore } from "$lib/luclient/luClientStore";
  import type { LocationHrid } from "common/game/worldmap/LocationHrid";

  export let worldMap: ClientWorldMap;

  const scheduleActivity = (location: LocationHrid, index: number) => {
    $luClientStore.socket.sendScheduleActivityRequest(location, index, 10);
  };
</script>

<div class="flex flex-row space-x-2">
  <div class="flex flex-col">
    <span>Current location</span>
    <span>{worldMap.characterLocation}</span>
  </div>
  <div class="flex flex-col space-y-2">
    {#each worldMap.locations as location}
      <div class="flex flex-col card p-4 variant-filled-primary items-center">
        <span>{location.name}</span>
        <div class="flex flex-row">
          {#each location.activities as activity, i}
            <button
              class="btn variant-filled"
              on:click={() => {
                scheduleActivity(location.hrid, i);
              }}>{activity}</button
            >
          {/each}
        </div>
        <span>Facilities: {location.facilities.join(", ")}</span>
        <span>Npcs: {location.npcs.join(", ")}</span>
      </div>
    {/each}
  </div>
</div>
