// quotes filter interface
export interface FilterQuotesI {
  open: boolean;
  onClose: () => void;
  methods: any;
  onFilterSubmit: () => void;
}
// quotes customize columns interface
export interface CustomizeColumnsI {
  open: boolean;
  onClose: () => void;
}
