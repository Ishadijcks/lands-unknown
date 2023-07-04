<script lang="ts">
  import Icon from "$lib/components/atoms/Icon.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let selectedEntity: { name: string; icon: string };
  export let entities: { name: string; icon: string }[];
</script>

<section class="w-64 mr-4 space-y-4 overflow-y-auto">
  <nav class="list-nav">
    <ul>
      {#each entities as entity}
        <li
          class="flex flex-row p-1 items-center cursor-pointer {selectedEntity === entity
            ? 'variant-filled-primary'
            : ''}"
          on:click={() => dispatch("select", { entity })}
        >
          <span class="flex-auto">{entity.name}</span>
          <Icon icon={entity.icon} />
        </li>
      {/each}
    </ul>
  </nav>
</section>
