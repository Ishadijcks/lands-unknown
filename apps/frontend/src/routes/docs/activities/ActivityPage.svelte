<script lang="ts">
  import type { ActivityDetail } from "common/game/activities/ActivityDetail";
  import Icon from "$lib/components/atoms/Icon.svelte";
  import { ActivityType } from "common/game/activities/ActivityType";
  import ActionPage from "../actions/ActionPage.svelte";
  import type { ActionHrid } from "common/game/actions/ActionHrid";
  import type { ActionDetail } from "common/game/actions/ActionDetail";
  import { gameData } from "common/content/GameData";

  export let activity: ActivityDetail;

  const getDetail = (actionHrid: ActionHrid): ActionDetail => {
    return gameData.actionDetailMap[actionHrid];
  };
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center space-y-2">
    <span>{activity.name}</span>
    <Icon icon={activity.icon} />

    {#if activity.type === ActivityType.Randomized}
      {#each activity.actions as action}
        <ActionPage action={getDetail(action.hrid)} />
      {/each}
    {/if}
  </div>
</div>
