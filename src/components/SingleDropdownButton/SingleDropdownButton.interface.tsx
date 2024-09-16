export interface SingleDropdownButtonPropsI {
  dropdownOptions: any[];
  disabled?: boolean;
  dropdownName?: string | JSX.Element;
  hasEndIcon?: boolean;
  btnVariant?: string;
  Variant?: any;
  menuSxProps?: any;
  [key: string]: any;
}

export type SingleDropdownButtonCloseMenuI = (e?: any) => void;

export interface SingleDropdownOptionI {
  permissionKey: string[];
  id: string | number;
  title: string;
  handleClick: (closeMenu: SingleDropdownButtonCloseMenuI) => void;
  disabled?: boolean;
  titleSx?: { [key: string]: string | number };
}
