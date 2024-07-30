export interface TaskViewCardI {
  setSelectedRec: (value: string[]) => void;
  selectedRec: string[];
  loading: boolean;
  data: any;
}
