export interface FilterInventoryI {
  inventoryFilterLists: { [key: string]: { [key: string]: any } };
  isDrawerOpen: boolean;
  setInventoryFilterLists: React.Dispatch<
    React.SetStateAction<{ [key: string]: { [key: string]: any } }>
  >;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
