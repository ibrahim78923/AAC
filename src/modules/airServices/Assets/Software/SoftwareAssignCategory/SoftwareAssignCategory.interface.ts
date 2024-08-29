export interface SoftwareAssignCategoryI {
  openAssignModal: boolean;
  selectedSoftware: string[];
  setOpenAssignModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSoftwareData: React.Dispatch<React.SetStateAction<string[]>>;
}
