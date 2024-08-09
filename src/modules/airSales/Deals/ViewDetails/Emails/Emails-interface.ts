export interface EmailEditorDrawerProps {
  openDrawer: any;
  setOpenDrawer: (drawerState: string) => void;
}

export interface EmailActionDropDownProps {
  setOpenDrawer: (drawerState: string) => void;
  selectedCheckboxes: string[];
}
