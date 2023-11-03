import { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './TopPerformerDashboardCard.styles';
import LinearProgress from '@mui/material/LinearProgress';

export const TopPerformerDashboardCard = ({
  icon,
  iconOne,
  iconTwo,
  topPerformanceText,
  topPerformanceTextOne,
  topPerformanceTextTwo,
  topPerformanceTextThree,
  topPerformanceTextFour,
  topPerformanceTextFive,
  topPerformanceTextSix,
  topPerformanceTextSeven,
}: any) => {
  const [progress] = useState(10);
  const theme = useTheme();
  return (
    <>
      <Box sx={styles?.boxMain(theme)}>
        <Box sx={{ marginLeft: 2, marginTop: 2 }}>
          <Typography variant="h5">Top Performer</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2, marginTop: 2 }}>
          <Avatar
            alt=""
            src={icon?.src}
            sx={{
              width: '2.625rem',
              height: '2.625rem',
            }}
          />
          <Box>
            <Typography sx={styles?.topPerformaceText(theme)}>
              {topPerformanceText}
            </Typography>
            <Typography sx={styles?.topPerformaceTextOne(theme)}>
              {topPerformanceTextOne}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2, marginTop: 3 }}>
          <Typography sx={styles?.topPerformaceTextTwo(theme)}>
            {topPerformanceTextTwo}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2 }}>
          <Typography sx={styles?.topPerformaceTextThree}>
            {topPerformanceTextThree}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 4, marginTop: 1 }}>
          <Typography sx={styles?.topPerformaceProgressBar(theme)}>
            {progress}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2, marginTop: 1 }}>
          <LinearProgress
            value={progress}
            variant="determinate"
            sx={{ width: '62%' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            px: 2,
            marginTop: 3,
            marginBottom: 4,
          }}
        >
          <Avatar
            alt=""
            src={iconOne?.src}
            sx={{ width: '2.375rem', height: '2.721rem' }}
          />
          <Box>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topPerformanceTextFour}
            </Typography>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topPerformanceTextFive}
            </Typography>
          </Box>

          <Avatar
            alt=""
            src={iconTwo?.src}
            sx={{ width: '2.375rem', height: '2.721rem' }}
          />
          <Box>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topPerformanceTextSix}
            </Typography>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topPerformanceTextSeven}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
