import { SvgIconProps } from '@mui/material';
import { ComponentType, FC, SVGProps } from 'react';

type AvatarType = ComponentType<SvgIconProps> | FC<SVGProps<SVGSVGElement>>;

export interface ISettingsCards {
  id: number;
  avatar: AvatarType;
  type: string;
  link: string | undefined;
  purpose?: string;
  permissions: string | any | undefined;
}
