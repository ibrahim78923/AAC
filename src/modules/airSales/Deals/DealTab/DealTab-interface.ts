export interface DealFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  setFilters: (filters: any) => void;
  filters: any;
}
