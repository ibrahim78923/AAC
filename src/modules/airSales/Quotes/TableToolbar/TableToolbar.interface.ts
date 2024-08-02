export interface TableToolbarI {
  setSearchValue: (value: string) => void;
  handleFilters: () => void;
  handleCustomizeColumns: () => void;
  handleResetFilters: () => void;
  handleEditQuote: () => void;
  handleViewQuote: () => void;
  handleOpenDeleteQuote: () => void;
  isActionsDisabled: boolean;
  rowId: any;
}
