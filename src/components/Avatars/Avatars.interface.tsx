import { ReactNode } from 'react';

export interface AvatarSizeI {
  width?: number;
  height?: number | undefined;
  variant?: string;
}

export interface CustomAvatarPropsI {
  avatarSize?: AvatarSizeI;
  nameInitial?: string;
  avatarSrc: string | undefined;
  tooltipTitle?: string;
  customTooltipProps?: any;
  backgroundColor?: string;
  customStyles?: any;
  padding?: number;
  initialColor?: string;
}

export interface IconAvatarPropsI {
  avatarSize?: AvatarSizeI;
  alt?: string;
  backgroundColor?: string;
  customStyles?: any;
  padding?: number;
  children: ReactNode;
}

export interface StaticAvatarPropsI {
  avatarSize?: AvatarSizeI;
  alt?: string;
  backgroundColor?: string;
  customStyles?: any;
  padding?: number;
  children?: ReactNode;
  avatarSrc: any;
}

export interface CustomAvatarGroupPropsI {
  avatarSize?: AvatarSizeI;
  max?: number;
  customStyles?: any;
  selectedUsers?: any;
}
