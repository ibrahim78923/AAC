import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { ReactNode } from 'react';

export interface NoDataPropsI {
  image: StaticImport;
  message: string;
  children?: ReactNode;
}
