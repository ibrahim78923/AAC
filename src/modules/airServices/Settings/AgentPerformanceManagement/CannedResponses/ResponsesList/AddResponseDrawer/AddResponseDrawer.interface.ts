import { Dispatch, SetStateAction } from 'react';

export interface AddResponseDrawerPropsI {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
