<script lang="ts">
  export let icon: string;
  export let name: string | undefined = undefined;
  export let width = 32;
  export let height = 32;

  $: imgUrl = new URL(`/src/lib/assets/icons/${icon}.png`, import.meta.url).href;
</script>

<img style="width: {width}px; height: {height}px" src={imgUrl} alt={name} class="pixelated" />
