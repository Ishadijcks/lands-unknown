<script lang="ts">
  import { TiledCanvasRender } from "$lib/luclient/core/renderer/TiledCanvasRender";
  import { onMount } from "svelte";
  import { TileSets } from "content/data/worldmap/tilesets";
  import { Images } from "content/data/worldmap/tilesets";
  import { createEventDispatcher } from "svelte";
  import type { LocationHrid } from "common/game/worldmap/LocationHrid";

  const dispatch = createEventDispatcher();

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
      renderer.onLocationClicked = onLocationClicked;
      renderer.loadWorldMap(mapId);
      renderer.render();
    });
  });

  const onLocationClicked = (location: LocationHrid) => {
    dispatch("locationClicked", {
      location: location
    });
  };
</script>

<canvas bind:this={backgroundCanvas} class="pixelated" />
