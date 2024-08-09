export interface TaskEditorDrawerProps {
  openDrawer: string;
  setOpenDrawer: (drawerState: string) => void;
  selectedCheckboxes: string[];
  setSelectedCheckboxes: (checkboxes: string[]) => void;
  selectedRecId: string | number;
  taskData: any;
}

export interface ActionDropdownProps {
  setOpenDrawer: (drawerState: string) => void;
  selectedCheckboxes: any[];
  setSelectedCheckboxes: (checkboxes: any[]) => void;
  selectedRecId: any;
}
