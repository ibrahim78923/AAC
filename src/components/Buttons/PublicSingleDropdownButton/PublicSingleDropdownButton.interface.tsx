export interface PublicSingleDropdownButtonPropsI {
  dropdownOptions: any[];
  disabled?: boolean;
  dropdownName?: string | JSX.Element;
  hasEndIcon?: boolean;
  btnVariant?: string;
  Variant?: any;
  menuSxProps?: any;
  [key: string]: any;
}

export type PublicSingleDropdownButtonCloseMenuI = () => void;

export interface PublicSingleDropdownOptionI {
  id: string | number;
  title: string;
  handleClick: (closeMenu: PublicSingleDropdownButtonCloseMenuI) => void;
  disabled?: boolean;
  titleSx?: { [key: string]: string | number };
}
