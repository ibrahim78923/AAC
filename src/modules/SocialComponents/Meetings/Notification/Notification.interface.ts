import { ReactNode } from 'react';

export interface Auth {
  product: {
    accounts: Array<{
      _id: string;
    }>;
  };
}

export interface ApiDataParameterI {
  queryParams: {
    accountId: string;
  };
}

export interface ToggleMeetingsNotificationParamsI {
  e: React.ChangeEvent<HTMLInputElement>;
  formData: {
    enum: string;
  };
}

export interface MeetingNotificationI {
  id: number;
  enum: any;
  avatar: ReactNode;
  type: string;
  purpose: string;
}

export interface UseNotificationReturnI {
  meetingsNotificationData: any;
  toggleMeetingsNotification: (
    params: ToggleMeetingsNotificationParamsI,
  ) => Promise<void>;
  patchMeetingsSettingsNotificationStatus: any;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  data: any;
}
