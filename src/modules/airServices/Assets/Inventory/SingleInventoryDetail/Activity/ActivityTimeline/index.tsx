import Typography from '@mui/material/Typography';
import { Box, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import { TIME_FORMAT } from '@/constants';
import { otherDateFormat, uiDateFormat } from '@/lib/date-time';

export const ActivityTimeline = ({ activityData }: any) => {
  const theme = useTheme();

  return (
    <>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.25}
        marginBottom={1.5}
      >
        <Box sx={{ flex: 0.15 }}>
          <Typography
            variant="body2"
            color="textPrimary"
            component={'span'}
            mr="0.625rem"
          >
            {uiDateFormat(activityData?.createdAt)}
          </Typography>
          <Typography variant="body2" color="textPrimary" component={'span'}>
            {otherDateFormat(activityData?.createdAt, TIME_FORMAT?.UI)}
          </Typography>
        </Box>
        <IconButton
          disabled
          color="primary"
          sx={{ border: `1px solid ${theme?.palette?.primary?.main}` }}
        ></IconButton>
        <Box sx={{ flex: 0.8, ml: 1 }}>
          <Typography
            variant="body2"
            color="primary"
            marginRight={0.3}
            component={'span'}
          >
            {activityData?.performedByName}
          </Typography>{' '}
          <Typography variant="body2" component={'span'}>
            has {activityData?.activityType}{' '}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            marginRight={0.3}
            component={'span'}
          >
            {' '}
            {activityData?.moduleName}
          </Typography>
          <Box>
            <Typography
              variant="body2"
              color="textPrimary"
              component={'span'}
              mr="0.625rem"
            >
              {uiDateFormat(activityData?.createdAt)}
            </Typography>
            <Typography variant="body2" color="textPrimary" component={'span'}>
              {otherDateFormat(activityData?.createdAt, TIME_FORMAT?.UI)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.3}
        marginBottom={1.5}
      >
        <Box flex={0.145}></Box>
        <Box></Box>
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
