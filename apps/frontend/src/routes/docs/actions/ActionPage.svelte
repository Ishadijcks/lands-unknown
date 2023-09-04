<script lang="ts">
  import { gameData } from "common/content/GameData.js";
  import ItemDisplay from "$lib/components/ItemDisplay.svelte";
  import Icon from "$lib/components/atoms/Icon.svelte";
  import type { ActionDetail } from "common/game/actions/ActionDetail";

  export let action: ActionDetail;
</script>

<div class="card variant-filled-primary w-48 p-4">
  <div class="flex flex-col items-center space-y-2">
    <span>{action.name}</span>

    <div class="flex flex-row items-center">
      {#each action.inputItems as input}
        <ItemDisplay size="small" item={gameData.itemDetailMap[input.hrid]} amount={input.amount} />
      {/each}
      <Icon icon="arrow-right" />
      {#each action.outputItems as output}
        <ItemDisplay size="small" item={gameData.itemDetailMap[output.hrid]} amount={output.amount} />
      {/each}
    </div>

    <div class="flex flex-row items-center space-x-1">
      <span>{action.baseDuration}</span>
      <Icon icon="clock" height={16} width={16} />
    </div>
    <div class="flex flex-row items-center">
      {#each action.experienceRewards as xpReward}
        <div class="flex flex-row space-x-1 items-center">
          <span>{xpReward.value}</span>
          <Icon icon={gameData.skillDetailMap[xpReward.skillHrid].icon} height={16} width={16} />
        </div>
      {/each}
    </div>
  </div>
</div>
