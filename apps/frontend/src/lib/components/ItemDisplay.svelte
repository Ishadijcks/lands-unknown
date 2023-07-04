<script lang="ts">
  import Icon from "$lib/components/atoms/Icon.svelte";
  import type { ItemDetail } from "common/game/items/ItemDetail";

  type DisplaySize = "small" | "large";
  export let size: DisplaySize = "large";
  export let item: ItemDetail;
  export let amount = 0;

  const settings: Record<DisplaySize, { container: number; icon: number }> = {
    small: {
      container: 8,
      icon: 16,
    },
    large: {
      container: 12,
      icon: 32,
    },
  };

  $: setting = settings[size];
</script>

<div
  class="w-{setting.container} h-{setting.container} relative variant-filled-surface border flex flex-row items-center justify-center"
  title={item.name}
>
  <Icon width={setting.icon} height={setting.icon} icon={item.icon} />
  {#if amount > 0}
    <span class="absolute right-0 bottom-0">{amount}</span>
  {/if}
</div>
