import { ReactNode } from 'react';

export type AvatarVariantI = 'circular' | 'rounded' | 'square';

export interface AvatarSizeI {
  width?: number | string;
  height?: number | undefined | string;
  variant?: AvatarVariantI;
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
  nameInitialsSize?: number;
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
  aspectRatio?: string;
  width?: number | string;
  height?: number | undefined | string;
  variant?: AvatarVariantI;
  sizes?: string;
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

export interface LogoAvatarPropsI {
  productName?: string;
  isWhite?: boolean;
  width?: number | string;
  height?: number | undefined | string;
  variant?: AvatarVariantI;
}

export interface SmallLogoAvatarPropsI {
  width?: number | string;
  height?: number | undefined | string;
  variant?: AvatarVariantI;
}
