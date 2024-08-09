import { Theme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export interface EventDataI {
  openEventModal: boolean;
  setOpenEventModal: Dispatch<SetStateAction<boolean>>;
  eventData: any;
  theme: Theme;
}
