export interface DeleteInventoryI {
  deleteModalOpen: boolean;
  getInventoryListData?: (page?: number) => Promise<void>;
  page?: number;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInventoryLists?: string[];
  setPage?: React.Dispatch<React.SetStateAction<number | undefined>>;
  totalRecords?: number;
  setSelectedInventoryLists?: React.Dispatch<React.SetStateAction<string[]>>;
  isMoveBack?: boolean;
}
