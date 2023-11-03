import React from 'react';
import type { ButtonProps, CheckboxProps, TextFieldProps } from '@mui/material';
import { SearchPropsI } from '@/components/Search/Search.interface';

export interface NotificationCardData {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  to?: React.ReactNode;
  date?: React.ReactNode;
}

export interface NotificationProps {
  selectAllProps?: CheckboxProps;
  handleRefresh?: () => void;
  data?: NotificationCardData[];
  singleCheckboxProps?: CheckboxProps;
  singleCardClick?: (obj: object) => void;
}
export interface actionBtnPRops {
  onChange?: (value: string) => void;
  disableActionBtn?: boolean;
}

export interface LeftSideData {
  getTabVal?: (val: string | number) => void;
  inboxData?: NotificationProps;
  sentData?: NotificationProps;
  draftData?: NotificationProps;
  ScheduledData?: NotificationProps;
  trashData?: NotificationProps;
  actionButtonProps?: actionBtnPRops;
  filterBtnProps?: ButtonProps;
}

interface SingleMessageProps {
  userImg?: React.ReactNode;
  title?: React.ReactNode;
  to?: React.ReactNode;
  date?: React.ReactNode;
  description?: React.ReactNode;
}

export interface RightSideData {
  title?: React.ReactNode;
  data?: SingleMessageProps[];
  handleReplayAll?: (obj: object) => void;
  handleReplay?: (obj: object) => void;
  handleForward?: (obj: object) => void;
  sendEmailProps?: ButtonProps;
  emailSettingProps?: ButtonProps;
  searchProps?: SearchPropsI & TextFieldProps;
}
