<script lang="ts">
  import ItemDisplay from "$lib/components/ItemDisplay.svelte";
  import type { ItemDetail } from "common/game/items/ItemDetail";

  export let item: ItemDetail;
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center">
    <span>{item.name}</span>
    <ItemDisplay {item} />
    <span>{item.description}</span>
    <span>{item.icon}</span>
  </div>
</div>
