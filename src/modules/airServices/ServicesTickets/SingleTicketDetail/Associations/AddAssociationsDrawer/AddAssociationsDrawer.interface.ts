import { Dispatch, SetStateAction } from 'react';

export interface AddAssociationsDrawerPropsI {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
