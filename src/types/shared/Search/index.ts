export interface SearchPropsI {
  label: string;
  width: string;
  searchBy: boolean;
  setSearchBy: React.Dispatch<React.SetStateAction<boolean>> | string;
}
