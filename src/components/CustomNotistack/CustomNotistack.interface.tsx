export interface CustomSnackbarProps {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info'; // Variant based on button type
  startIcon?: React.ReactElement | null; // Optional start icon element
}
