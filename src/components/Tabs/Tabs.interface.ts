import { SearchPropsI } from '../Search/Search.interface';

export interface TabPanelPropsI {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CommonTabsPropsI {
  tabsArray?: string[];
  children?: React.ReactNode;
  isHeader?: boolean;
  headerChildren?: React.ReactNode;
  searchBarProps?: SearchPropsI;
  getTabVal?: ({}: number) => void;
}
