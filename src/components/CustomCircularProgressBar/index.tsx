import {
  Box,
  CircularProgress,
  Typography,
  circularProgressClasses,
} from '@mui/material';
import { CustomCircularProgressBarPropsI } from './CustomCircularProgressBar.interface';

export const CustomCircularProgressBar = (
  props: CustomCircularProgressBarPropsI,
) => {
  const {
    size = 50,
    thickness = 3,
    progressColor,
    value = 50,
    percentage = 50,
    ...others
  } = props;

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) => theme?.palette?.grey?.[200],
          }}
          size={size}
          thickness={thickness}
          {...others}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          size={size}
          thickness={thickness}
          {...others}
          value={percentage}
          sx={{
            color: progressColor,
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses?.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body4" color="slateBlue.main">{`${Math?.round(
            value,
          )}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
