import { CIRCULAR_PROGRESS_VARIANTS } from '@/constants/mui-constant';
import { pxToRem } from '@/utils/getFontValue';
import { CircularProgress } from '@mui/material';

export const CustomCircularProgress = (props: any) => {
  const {
    variant = CIRCULAR_PROGRESS_VARIANTS?.IN_DETERMINATE,
    thickness = 3.6,
    value = 0,
    size = pxToRem(20),
    progressBarColor = 'primary.main',
    color = 'primary',
    disableShrink = false,
  } = props;

  return (
    <CircularProgress
      disableShrink={disableShrink}
      variant={variant}
      color={color}
      sx={{
        color: progressBarColor,
      }}
      size={size}
      thickness={thickness}
      value={value}
    />
  );
};
