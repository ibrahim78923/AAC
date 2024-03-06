export interface OTPVerificationI {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
