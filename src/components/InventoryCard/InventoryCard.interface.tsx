import { ReactNode } from 'react';

export interface CardPropsI {
  heading: string;
  status: string;
  children?: ReactNode;
  show: boolean;
}
