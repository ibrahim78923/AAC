import { SearchPropsI } from '../../types/shared/Search';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CommonTabsProps {
  tabsArray?: string[];
  children?: React.ReactNode;
  isHeader?: boolean;
  headerChildren?: React.ReactNode;
  searchBarProps?: SearchPropsI;
  getTabVal?: ({}: number) => void;
}
