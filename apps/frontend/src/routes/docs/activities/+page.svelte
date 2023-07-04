<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ActivityDetail } from "common/game/activities/ActivityDetail";

  const activities: ActivityDetail[] = Object.values(gameData.activityDetailMap);
</script>

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
</div>
