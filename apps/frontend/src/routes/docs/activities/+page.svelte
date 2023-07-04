<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ActivityDetail } from "common/game/activities/ActivityDetail";
  import ItemPage from "../items/ItemPage.svelte";
  import EntitySidebar from "$lib/components/EntitySidebar.svelte";

  const activities: ActivityDetail[] = Object.values(gameData.activityDetailMap);

  let selectedActivity = null;

  const selectActivity = (activity: ActivityDetail) => {
    selectedActivity = activity;
  };
</script>

<EntitySidebar
  entities={activities}
  selectedEntity={selectedActivity}
  on:select={(event) => selectActivity(event.detail.entity)}
/>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Activity Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each activities as activity}
      <a href="/docs{activity.hrid}">
        <span>{JSON.stringify(activity)}</span>
      </a>
    {/each}
  </div>

  {#if selectedActivity}
    <ItemPage item={selectedActivity} />
  {/if}
</div>
