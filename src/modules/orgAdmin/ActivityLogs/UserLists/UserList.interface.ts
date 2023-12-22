import { StaticImageData } from 'next/image';

export interface UserListI {
  key?: string | number;
  performedByName?: string;
  moduleName?: string;
  label?: string;
  time?: string;
  userImg?: string | undefined | StaticImageData | any;
  performedBy: any;
  moduleId: any;
}

export interface RenderLabelColorsI {
  [label: string]: {
    background?: string;
    color?: string;
  };
}
