export interface IItemDetail {
  _id: string;
  title?: string;
}

export interface IItemData {
  _id?: number;
  heading?: string;
  details?: IItemDetail[];
}

interface IAuthProduct {
  _id?: string | any;
  accounts?: { _id: string };
}

export interface IAuth {
  product?: IAuthProduct | any;
}

export interface ISwitchLoadingState {
  [key: string]: boolean;
}
