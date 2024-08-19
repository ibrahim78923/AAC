import { Dispatch, SetStateAction } from 'react';

export interface AnnouncementDataI {
  userAvatar: string;
  userName: string;
  createdAt: string;
  title: string;
  _id?: string;
  annoucements?: any;
  announcements?: any;
  meta: {
    pages: number;
    limit: number;
    page: number;
    total: number;
  };
}

export interface AnnouncementsListPropsI {
  isDrawerOpen: boolean;
  onClose: () => void;
  data: AnnouncementDataI;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  setPageLimit: Dispatch<SetStateAction<number>>;
  refetch: any;
}

export interface AnnouncementCardPropsI {
  data: AnnouncementDataI;
  index: number;
  _id?: string;
}
