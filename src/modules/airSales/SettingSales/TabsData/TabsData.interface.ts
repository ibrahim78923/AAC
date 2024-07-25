export interface CustomFieldProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  isEditMode: boolean;
  onSubmit: (data: any) => void;
  id: string[];
}
