import { Dispatch, SetStateAction } from 'react';

export interface AddMeetingsDrawerPropsI {
  open: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
