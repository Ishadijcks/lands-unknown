<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import Icon from "$lib/components/atoms/Icon.svelte";
  import type { SkillDetail } from "common/game/skills/SkillDetail";

  export let detail: SkillDetail;
  export let level: number;
  export let percentage: number;
</script>

<div class="flex flex-col" title={detail.name}>
  <div class="flex flex-row items-center justify-between h-min p-2">
    <Icon icon={detail.icon} />
    <span>{level}</span>
  </div>
  <ProgressBar value="{percentage * 100} " />
</div>
