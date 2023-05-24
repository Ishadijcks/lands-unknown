<script lang="ts">
  import { ActivityType } from "common/game/activities/ActivityType";

  export let description: string;
  export let repetitions: number;

  export let type: ActivityType;

  // TODO(@Isha): Move to content
  $: style = () => {
    switch (type) {
      case ActivityType.Forest:
        return "variant-filled-success";
      case ActivityType.Sea:
        return "variant-filled-surface";
      case ActivityType.Lake:
        return "variant-filled-surface";
      case ActivityType.Mountain:
        return "variant-ghost";
    }
  };
</script>

<div class="card {style()} w-48 h-36 flex flex-col items-center">
  <span class="card-header">
    <span>{description} </span>
    {#if repetitions > 0}
      <span>({repetitions})</span>
    {/if}
  </span>
  <slot />
</div>
