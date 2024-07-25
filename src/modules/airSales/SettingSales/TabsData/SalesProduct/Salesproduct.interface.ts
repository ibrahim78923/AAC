export interface SalesEditorDrawerProps {
  isDraweropen: boolean;
  isEditMode: boolean;
  handleCloseDrawer: () => void;
  setIsDraweropen: (value: boolean) => void;
  setSelectedCheckboxes: (value: string[]) => void;
  selectedCheckboxes: string[];
}

export interface UseSalesEditorDrawerProps {
  selectedCheckboxes?: string[];
  isEditMode?: boolean;
  setSelectedCheckboxes?: (value: string[] | any) => void;
  setIsDraweropen?: (value: boolean) => void;
}
