<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ActionDetail } from "common/game/actions/ActionDetail";

  const actions: ActionDetail[] = Object.values(gameData.actionDetailMap);
</script>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Action Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each actions as action}
      <a href="/docs{action.hrid}">
        <span>{JSON.stringify(action)}</span>
      </a>
    {/each}
  </div>
</div>
