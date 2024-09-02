import { ComponentType, SVGProps } from 'react';

interface IComponentProps {
  name: string;
  maxSize?: number;
  fileType?: string;
  accept?: {
    [key: string]: string[];
  };
  label?: string;
  type?: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
}

export interface IContentArrayItem {
  id: number;
  componentProps: IComponentProps;
  component: React.ComponentType<any>;
}

export interface ICustomizationsDataItem {
  _id: number;
  title: string;
  contentArray: IContentArrayItem[];
}

export interface ICustomizationsProps {
  reset: () => any;
  customizationsDataArray: ICustomizationsDataItem[];
}

export interface IPreviewProps {
  watch: () => any;
}

export interface INavbarDataArrayItem {
  id: number;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}
