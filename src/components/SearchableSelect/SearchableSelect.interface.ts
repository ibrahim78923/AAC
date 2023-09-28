export interface DropdownDataPropsI {
  [key: string]: any;
}
export interface SearchableSelectPropsI {
  dropdownData: DropdownDataPropsI[];
  renderOption: (option: DropdownDataPropsI) => React.ReactNode;
  setValue?: any;
  selectedValue?: string;
}
