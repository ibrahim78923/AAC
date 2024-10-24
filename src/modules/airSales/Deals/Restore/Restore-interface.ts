export interface RestoreFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  setRestoreFilter: (filter: { dateStart: string; dateEnd: string }) => void;
  setIsRestoreFilterDrawer: (isOpen: boolean) => void;
  restoreFilter: any;
}

export interface RestoreDeleteModalProps {
  open: boolean;
  onClose: () => void;
  updateRestoreLoading: boolean;
  handlePermanantDeleteRetore: () => void;
}
