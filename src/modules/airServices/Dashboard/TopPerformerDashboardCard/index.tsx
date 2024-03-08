import { useState } from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';

export const TopPerformerDashboardCard = ({
  userImage,
  badgeImage,
  badgeNextImage,
  userImageText,
  userImageDescription,
  progressBarText,
  ProgressBarDescription,
  badgeText,
  badgeNextText,
}: any) => {
  const [progress] = useState(10);
  const theme: any = useTheme();

  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid ${theme?.palette?.grey?.[700]}`}
    >
      <Box>
        <Typography variant="h5">Top Performer</Typography>
      </Box>
      <Box display={'flex'} gap={2} marginTop={2}>
        <Avatar
          alt=""
          src={userImage?.src}
          sx={{
            width: '2.625rem',
            height: '2.625rem',
          }}
        />
        <Box>
          <Typography variant="body1" color={'grey.600'}>
            {userImageText}
          </Typography>
          <Typography variant="body1">{userImageDescription}</Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={2} marginTop={3}>
        <Typography variant="body1" color={'grey.600'}>
          {progressBarText}
        </Typography>
      </Box>
      <Box display={'flex'} gap={2}>
        <Typography variant="body1">{ProgressBarDescription}</Typography>
      </Box>
      <Box display={'flex'} gap={2} marginLeft={4} marginTop={1}>
        <Typography variant="body1">{progress}%</Typography>
      </Box>
      <Box display={'flex'} gap={2} marginTop={1}>
        <LinearProgress
          value={progress}
          variant="determinate"
          sx={{ width: '62%' }}
        />
      </Box>

      <Grid container spacing={2} mt={4.4}>
        <Grid item xs={12} sm={6} md={6}>
          <Box display={'flex'} gap={1.5} flexWrap={'wrap'}>
            <Avatar
              alt=""
              src={badgeImage?.src}
              sx={{ width: '2.375rem', height: '2.721rem' }}
            />
            <Typography sx={{ flex: 1 }}>{badgeText}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box display={'flex'} gap={1.5} flexWrap={'wrap'}>
            <Avatar
              alt=""
              src={badgeNextImage?.src}
              sx={{ width: '2.375rem', height: '2.721rem' }}
            />
            <Typography sx={{ flex: 1 }}>{badgeNextText}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
