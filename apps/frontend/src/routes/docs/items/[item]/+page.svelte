<script lang="ts">
  import type { PageData } from "./$types";
  import ItemDisplay from "$lib/components/ItemDisplay.svelte";

  export let data: PageData;
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center">
    <span>{data.detail.name}</span>
    <ItemDisplay item={data.detail} />
    <span>{data.detail.description}</span>
    <span>{data.detail.hrid}</span>
    <span>{data.detail.icon}</span>
  </div>
</div>
