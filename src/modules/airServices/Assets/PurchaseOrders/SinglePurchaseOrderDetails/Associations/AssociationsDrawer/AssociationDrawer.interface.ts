import { Dispatch, SetStateAction } from 'react';

export interface AssociationDrawerPropsI {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  setOpenTicket: Dispatch<SetStateAction<boolean>>;
}
