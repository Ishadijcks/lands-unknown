<script lang="ts">
  import { gameData } from "common/content/GameData";
  import type { ItemDetail } from "common/game/items/ItemDetail";

  const skills: ItemDetail[] = Object.values(gameData.skillDetailMap);
</script>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Skill Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each skills as skill}
      <a href="/docs{skill.hrid}">
        <span>{JSON.stringify(skill)}</span>
      </a>
    {/each}
  </div>
</div>
