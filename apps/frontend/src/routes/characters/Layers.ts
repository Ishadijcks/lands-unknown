export enum LayerType {
  Head,
  Hair,
  Eyebrows,
  Eyes,
  Nose,
  Mouth,
  Shirt,
  Accessory,
}

export interface Layer {
  name: string;
  type: LayerType;
  options: string[];
}
