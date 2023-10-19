import { Dispatch, SetStateAction } from 'react';

export interface AddAssociateAssetDrawerPropsI {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
