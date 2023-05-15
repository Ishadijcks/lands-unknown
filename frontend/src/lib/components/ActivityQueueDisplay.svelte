<script lang="ts">
  import type { ClientActivityQueue } from "$lib/luclient/core/activities/ClientActivityQueue";

  export let activityQueue: ClientActivityQueue;
</script>

<div class="flex flex-col">
  <div class="flex flex-row space-x-4 items-stretch">
    {#each activityQueue.queue as activity}
      <div class="card variant-filled p-4">
        {activity}
      </div>
    {/each}
  </div>

  <span>Current activity: {JSON.stringify(activityQueue.currentActivity)}</span>
  <span>Current action: {JSON.stringify(activityQueue.currentAction)}</span>
</div>
