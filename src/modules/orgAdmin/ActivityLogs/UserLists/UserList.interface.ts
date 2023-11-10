import { StaticImageData } from 'next/image';

export interface UserListI {
  key?: string | number;
  name?: string;
  desc?: string;
  message?: string;
  label?: string;
  time?: string;
  userImg?: string | undefined | StaticImageData | any;
}

export interface RenderLabelColorsI {
  [label: string]: {
    background?: string;
    color?: string;
  };
}
