<script lang="ts">
  import type { Layer } from "./Layers";
  import { LayerType } from "./Layers";

  const layerOptions = (startsWith: string): string[] => {
    const imageModules = import.meta.glob("../../lib/assets/characters/*.png");

    return Object.keys(imageModules)
      .map((modulePath) => {
        const split = modulePath.split("/");
        return split[split.length - 1].split(".")[0];
      })
      .filter((name) => name.startsWith(startsWith));
  };
  const layers: Layer[] = [
    { name: "Head", type: LayerType.Head, options: layerOptions("head") },
    { name: "Eyes", type: LayerType.Eyes, options: layerOptions("eyes") },
    { name: "Eyebrows", type: LayerType.Eyebrows, options: layerOptions("eyebrows") },
    { name: "Accessory", type: LayerType.Accessory, options: layerOptions("accessory") },
    { name: "Mouth", type: LayerType.Mouth, options: layerOptions("mouth") },
    { name: "Nose", type: LayerType.Nose, options: layerOptions("nose") },
    { name: "Shirt", type: LayerType.Shirt, options: layerOptions("shirt") },
    { name: "Hair", type: LayerType.Hair, options: layerOptions("hair") },
  ];
  const selectedItems: { [Key in LayerType]?: string } = {};

  const random = () => {
    layers.forEach((layer) => {
      const index = Math.floor(Math.random() * layer.options.length);
      selectedItems[layer.type] = layer.options[index];
    });
  };

  console.log(layerOptions("asd"));

  const imgUrl = (option: string) => {
    return new URL(`/src/lib/assets/characters/${option}.png`, import.meta.url).href;
  };

  const selectItem = (layer: string, item: string) => {
    console.log(layer, item);
    selectedItems[layer] = item;
  };
</script>

<span class="h2">Character Builder</span>
<button class="btn variant-filled-primary" on:click={random}>Random</button>
{JSON.stringify(selectedItems)}
<div class="flex flex-row">
  <div class="flex flex-col card flex-grow space-y-2 overflow-x-auto">
    {#each layers as layer}
      <div class="flex flex-row p-4">
        <span class="h2">{layer.name}</span>

        <div class="flex flex-row space-x-2">
          <label class="flex flex-col items-center space-y-2">
            <input class="radio" type="radio" bind:group={selectedItems[layer.type]} name={layer.name} value={null} />
            <span>None</span>
          </label>

          {#each layer.options as option}
            <label class="flex flex-col items-center space-y-2">
              <input
                class="radio"
                type="radio"
                bind:group={selectedItems[layer.type]}
                name={layer.name}
                value={option}
              />
              <span>{option}</span>
            </label>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col ml-4 justify-center items-center">
    <div class="border" style="width: 128px; height: 128px">
      {#each layers as layer}
        {#if selectedItems[layer.type] != undefined}
          <img
            class="pixelated absolute"
            style="width: 128px; height: 128px"
            src={imgUrl(selectedItems[layer.type])}
            alt={selectedItems[layer.type]}
          />
        {/if}
      {/each}
    </div>
  </div>
</div>
