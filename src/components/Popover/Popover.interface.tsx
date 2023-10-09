export interface PopoverPropsI {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  children?: any;
  disabled?: boolean;
  btnText: any;
  label: string;
  onClick: () => void;
  options?: string[];
  sx?: React.CSSProperties;
  endIcon?: React.ReactNode;
}
