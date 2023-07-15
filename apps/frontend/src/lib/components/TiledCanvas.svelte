<script lang="ts">
  import { TiledCanvasRender } from "$lib/luclient/core/renderer/TiledCanvasRender";
  import { onMount } from "svelte";

  export let mapId: string;

  let backgroundCanvas;
  let playerCanvas;
  let foregroundCanvas;

  import { TileSets } from "content/data/worldmap/tilesets";
  import { Images } from "content/data/worldmap/tilesets";

  const loadImage = (key, src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    }).then((img) => {
      renderedImages[key] = img;
    });
  const renderedImages = {};
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
      renderer.loadWorldMap("tutorial");
      renderer.render();
    });
  });
</script>

<span>{mapId}</span>
<div class="relative">
  <canvas bind:this={backgroundCanvas} class="absolute pixelated border-2" />
  <canvas bind:this={playerCanvas} class="pixelated absolute border-2" />
  <canvas bind:this={foregroundCanvas} class="absolute pixelated border-2" />
</div>
