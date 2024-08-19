import { SingleDropdownOptionI } from '@/components/SingleDropdownButton/SingleDropdownButton.interface';
import { Dispatch, SetStateAction } from 'react';

export interface AnnouncementIsPortalOpenPropsI {
  isOpen?: boolean;
  isUpsert?: boolean;
  isView?: boolean;
  isDelete?: boolean;
  data?: any;
}

export interface AnnouncementPortalComponentsPropsI {
  isPortalOpen: AnnouncementIsPortalOpenPropsI;
  setIsPortalOpen: Dispatch<SetStateAction<AnnouncementIsPortalOpenPropsI>>;
  dropdownAnnouncementsOptions: (dropdownData: any) => SingleDropdownOptionI[];
  lazyGetCustomerAnnouncementStatus: any;
  getCustomerAnnouncementData: () => void;
  data: any;
  getSingleDashboardData: () => void;
}
