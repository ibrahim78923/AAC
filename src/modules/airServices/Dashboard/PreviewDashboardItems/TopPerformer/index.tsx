import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import {
  CustomerWowChampionImage,
  DashboardAvatarImage,
  MostValuablePlayerImage,
} from '@/assets/images';
import { CardWrapper } from '../CardWrapper';

export const TopPerformer = () => {
  const progress = 10;
  return (
    <>
      <CardWrapper>
        <Box marginLeft={2} marginTop={2}>
          <Typography variant="h5">Top Performer</Typography>
        </Box>
        <Box display={'flex'} gap={2} marginLeft={2} marginTop={2}>
          <Avatar
            alt=""
            src={DashboardAvatarImage?.src}
            sx={{
              width: '2.625rem',
              height: '2.625rem',
            }}
          />
          <Box>
            <Typography color="grey.600" fontWeight={600} variant="body2">
              Alesha Rai
            </Typography>
            <Typography color="grey.600" variant="body3">
              IT Department
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} gap={2} marginLeft={2} marginTop={3}>
          <Typography color="grey.600" fontWeight={600} variant="body3">
            Beginner
          </Typography>
        </Box>
        <Box display={'flex'} gap={2} marginLeft={2}>
          <Typography color="grey.600" fontSize="0.663rem">
            Score + 2400 points to intermediate
          </Typography>
        </Box>
        <Box display={'flex'} gap={2} marginLeft={4} marginTop={1}>
          <Typography color="grey.600" fontWeight={600} variant="body3" mt={1}>
            {progress}%
          </Typography>
        </Box>
        <Box display={'flex'} gap={2} marginLeft={2} marginTop={1}>
          <LinearProgress
            value={progress}
            variant="determinate"
            sx={{ width: '62%' }}
          />
        </Box>
        <Box display={'flex'} gap={2} px={2} marginTop={3} marginBottom={3.7}>
          <Avatar
            alt=""
            src={CustomerWowChampionImage?.src}
            sx={{ width: '2.375rem', height: '2.721rem' }}
          />
          <Box>
            <Typography
              color="grey.600"
              fontWeight={600}
              variant="body3"
              mt={1}
            >
              Customer Wow
            </Typography>
            <Typography
              color="grey.600"
              fontWeight={600}
              variant="body3"
              mt={1}
            >
              Champion
            </Typography>
          </Box>

          <Avatar
            alt=""
            src={MostValuablePlayerImage?.src}
            sx={{ width: '2.375rem', height: '2.721rem' }}
          />
          <Box>
            <Typography
              color="grey.600"
              fontWeight={600}
              variant="body3"
              mt={1}
            >
              Most Valuable
            </Typography>
            <Typography
              color="grey.600"
              fontWeight={600}
              variant="body3"
              mt={1}
            >
              Player
            </Typography>
          </Box>
        </Box>
      </CardWrapper>
    </>
  );
};
