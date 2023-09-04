<script lang="ts">
  import type { LocationHrid } from "common/game/worldmap/LocationHrid";
  import { luClientStore } from "$lib/luclient/luClientStore";
  import type { LocationDetail } from "common/game/worldmap/LocationDetail";
  import { gameData } from "common/content/GameData";
  import type { ActivityHrid } from "common/game/activities/ActivityHrid";

  export let location: LocationDetail;

  const scheduleActivity = (location: LocationHrid, index: number) => {
    $luClientStore.socket.sendScheduleActivityRequest(location, index, 10);
  };

  const scheduleTravel = (location: LocationHrid) => {
    $luClientStore.socket.sendScheduleTravelRequest(location);
  };

  $: activityDetails =
    location.activities?.map((hrid: ActivityHrid) => {
      return gameData.activityDetailMap[hrid];
    }) ?? [];
</script>

<div class="flex flex-col card p-4 variant-filled-primary items-center">
  <span>{location.name}</span>
  <div class="flex flex-row">
    {#each activityDetails as activity, i}
      <button
        class="btn variant-filled"
        on:click={() => {
          scheduleActivity(location.hrid, i);
        }}
      >
        {activity.name}
      </button>
    {/each}
  </div>
  {#if location.facilities?.length > 0}
    <span>Facilities: {location.facilities?.join(", ")}</span>
  {/if}
  {#if location.npcs?.length > 0}
    <span>Npcs: {location.npcs?.join(", ")}</span>
  {/if}
  <button
    class="btn variant-filled"
    on:click={() => {
      scheduleTravel(location.hrid);
    }}
  >
    Travel
  </button>
</div>
