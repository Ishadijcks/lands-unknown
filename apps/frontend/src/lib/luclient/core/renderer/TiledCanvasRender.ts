import { WorldMapRepository } from "$lib/luclient/core/renderer/WorldMapRepository";
import type { TiledMap } from "common/game/worldmap/tiled/TiledMap";
import type { TileSet } from "common/game/worldmap/tiled/TileSet";
import type { TileLayer } from "common/game/worldmap/tiled/TileLayer";
import type { TiledLayer } from "common/game/worldmap/tiled/TiledLayer";
import { LayerType } from "common/game/worldmap/tiled/LayerType";

/**
 * Extremely limited support to render Tiled maps
 */
export class TiledCanvasRender {
  public backgroundCanvas: HTMLCanvasElement;
  public playerCanvas: HTMLCanvasElement;
  public foregroundCanvas: HTMLCanvasElement;

  private _tiledMap!: TiledMap;
  private _tileSets: TileSet[];
  private _tileSetImages: any[];
  private _tileHeight = 16;
  private _tileWidth = 16;

  private _firstGids: Record<string, number> = {};

  constructor(
    backgroundCanvas: HTMLCanvasElement,
    playerCanvas: HTMLCanvasElement,
    foregroundCanvas: HTMLCanvasElement,
    images: any[],
    tileSets: TileSet[]
  ) {
    this.backgroundCanvas = backgroundCanvas;
    this.playerCanvas = playerCanvas;
    this.foregroundCanvas = foregroundCanvas;

    this._tileSetImages = images;
    this._tileSets = tileSets;
  }

  loadWorldMap(id: string) {
    this._tiledMap = WorldMapRepository.getWorldMap(id);
    this._firstGids = {};

    this._tiledMap.tilesets.forEach((tileSet) => {
      this._firstGids[tileSet.source.split("/").pop().replace(".json", "")] = tileSet.firstgid;
    });
    this._tileHeight = this._tiledMap.tileheight;
    this._tileWidth = this._tiledMap.tilewidth;

    this.canvases.forEach((canvas) => {
      canvas.width = this._tiledMap.width * this._tileWidth;
      canvas.height = this._tiledMap.height * this._tileHeight;
    });
  }

  public get canvases(): HTMLCanvasElement[] {
    return [this.backgroundCanvas, this.playerCanvas, this.foregroundCanvas];
  }

  indexToXY(index: number, width: number) {
    const x = index % width;
    const y = Math.floor(index / width);
    return [x, y];
  }

  private getTileSetFromGid(id: number) {
    let highestFound = -1;
    let highestIndex = -1;

    for (let i = 0; i < this._tiledMap.tilesets.length; i++) {
      if (id >= this._tiledMap.tilesets[i].firstgid) {
        if (this._tiledMap.tilesets[i].firstgid >= highestFound) {
          highestFound = this._tiledMap.tilesets[i].firstgid;
          highestIndex = i;
        }
      }
    }
    return this._tileSets[highestIndex];
  }

  private renderTileLayer(layer: TileLayer) {
    const data = layer.data;
    const width = layer.width;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) {
        continue;
      }
      const [destinationX, destinationY] = this.indexToXY(i, width);

      const tileSet = this.getTileSetFromGid(data[i]);

      const firstgid = this._firstGids[tileSet.name.toLowerCase()];
      console.log(this._firstGids, firstgid);
      const [sourceX, sourceY] = this.indexToXY(data[i] - firstgid, tileSet.columns);
      const spacing = tileSet.spacing;
      const sx = sourceX * (this._tileWidth + spacing);
      const sy = sourceY * (this._tileHeight + spacing);
      const dx = destinationX * this._tileWidth;
      const dy = destinationY * this._tileHeight;

      const img =
        this._tileSetImages[
          this._tileSets.findIndex((targetTileSet) => targetTileSet.name.toLowerCase() === tileSet.name.toLowerCase())
        ];
      console.log(tileSet.name, img);
      this.backgroundCanvas
        .getContext("2d")
        ?.drawImage(img, sx, sy, this._tileWidth, this._tileHeight, dx, dy, this._tileWidth, this._tileHeight);
    }
  }

  renderLayer(layer: TiledLayer) {
    switch (layer.type as LayerType) {
      case LayerType.TileLayer:
        this.renderTileLayer(layer as TileLayer);
        break;
      case LayerType.ObjectGroup:
        // this.renderObjectGroup(layer as ObjectGroup);
        console.warn("Not doing object groups");
        break;
    }
  }

  render() {
    this._tiledMap.layers.forEach((layer) => this.renderLayer(layer));
  }
}
