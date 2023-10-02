export interface SuperAdminLayoutI {
  window?: () => Window;
  children: React.ReactNode;
}

export interface LinkCheckedItemsI {
  [key: string]: boolean;
}
