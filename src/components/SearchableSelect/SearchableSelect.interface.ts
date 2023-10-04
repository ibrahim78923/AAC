export interface DropdownDataPropsI {
  [key: string]: any;
}
export interface SearchableSelectPropsI {
  dropdownData: DropdownDataPropsI[];
  renderOption: (option: DropdownDataPropsI) => React.ReactNode;
  setValue?: any;
  selectedValue?: string;
  name?: any;
  label?: string;
  control?: any;
  rules?: object;
  error?: any;
  width?: string;
  height?: string;
}
