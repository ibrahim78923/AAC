import { ComponentType } from 'react';
import { IComponentProps } from '../AccountDetails.interface';

export interface IProfileWorkData {
  _id?: number;
  gridLength?: number;
  componentProps?: IComponentProps;
  component: ComponentType<any>;
}

export interface IProfileOtherData {
  _id?: number;
  gridLength?: number;
  componentProps?: IComponentProps;
  component: ComponentType<any>;
}
