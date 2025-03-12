import { LINEAR_PROGRESS_VARIANTS } from '@/constants/mui-constant';
import { pxToRem } from '@/utils/getFontValue';
import { LinearProgress } from '@mui/material';

export const CustomLinearProgress = (props: any) => {
  const {
    variant = LINEAR_PROGRESS_VARIANTS?.IN_DETERMINATE,
    backgroundBarColor = 'grey.0',
    progressBarColor = 'primary.main',
    value = 100,
    width = variant === LINEAR_PROGRESS_VARIANTS?.DETERMINATE
      ? '100%'
      : pxToRem(70),
    height = pxToRem(5),
    customStyles,
    progressBarLabel = `linear-progress-bar-${variant}`,
  } = props;

  return (
    <LinearProgress
      aria-label={progressBarLabel}
      variant={variant}
      value={value}
      sx={{
        width,
        borderRadius: 3,
        height,
        '&.MuiLinearProgress-root': { backgroundColor: backgroundBarColor },
        '& .MuiLinearProgress-bar': {
          backgroundColor: progressBarColor,
        },
        ...customStyles,
      }}
    />
  );
};
