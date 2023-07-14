<script lang="ts">
  import { TiledCanvasRender } from "$lib/luclient/core/renderer/TiledCanvasRender";
  import { onMount } from "svelte";

  export let mapId: string;

  let backgroundCanvas;
  let playerCanvas;
  let foregroundCanvas;

  import { TileSets } from "content/data/worldmap/tilesets";
  import { Images } from "content/data/worldmap/tilesets";

  //
  // console.log(grassImage);
  let renderedImages;
  onMount(() => {
    renderedImages = Images.map((image) => {
      const tmp = new Image();
      tmp.src = image;
      return tmp;
    });

    setTimeout(() => {
      const renderer = new TiledCanvasRender(
        backgroundCanvas,
        playerCanvas,
        foregroundCanvas,
        renderedImages,
        TileSets
      );
      renderer.loadWorldMap("tutorial");
      renderer.render();
    }, 2000);
  });
</script>

<span>{mapId}</span>
<div class="relative">
  <canvas bind:this={backgroundCanvas} class="absolute pixelated border-2" />
  <canvas bind:this={playerCanvas} class="pixelated absolute border-2" />
  <canvas bind:this={foregroundCanvas} class="absolute pixelated border-2" />
</div>
