import { Dispatch, SetStateAction } from 'react';

export interface SingleTicketDetailIsPortalOpenI {
  isOpen?: boolean;
  action?: string;
  status?: string;
}

export interface TimeI {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface SingleTicketDetailPortalComponentPropsI {
  isPortalOpen: SingleTicketDetailIsPortalOpenI;
  setIsPortalOpen: Dispatch<SetStateAction<SingleTicketDetailIsPortalOpenI>>;
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
  refetch: any;
}
