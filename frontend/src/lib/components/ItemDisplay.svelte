<script lang="ts">
  import Icon from "$lib/components/atoms/Icon.svelte";
  import type { ItemDetail } from "common/game/items/ItemDetail";

  export let item: ItemDetail;
  export let amount = 0

</script>

<div class="relative variant-filled-surface border w-12 h-12 flex flex-row items-center justify-center" title="{item.name}">
  <Icon icon="{item.icon}"></Icon>
  <span class="absolute right-0 bottom-0">{amount}</span>
</div>