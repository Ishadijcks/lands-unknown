<script lang="ts">
  import type { LocationDetail } from "common/game/worldmap/LocationDetail";

  export let location: LocationDetail;
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center space-y-2">
    <span>{location.name}</span>
    <span>{JSON.stringify(location)}</span>
  </div>
</div>
