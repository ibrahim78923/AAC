import { SearchPropsI } from '../Search/Search.interface';

export interface TabPanelPropsI {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CommonTabsPropsI {
  tabStyle?: 'horizontal' | 'vertical';
  tabsArray?: string[];
  children?: React.ReactNode;
  isHeader?: boolean;
  headerChildren?: React.ReactNode;
  searchBarProps?: SearchPropsI;
  getTabVal?: ({}: number) => void;
}
