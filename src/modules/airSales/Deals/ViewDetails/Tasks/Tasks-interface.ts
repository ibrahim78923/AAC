export interface TaskEditorDrawerProps {
  openDrawer: string;
  setOpenDrawer: (drawerState: string) => void;
  selectedRecId: string | number;
}

export interface ActionDropdownProps {
  setOpenDrawer: (drawerState: string) => void;
  selectedCheckboxes: any[];
  setSelectedCheckboxes: (checkboxes: any[]) => void;
  selectedRecId: any;
}
