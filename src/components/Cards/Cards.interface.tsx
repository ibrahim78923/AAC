import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

export interface AvatarSizeI {
  width?: number | string;
  height?: number | string | undefined;
  variant?: string;
}

export interface ActivityCardPropsI {
  Icon?: null | any;
  firstName?: string | undefined;
  lastName?: string | undefined;
  activityType?: string | undefined;
  moduleName?: string | undefined;
  activityDate: Date | string;
  dateFormat?: string;
  hasBorderBottom?: boolean;
}

export interface AddNewCardPropsI {
  onClick?: any;
  title?: string;
  outerPaddingY?: number;
  flexDirection?: string;
  iconBackgroundColor?: string;
  iconBorderColor?: string;
  iconColor?: string;
  cardBorderColor?: string;
  iconPadding?: number;
}

export interface AvatarInfoCardPropsI {
  name?: string;
  description?: string;
  info?: string;
  onClick?: any;
  avatarSrc?: string;
  avatarSize?: AvatarSizeI;
  onCheckboxChange?: any;
  checked?: boolean;
  hasCheckbox?: boolean;
  infoType?: string;
  descriptionType?: string;
  subInfo?: string;
  subInfoType?: string;
  caption?: string;
  captionType?: string;
}

export interface AvatarItemCountCardPropsI {
  avatarBgColor?: string;
  name?: string;
  count?: number;
  avatarUrl?: string | any;
  isDynamic?: boolean;
  avatarSize?: AvatarSizeI;
  avatarPadding?: number;
}

export interface IconInfoCardPropsI {
  onClick?: any;
  name?: string;
  description?: string;
  hasIcon?: boolean;
  textAlign?: string;
  isActive?: boolean;
  avatarBackgroundColor?: string;
  descriptionType?: string;
  createdDate?: Date | string;
  dateType?: any;
  iconType?: string;
}

export interface InteractiveInfoCardPropsI {
  name: string;
  dropdownOptions?: any;
  description?: string | TrustedHTML;
  count?: number;
  itemToCount?: string;
  avatarSrc?: string;
  dropdownPermissions?: any[];
  hasDropdownPermission?: boolean;
  handleAddUser?: any;
  usersList?: any[];
  hasAddUserPermission?: boolean;
  addUserPermissions?: any[];
  showCount?: boolean;
  hasAvatar?: boolean;
  isShadowCard?: boolean;
  hasUsersList?: boolean;
}

export interface InteractiveUserFeedCardPropsI {
  dropdownAnnouncementsOptions?: any[];
  title: string;
  hasBorderBottom?: boolean;
  firstName?: string;
  lastName?: string;
  userAvatarSrc?: string;
  hasAction?: boolean;
  dateFrom?: Date | string;
  description?: string | TrustedHTML;
  hasDescription?: boolean;
}

export interface InventoryCardPropsI {
  heading?: string;
  status?: string;
  children?: ReactNode;
  showChild?: boolean;
  openDeleteModal?: boolean;
  setOpenDeleteModal?: any;
  handleDelete?: any;
  setDelateRecord?: any;
  deletedRecordId?: string;
  deleteIsLoading?: boolean;
  hasDeleteIcon?: boolean;
}

export interface ItemChipCardPropsI {
  itemName: string;
  chipLabel: string;
}

export interface ItemInitialHoveredIconCardPropsI {
  hasHover?: boolean;
  initial?: string;
  name?: string;
  onIconClick?: any;
  iconList?: string[];
  id?: string | number;
  hasNoActionPermission?: { [key: string]: boolean };
  actionPermissions?: any;
}

export interface ItemSummaryCardPropsI {
  onClick?: any;
  name: string;
  Icon?: null | ReactNode;
}

export interface SemiInteractiveInfoCardPropsI {
  outerPaddingY?: string;
  isLocked?: boolean;
  dropdownOptions: any[];
  onClick?: any;
  description?: string;
  name: string;
  lockedMainIcon?: ReactNode;
  unLockedMainIcon?: ReactNode;
  lockedIcon?: ReactNode;
  hasNoDropdownPermission?: boolean;
  dropdownPermissions?: any[];
}

export interface ItemLinkCardPropsI {
  Icon?: any | null;
  itemType?: string;
  itemPurpose?: string;
  itemLink?: string;
  flexDirection?: string;
  itemTypeFontSize?: Variant | any;
  alignItems?: string;
  display?: string;
  textAlign?: string;
  avatarMargin?: number | string;
  avatarVariant?: any;
  avatarSize?: any;
  marginY?: number;
  hasLink?: boolean;
  itemPurposeFontSize?: Variant | any;
  hasQuery?: any;
  hoverStyles?: any;
  borderColor?: string;
}

export interface CustomizeItemCardPropsI {
  name: string;
  onChange: any;
  checked: boolean;
  id: string;
}
