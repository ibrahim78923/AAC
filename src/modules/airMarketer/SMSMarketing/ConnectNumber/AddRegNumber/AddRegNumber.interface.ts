export interface AddRegNumberI {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onPhoneChange: any;
  phoneValue: string;
  isPhoneValid: boolean;
}
