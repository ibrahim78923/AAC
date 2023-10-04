import { SelectChangeEvent } from '@mui/material';

export interface BadgeStatusInterface {
  onChange?: (e: SelectChangeEvent<string>) => void;
  options?: { label: string; value: string; color: string }[] | undefined;
  value?: string;
}
