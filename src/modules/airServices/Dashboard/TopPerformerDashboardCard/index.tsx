import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { styles } from './TopPerformerDashboardCard.styles';
import LinearProgress from '@mui/material/LinearProgress';

export const TopPerformerDashboardCard = ({
  icon,
  iconone,
  icontwo,
  topperformancetext,
  topperformancetextone,
  topperformancetexttwo,
  topperformancetextthree,
  topperformancetextfour,
  topperformancetextfive,
  topperformancetextsix,
  topperformancetextseven,
}: any) => {
  const [progress] = useState(10);
  return (
    <>
      <Box sx={styles?.boxMain}>
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
            <Typography sx={styles?.topPerformaceText}>
              {topperformancetext}
            </Typography>
            <Typography sx={styles?.topPerformaceTextOne}>
              {topperformancetextone}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2, marginTop: 3 }}>
          <Typography sx={styles?.topPerformaceTextTwo}>
            {topperformancetexttwo}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 2 }}>
          <Typography sx={styles?.topPerformaceTextThree}>
            {topperformancetextthree}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, marginLeft: 4, marginTop: 1 }}>
          <Typography sx={styles?.topPerformaceProgressBar}>
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
            marginLeft: 2,
            marginTop: 3,
            marginBottom: 4,
          }}
        >
          <Avatar
            alt=""
            src={iconone?.src}
            sx={{ width: '2.375rem', height: '2.721rem' }}
          />
          <Box>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topperformancetextfour}
            </Typography>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topperformancetextfive}
            </Typography>
          </Box>

          <Avatar
            alt=""
            src={icontwo?.src}
            sx={{ width: '2.375rem', height: '2.721rem' }}
          />
          <Box>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topperformancetextsix}
            </Typography>
            <Typography sx={styles?.topPerformaceTextFour}>
              {topperformancetextseven}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
