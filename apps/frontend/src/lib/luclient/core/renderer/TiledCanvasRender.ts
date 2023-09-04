import { TiledMapRepository } from "common/game/worldmap/TiledMapRepository";
import type { TiledMap } from "common/game/worldmap/tiled/TiledMap";
import type { TileSet } from "common/game/worldmap/tiled/TileSet";
import type { TileLayer } from "common/game/worldmap/tiled/TileLayer";
import type { TiledLayer } from "common/game/worldmap/tiled/TiledLayer";
import { LayerType } from "common/game/worldmap/tiled/LayerType";
import type { ObjectGroup } from "common/game/worldmap/tiled/ObjectGroup";
import type { ClickBox } from "common/game/worldmap/tiled/ClickBox";
import type { LocationHrid } from "common/game/worldmap/LocationHrid";

/**
 * Extremely limited support to render Tiled maps
 */
export class TiledCanvasRender {
  public backgroundCanvas: HTMLCanvasElement;

  public isHoveringOverClickBox = false;

  public onLocationClicked?: (location: LocationHrid) => void;

  private _tiledMap!: TiledMap;
  private _tileSets: Record<string, TileSet>;
  private _tileSetImages: Record<string, HTMLImageElement>;
  private _tileHeight = 16;
  private _tileWidth = 16;
  private _currentScale = 1;
  private _clickBoxes: ClickBox[] = [];

  private _firstGids: Record<string, number> = {};

  private _ctx: CanvasRenderingContext2D;

  constructor(
    backgroundCanvas: HTMLCanvasElement,
    playerCanvas: HTMLCanvasElement,
    foregroundCanvas: HTMLCanvasElement,
    tilesetImages: Record<string, HTMLImageElement>,
    tileSets: Record<string, TileSet>
  ) {
    this.backgroundCanvas = backgroundCanvas;
    this._ctx = this.backgroundCanvas.getContext("2d") as CanvasRenderingContext2D;

    this._tileSetImages = tilesetImages;
    this._tileSets = tileSets;
  }

  loadWorldMap(id: string) {
    this._tiledMap = TiledMapRepository.getTiledMap(id);
    this._firstGids = {};

    this._tiledMap.tilesets.forEach((tileSet) => {
      const name: string = this._getFileName(tileSet.source);
      this._firstGids[name] = tileSet.firstgid;
    });

    this._tileHeight = this._tiledMap.tileheight;
    this._tileWidth = this._tiledMap.tilewidth;

    this.backgroundCanvas.width = this._tiledMap.width * this._tileWidth;
    this.backgroundCanvas.height = this._tiledMap.height * this._tileHeight;
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

      this._ctx.drawImage(img, sx, sy, this._tileWidth, this._tileHeight, dx, dy, this._tileWidth, this._tileHeight);
    }
  }

  private renderObjectGroup(layer: ObjectGroup) {
    for (let i = 0; i < layer.objects.length; i++) {
      const object = layer.objects[i];

      if (object.text) {
        this._ctx.font = `${object.text.pixelsize}px ${object.text.fontfamily}`;
        this._ctx.textAlign = "center";
        this._ctx.textBaseline = "middle";
        this._ctx.fillStyle = object.text.color ?? "black";
        this._ctx.fillText(object.text.text, object.x + object.width / 2, object.y + object.height / 2);
      } else if (object.point) {
        // Ignore points
      } else if (object.polyline) {
        // Ignore roads
      } else if (object.properties) {
        this._ctx.beginPath();
        this._ctx.strokeStyle = "black";
        this._ctx.rect(object.x, object.y, object.width, object.height);
        this._ctx.stroke();

        const hrid = object.properties.find((property) => property.name === "hrid")?.value;
        if (!hrid) {
          console.error("Object is a clickbox but does not have the hrid property", object);
        }
        this._clickBoxes.push({
          ...object,
          hrid,
        });
      }
    }
  }

  renderLayer(layer: TiledLayer) {
    switch (layer.type as LayerType) {
      case LayerType.TileLayer:
        this.renderTileLayer(layer as TileLayer);
        break;
      case LayerType.ObjectGroup:
        this.renderObjectGroup(layer as ObjectGroup);
        break;
    }
  }

  getCursorPosition(event: MouseEvent) {
    const rect = this.backgroundCanvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / this._currentScale;
    const y = (event.clientY - rect.top) / this._currentScale;
    return [x, y];
  }

  isPointInRectangle(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
    if (px < rx || px > rx + rw) {
      return false;
    }
    if (py < ry || py > ry + rh) {
      return false;
    }
    return true;
  }

  render() {
    this._tiledMap.layers.forEach((layer) => this.renderLayer(layer));

    this.backgroundCanvas.onmousemove = (event: MouseEvent) => {
      const [mouseX, mouseY] = this.getCursorPosition(event);

      this.isHoveringOverClickBox = this._clickBoxes.some((clickBox) => {
        return this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height);
      });
    };

    this.backgroundCanvas.onpointerdown = (event: MouseEvent) => {
      // get the mouse position
      const [mouseX, mouseY] = this.getCursorPosition(event);
      // iterate each shape in the shapes array
      this._clickBoxes.forEach((clickBox) => {
        if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
          this.onLocationClicked?.(clickBox.hrid);
        }
      });
    };
  }

  private _getFileName(path: string): string {
    return path.split("/").pop()?.split(".")[0] as string;
  }
}
