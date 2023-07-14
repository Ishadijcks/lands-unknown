<script lang="ts">
  import type { ActivityDetail } from "common/game/activities/ActivityDetail";

  export let activity: ActivityDetail;
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center space-y-2">
    <span>{activity.name}</span>
    <span>{activity.hrid}</span>

    <span>{JSON.stringify(activity)}</span>
  </div>
</div>
