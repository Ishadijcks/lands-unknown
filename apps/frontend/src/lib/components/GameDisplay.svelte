<script lang="ts">
  import Skills from "$lib/components/Skills.svelte";
  import ActivityQueueDisplay from "$lib/components/ActivityQueueDisplay.svelte";
  import InventoryDisplay from "$lib/components/InventoryDisplay.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";
  import { LuClient } from "$lib/luclient/LuClient.js";
  import WorldMapDisplay from "$lib/components/WorldMapDisplay.svelte";

  export let luClient: LuClient;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <div class="card p-4 m-2">
      <ActivityQueueDisplay activityQueue={luClient.activityQueue} />
    </div>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <ul class="list mx-2 h-full space-y-2">
      <li class="card p-4">
        <Skills skills={luClient.skills} />
      </li>
      <li class="card p-4">
        <span class="h-48">Secret goes here</span>
      </li>
    </ul>
  </svelte:fragment>
  <svelte:fragment slot="sidebarRight">
    <div class="card mx-2 p-4">
      <InventoryDisplay inventory={luClient.inventory} />
    </div>
  </svelte:fragment>
  <div class="card h-full">
    <WorldMapDisplay worldMap={luClient.worldMap} />
  </div>

  <svelte:fragment slot="pageFooter">
    <div class="card h-48 mt-2 mb-2 p-4">Chat goes here</div>
  </svelte:fragment>
</AppShell>
