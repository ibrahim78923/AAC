import Typography from '@mui/material/Typography';
import { Box, Divider, useTheme } from '@mui/material';
import { DATE_FORMAT } from '@/constants';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import dayjs from 'dayjs';

export const ActivityTimeline = ({ activityData }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box
        key={activityData?._id}
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.25}
        marginBottom={1.5}
      >
        <Typography variant="body3" sx={{ flex: 0.15 }}>
          {dayjs(activityData?.createdAt)?.format(DATE_FORMAT?.UI)}
        </Typography>
        <Box mt={0.2}>
          <PanoramaFishEyeIcon color="primary" fontSize="small" />
        </Box>
        <Typography
          variant="body2"
          sx={{ flex: 0.8 }}
          textTransform={'capitalize'}
        >
          <Typography variant="body2" color="primary" marginRight={0.3}>
            {activityData?.moduleName?.toLowerCase()}{' '}
            {activityData?.module?.toLowerCase()}
          </Typography>
          {activityData?.activityType?.toLowerCase()} by{' '}
          {activityData?.performedByName?.toLowerCase()}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.3}
        marginBottom={1.5}
        ml={0.7}
      >
        <Box flex={0.15}></Box>
        <Divider
          orientation="vertical"
          sx={{
            borderRadius: '20px',
            background: theme?.palette?.primary?.light,
            width: '4px',
            height: '49px',
          }}
        />
        <Box flex={0.8}></Box>
      </Box>
    </>
  );
};
