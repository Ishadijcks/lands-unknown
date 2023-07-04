<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ItemDetail } from "common/game/items/ItemDetail";
  import Icon from "$lib/components/atoms/Icon.svelte";

  const skills: ItemDetail[] = Object.values(gameData.skillDetailMap);
</script>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Skill Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each skills as skill}
      <a href="/docs{skill.hrid}">
        <div class="w-24 h-24 border-primary border-2 p-4 flex flex-col items-center justify-center">
          <Icon icon={skill.icon} />
          <span class="text-xs">{skill.name}</span>
        </div>
      </a>
    {/each}
  </div>
</div>
