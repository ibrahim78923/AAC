export interface NotesEditorDrawerProps {
  openDrawer: any;
  setOpenDrawer: (drawerState: string) => void;
  setSelectedCheckboxes: (checkboxes: string[]) => void;
  selectedCheckboxes: string[];
  recordId: string;
}

export interface NotesActionDropdownProps {
  setOpenDrawer: (drawerState: string) => void;
  selectedCheckboxes: string[];
  setSelectedCheckboxes: (checkboxes: string[]) => void;
}
