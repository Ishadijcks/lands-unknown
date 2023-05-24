<script lang="ts">
  import type { ClientActivityQueue } from "$lib/luclient/core/activities/ClientActivityQueue";
  import ActivityDisplay from "$lib/components/ActivityDisplay.svelte";
  import ActionDisplay from "$lib/components/ActionDisplay.svelte";

  export let activityQueue: ClientActivityQueue;
</script>

<div class="flex flex-row space-x-4 items-stretch overflow-x-auto h-36">
  {#if activityQueue.currentActivity}
    <ActivityDisplay
      description={activityQueue.currentActivity.description}
      repetitions={activityQueue.currentActivity.repetitions}
      type={activityQueue.currentActivity.type}
    >
      {#if activityQueue.currentAction}
        <ActionDisplay
          description={activityQueue.currentAction.description}
          percentage={activityQueue.currentAction.progress / activityQueue.currentAction.duration}
        />
      {/if}
    </ActivityDisplay>
  {/if}
  {#each activityQueue.queue as activity}
    <ActivityDisplay
      description={activityQueue.activityDetailMap[activity.hrid].name}
      repetitions={activity.repetitions}
      type={activityQueue.activityDetailMap[activity.hrid].type}
    />
  {/each}
</div>
