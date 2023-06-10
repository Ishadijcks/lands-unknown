<script lang="ts">
  import { ClientSkills } from "$lib/luclient/core/skills/ClientSkills.ts";
  import type { SkillHrid } from "common/content/SkillHrid";
  import SkillDisplay from "$lib/components/SkillDisplay.svelte";

  export let skills: ClientSkills;

  $: skillList = skills.skillList;

  const characterSkill = (hrid: SkillHrid) => {
    return skills.characterSkills[hrid];
  };
</script>

<div class="logo-cloud grid-cols-3 gap-0.5">
  {#each skillList as skill}
    <SkillDisplay
      detail={skill}
      percentage={skills.getProgressPercentage(skill.hrid)}
      level={characterSkill(skill.hrid).level}
      xp={characterSkill(skill.hrid).experience}
    />
  {/each}
</div>
