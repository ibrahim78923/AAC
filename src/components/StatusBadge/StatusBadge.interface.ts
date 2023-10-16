import { SelectChangeEvent } from '@mui/material';

export interface BadgeStatusI {
  onChange?: (e: SelectChangeEvent<string>) => void;
  options?: { label: string; value: string; color: string }[] | undefined;
  value?: string;
}
