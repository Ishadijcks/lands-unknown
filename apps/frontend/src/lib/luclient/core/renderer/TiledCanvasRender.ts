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
  private _tileSets: Record<string, TileSet>;
  private _tileSetImages: Record<string, HTMLImageElement>;
  private _tileHeight = 16;
  private _tileWidth = 16;

  private _firstGids: Record<string, number> = {};

  constructor(
    backgroundCanvas: HTMLCanvasElement,
    playerCanvas: HTMLCanvasElement,
    foregroundCanvas: HTMLCanvasElement,
    tilesetImages: Record<string, HTMLImageElement>,
    tileSets: Record<string, TileSet>
  ) {
    this.backgroundCanvas = backgroundCanvas;
    this.playerCanvas = playerCanvas;
    this.foregroundCanvas = foregroundCanvas;

    this._tileSetImages = tilesetImages;
    this._tileSets = tileSets;
  }

  loadWorldMap(id: string) {
    this._tiledMap = WorldMapRepository.getWorldMap(id);
    this._firstGids = {};

    this._tiledMap.tilesets.forEach((tileSet) => {
      const name: string = this._getFileName(tileSet.source);
      this._firstGids[name] = tileSet.firstgid;
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
    const result = Object.entries(this._firstGids)
      // Sort descending
      .sort((a, b) => b[1] - a[1])
      // And find the first one that is lower or equal
      .find(([_, firstGid]) => firstGid <= id);
    if (!result) {
      throw new Error(`Could not find tileset for gid ${id}`);
    }
    const tileset = this._tileSets[result[0]];
    if (!tileset) {
      throw new Error(`Could not find tileset ${result}. Did you reexport it from tilesets/index.ts?`);
    }
    return tileset;
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

      const firstGid = this._firstGids[tileSet.name];

      const [sourceX, sourceY] = this.indexToXY(data[i] - firstGid, tileSet.columns);
      const spacing = tileSet.spacing;
      const sx = sourceX * (this._tileWidth + spacing);
      const sy = sourceY * (this._tileHeight + spacing);
      const dx = destinationX * this._tileWidth;
      const dy = destinationY * this._tileHeight;

      const img = this._tileSetImages[tileSet.name];

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

  private _getFileName(path: string): string {
    return path.split("/").pop()?.split(".")[0] as string;
  }
}
