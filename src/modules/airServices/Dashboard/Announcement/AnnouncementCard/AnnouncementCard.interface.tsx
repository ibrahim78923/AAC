import { SingleDropdownOptionI } from '@/components/Buttons/SingleDropdownButton/SingleDropdownButton.interface';

export interface AnnouncementCardProps {
  data: any;
  index: number;
  dropdownAnnouncementsOptions?: SingleDropdownOptionI[];
  isLoggedInUser?: boolean;
  userDetails: {
    userAvatar: string;
    userName: string;
  };
}
