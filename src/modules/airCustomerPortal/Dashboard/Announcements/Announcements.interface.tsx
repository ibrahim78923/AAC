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
  onClose: () => void;
  data: AnnouncementDataI;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: any;
}

export interface AnnouncementCardPropsI {
  data: AnnouncementDataI;
  index: number;
  _id?: string;
}
