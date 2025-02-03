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

export interface ViewAvatarPropsI {
  isPortalOpen: boolean;
  setIsPortalOpen: any;
  avatarSrc: string;
  title: string;
  fileType: string;
}

export interface AttachFileCardPropsI {
  data: any;
  onDelete?: () => any;
  permissionKey?: string[];
  size?: AvatarSizeI;
  hasStyling?: boolean;
  canDelete?: boolean;
  flexDirection?: any;
  hasNoDeletePermission?: boolean;
  canPreviewImage?: boolean;
}
