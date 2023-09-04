<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ActivityDetail } from "common/game/activities/ActivityDetail";
  import EntitySidebar from "$lib/components/EntitySidebar.svelte";
  import ActivityPage from "./ActivityPage.svelte";

  const activities: ActivityDetail[] = Object.values(gameData.activityDetailMap);

  let selectedActivity: ActivityDetail | null = null;

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
      <ActivityPage {activity} />
    {/each}
  </div>
</div>
