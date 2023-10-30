export interface DetailTaskDrawerI {
  isDrawerOpen: boolean;
  onClose: (isOpen: boolean) => void;
  taskDetail: any;
}
