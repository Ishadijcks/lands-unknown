<script lang="ts">
  import { ActivityTheme } from "common/game/activities/ActivityTheme";

  export let description: string;
  export let repetitions: number;

  export let theme: ActivityTheme;

  // TODO(@Isha): Move to content
  $: style = () => {
    switch (theme) {
      case ActivityTheme.Forest:
        return "variant-filled-success";
      case ActivityTheme.Sea:
        return "variant-filled-surface";
      case ActivityTheme.Lake:
        return "variant-filled-surface";
      case ActivityTheme.Mountain:
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
