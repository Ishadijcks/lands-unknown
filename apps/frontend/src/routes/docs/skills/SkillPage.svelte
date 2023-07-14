<script lang="ts">
  import Icon from "$lib/components/atoms/Icon.svelte";
  import type { SkillDetail } from "common/game/skills/SkillDetail";

  export let skill: SkillDetail;
</script>

<div class="card variant-filled-primary w-48 h-72 p-4">
  <div class="flex flex-col items-center">
    <span>{skill.name}</span>
    <Icon icon={skill.icon} />
  </div>
</div>
