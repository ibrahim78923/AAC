export interface SearchPropsI {
  label?: string;
  searchBy?: string;
  setSearchBy?: any;
  width?: string | number;
  onChange?: () => void;
  value: string;
  rest?: any;
}
