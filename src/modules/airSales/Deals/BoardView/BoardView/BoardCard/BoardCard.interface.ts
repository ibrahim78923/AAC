import { SxProps } from '@mui/material';

export interface BoardCardI {
  dealStage?: string;
  stageDealsNumber?: number;
  stageDealsAmount?: number;
  stageDealsPercent?: number;
  children?: React.ReactNode;
  sx?: SxProps;
  title?: string;
}
