import { Dispatch, SetStateAction } from 'react';

export interface AssociationsDrawerPropsI {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
