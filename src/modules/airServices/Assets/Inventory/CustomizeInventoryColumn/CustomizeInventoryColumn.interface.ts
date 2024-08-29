export interface CustomizeInventoryColumnI {
  inventoryListsColumns: string[];
  inventoryListsColumnsPersist: any[];
  isCustomizeModalOpen: boolean;
  setInventoryListsColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedInventoryLists: React.Dispatch<React.SetStateAction<string[]>>;
}
