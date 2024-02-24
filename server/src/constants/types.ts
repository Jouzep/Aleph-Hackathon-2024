export type dico = {
  name: string;
  owner: string;
  private: boolean;
  presetProducts: presetProducts[];
};

export type group = {
  groupName: string;
  owner: string;
  authorized: string[];
  products: product[];
};

interface image {
  data: ArrayBuffer | Uint8Array;
  mimeType: string;
}

export type presetProducts = {
  name: string;
  size: number[];
  unit: string;
  tags: string[];
  hostDico: string;
  price: number;
};

export type product = {
  image: image;
  name: string;
  price: number;
  size: number;
  state: string;
};
