export type dico = {
  dicoName: string;
  owner: string;
  private: boolean;
};

export type presetProducts = {
  productName: string;
  size: number;
  unit: string;
  tags: string[];
  multiple: boolean;
  hostDico: string;
  price: number;
};

export type product = {
  productName: string;
  price: number;
  size: number;
  state: string;
};

export type group = {
  groupName: string;
  owner: string;
  authorized: string[];
};
