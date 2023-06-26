<script lang="ts">
  import type { PageData } from "./$types";
  import Icon from "$lib/components/atoms/Icon.svelte";

  export let data: PageData;

  $:skill = data.detail;
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center">
    <span>{skill.name}</span>
    <Icon icon="{skill.icon}" />
  </div>
</div>
