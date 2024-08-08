export interface RestoreFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  setRestoreFilter: (filter: { dateStart: string; dateEnd: string }) => void;
  setIsRestoreFilterDrawer: (isOpen: boolean) => void;
}

export interface RestoreDeleteModalProps {
  open: boolean;
  onClose: () => void;
  handlePermanantDeleteRetore: () => void;
}
