<script lang="ts">
  import { TiledCanvasRender } from "$lib/luclient/core/renderer/TiledCanvasRender";
  import { onMount } from "svelte";
  import { TileSets } from "content/data/worldmap/tilesets";
  import { Images } from "content/data/worldmap/tilesets";

  export let mapId: string;

  let backgroundCanvas: HTMLCanvasElement;
  let playerCanvas: HTMLCanvasElement;
  let foregroundCanvas: HTMLCanvasElement;


  const loadImage = (key: string, src: any) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    }).then((img) => {
      renderedImages[key] = img as HTMLImageElement;
    });
  const renderedImages: Record<string, HTMLImageElement> = {};
  onMount(() => {
    const promises = Object.entries(Images).map(([key, image]) => {
      return loadImage(key, image);
    });

    Promise.all(promises).then((data) => {
      const renderer = new TiledCanvasRender(
        backgroundCanvas,
        playerCanvas,
        foregroundCanvas,
        renderedImages,
        TileSets
      );
      renderer.loadWorldMap(mapId);
      renderer.render();
    });
  });
</script>

<div class="relative">
  <canvas bind:this={backgroundCanvas} class="absolute pixelated" />
  <canvas bind:this={playerCanvas} class="pixelated absolute" />
  <canvas bind:this={foregroundCanvas} class="absolute pixelated" />
</div>
