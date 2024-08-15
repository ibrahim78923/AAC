import { Dispatch, SetStateAction } from 'react';

export interface IsPortalOpenI {
  isOpen?: boolean;
  action?: string;
}

export interface TimeI {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SingleTicketDetailPortalComponentPropsI {
  isPortalOpen: IsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<IsPortalOpenI>>;
  selectedTicketList: string[];
  isMoveBack: boolean;
  data: any;
  isTimerPause: boolean;
  setIsTimerPause: Dispatch<SetStateAction<boolean>>;
}

export interface SingleTicketDetailChildComponentPropsI {
  data: any;
  isTimerPause: boolean;
  setIsTimerPause: Dispatch<SetStateAction<boolean>>;
  time: TimeI;
  setTime: Dispatch<SetStateAction<TimeI>>;
  startTimerId: any;
  intervalRef: any;
}
