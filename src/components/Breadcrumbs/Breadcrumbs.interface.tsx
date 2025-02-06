import { Variant } from '@mui/material/styles/createTypography';

export interface SingleBreadcrumbPropsI {
  previousPathname: string;
  activePathname: string;
  previousPathnameColor?: string;
  Separator?: React.ElementType;
  previousPathnameVariant?: Variant;
  activePathnameVariant?: Variant;
}
