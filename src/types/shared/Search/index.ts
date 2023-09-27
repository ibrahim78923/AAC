export interface SearchPropsI {
  label: string;
  searchBy: boolean;
  setSearchBy: React.Dispatch<React.SetStateAction<boolean>> | string;
}
