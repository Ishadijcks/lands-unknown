<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";

  export let percentage: number;
  export let description: string;
</script>

<div class="flex flex-col items-center">
  <span>{description}</span>
  <ProgressBar value="{percentage * 100} " />
</div>
