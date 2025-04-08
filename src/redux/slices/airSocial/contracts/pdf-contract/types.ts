export interface ISignee {
  name: string;
  email: string;
}
export interface ITextComponent {
  id: string;
  x: number;
  y: number;
  page: number;
  text: string;

}

export interface ISignatureComponent {
  id: string;
  x: number;
  y: number;
  page: number;
  signee: ISignee;

}
