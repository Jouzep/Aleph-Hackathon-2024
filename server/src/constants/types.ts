export interface image {
  data: Uint8Array;
  mimeType: string;
}

export type dico = {
  name: string;
  owner: string;
  private: boolean;
  presetProducts: presetProducts[];
};

export type group = {
  name: string;
  owner: string;
  authorized: string[];
  products: product[];
  state?: string;
};

export type presetProducts = {
  name: string;
  size: number[];
  unit: string;
  price: number;
  image?: image;
};

export type product = {
  name: string;
  description: string;
  price: number;
  size: number;
  state: string;
  quantity: number;
};
