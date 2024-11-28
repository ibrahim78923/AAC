import Typography from '@mui/material/Typography';
import { Box, Divider, useTheme } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { FiberManualRecord } from '@mui/icons-material';
import { otherDateFormat } from '@/lib/date-time';

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
        <Typography variant="body2" sx={{ flex: 0.15 }}>
          {otherDateFormat(activityData?.createdAt, DATE_TIME_FORMAT?.DDMYHMA)}
        </Typography>
        <Box mt={0.2}>
          <FiberManualRecord fontSize="small" color="primary" />
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
