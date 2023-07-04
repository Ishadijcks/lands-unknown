<script lang="ts">
  import { AppShell } from "@skeletonlabs/skeleton";
  import DocsSidebar from "$lib/docs/DocsSidebar.svelte";
</script>

<AppShell regionPage="overflow-y-scroll" slotFooter="bg-black p-4">
  <!-- Header -->
  <!--  <svelte:fragment slot="header">-->
  <!--  </svelte:fragment>-->

  <!-- Sidebar (Left) -->
  <svelte:fragment slot="sidebarLeft">
    <DocsSidebar class="lg:grid overflow-hidden" />
  </svelte:fragment>

  <!-- Page Content -->
  <div class="flex flex-row p-4">
    <slot />
  </div>

  <!-- Page Footer -->
  <svelte:fragment slot="pageFooter" />
</AppShell>
