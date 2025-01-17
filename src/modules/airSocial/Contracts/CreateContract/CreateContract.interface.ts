export interface TextComponentI {
  id: string;
  name?: string;
  content?: string;
  x?: number;
  y?: number;
}

export interface signatureFieldI {
  id: string;
  name?: string;
  x?: number;
  y?: number;
}

export interface SigneeI {
  _id: string;
  signingOrder: number;
  onBehalfOf: null | object;
  personalTitle: string;
  name: string;
  email: string;
  signatureStatus: string;
  signatureType: string;
}

export interface PartyI {
  _id: string;
  name: null | object;
  address: string;
  idNumber: string;
  email: string;
  referredAs: string;
  moduleType: string;
}
