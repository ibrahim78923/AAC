import { ComponentType } from 'react';
import { IComponentProps } from '../AccountDetails.interface';

export interface IChangePasswordData {
  currentPassword?: string | any;
  newPassword?: string | any;
}

export interface IFieldConfig {
  _id: number;
  gridLength: number;
  componentProps: IComponentProps;
  component: ComponentType<any>;
}
