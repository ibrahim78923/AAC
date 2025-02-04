import { Dispatch, SetStateAction } from 'react';

export interface AnnouncementDataI {
  _id?: string;
  title?: string;
  createdBy?: {
    avatar?: {
      url?: string;
    };
    firstName?: string;
    lastName?: string;
  };
  createdAt: string;
  announcements: any;
  data: {
    userAvatar: string;
    userName: string;
    createdAt: string;
    title: string;
    _id?: string;
    annoucements?: any;
    announcements?: any;
  }[];
}

export interface AnnouncementsListPropsI {
  isDrawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  data: AnnouncementDataI;
  isLoading?: boolean;
  isFetching?: boolean;
  isError: boolean;
  refetch: any;
  showLoader: boolean;
}

export interface AnnouncementCardPropsI {
  data: AnnouncementDataI;
  index: number;
  _id?: string;
}
