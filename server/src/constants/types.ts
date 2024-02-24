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

export type presetProducts = {
  name: string;
  size: number[];
  unit: string;
  tags: string[];
  hostDico: string;
  price: number;
};

export type product = {
  name: string;
  price: number;
  size: number;
  state: string;
};
