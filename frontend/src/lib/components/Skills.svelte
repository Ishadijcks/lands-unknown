<script lang="ts">
  import { ClientSkills } from "$lib/luclient/core/skills/ClientSkills.ts";
  import type { SkillHrid } from "common/player/skills/SkillHrid";

  export let skills: ClientSkills;

  $: skillList = skills.skillList

  const characterSkill = (hrid: SkillHrid)  => {
    return skills.characterSkills[hrid];
  }
</script>

<div class="flex flex-col">
  {#each skillList as skill}
    <div class="flex flex-row">
      <span>{skill.name}</span>
      <span>{characterSkill(skill.hrid).level}</span>
      <span>{characterSkill(skill.hrid).experience}</span>
      <span>{(skills.getProgressPercentage(skill.hrid) * 100).toFixed(2)}%</span>
    </div>
  {/each}
</div>
