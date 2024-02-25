import { image, product } from "./types";

export type createDicoRequest = {
  name: string;
  owner: string;
  private: boolean;
}

export type getDicoRequest = {
  name: string;
}

export type createGroupRequest = {
  name: string;
  owner: string;
  authorized: string[];
}

export type getGroupRequest = {
  name: string;
}

export type updateGroupRequest = {
  ownerAddress: string;
  groupName: string;
  product: product;
}

export type deleteProductRequest = {
  ownerAddress: string;
  groupName: string;
}

export type createProductRequest = {
  image: image;
  name: string;
  size: number;
  price: number;
  state: string;
}
