<script lang="ts">
  import { gameData } from "common/content/GameData";
  import Icon from "$lib/components/atoms/Icon.svelte";
  import EntitySidebar from "$lib/components/EntitySidebar.svelte";
  import type { SkillDetail } from "common/game/skills/SkillDetail";
  import SkillPage from "./SkillPage.svelte";

  const skills: SkillDetail[] = Object.values(gameData.skillDetailMap);

  let selectedSkill = null;

  const selectSkill = (skill: SkillDetail) => {
    selectedSkill = skill;
  };
</script>

<EntitySidebar
  entities={skills}
  selectedEntity={selectedSkill}
  on:select={(event) => selectSkill(event.detail.entity)}
/>

<div class="flex flex-col w-full items-center">
  <p class="font-bold text-2xl">Skill Overview</p>
  <br />
  <div class="flex flex-row flex-wrap gap-1 justify-center">
    {#each skills as skill}
      <div class="w-24 h-24 border-primary border-2 p-4 flex flex-col items-center justify-center">
        <Icon icon={skill.icon} />
        <span class="text-xs">{skill.name}</span>
      </div>
    {/each}
  </div>

  <br />
  {#if selectedSkill}
    <SkillPage skill={selectedSkill} />
  {/if}
</div>
