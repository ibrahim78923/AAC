export interface LayoutI {
  window?: () => Window;
  children: React.ReactNode;
}

export interface LinkCheckedItemsI {
  [key: string]: boolean;
}
