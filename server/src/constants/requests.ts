import { image } from "./types";

export type createDicoRequest = {
  name: string;
  owner: string;
  private: boolean;
}

export type getDicoRequest = {
  Name: string;
}

export type createGroupRequest = {
  name: string;
  owner: string;
  authorized: string[];
}

export type getGroupRequest = {
  Name: string;
}

export type createProductRequest = {
  image: image;
  name: string;
  size: number;
  price: number;
  state: string;
}
