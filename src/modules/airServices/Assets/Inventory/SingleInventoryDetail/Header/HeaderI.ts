export interface HeaderI {
  dropdownOptions: {
    id: number;
    title: string;
    permissionKey: string[];
    handleClick: (close: () => void) => void;
  }[];
  inventoryData: any;
  isFetching: boolean;
  isLoading: boolean;
}
