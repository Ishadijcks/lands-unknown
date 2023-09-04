<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ActionDetail } from "common/game/actions/ActionDetail";
  import EntitySidebar from "$lib/components/EntitySidebar.svelte";
  import ActionPage from "./ActionPage.svelte";

  const actions: ActionDetail[] = Object.values(gameData.actionDetailMap).filter((action) => action.icon != "road");

  let selectedAction: ActionDetail | null = null;

  const selectItem = (action: ActionDetail) => {
    selectedAction = action;
  };
</script>

<EntitySidebar
  entities={actions}
  selectedEntity={selectedAction}
  on:select={(event) => selectItem(event.detail.entity)}
/>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Action Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each actions as action}
      <ActionPage {action} />
    {/each}
  </div>
</div>
