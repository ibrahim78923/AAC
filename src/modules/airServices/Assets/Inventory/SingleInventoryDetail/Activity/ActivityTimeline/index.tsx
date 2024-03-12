import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';

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
        <Typography variant="body3" sx={{ flex: 0.15 }}>
          {activityData?.createdAt}
        </Typography>
        <IconButton
          disabled
          color="primary"
          sx={{ border: `1px solid ${theme?.palette?.primary?.main}` }}
        >
          <BorderColorIcon color="primary" />
        </IconButton>
        <Typography variant="body2" sx={{ flex: 0.8, ml: 1 }}>
          <Typography
            variant="body2"
            color="primary"
            marginRight={0.3}
            component={'span'}
          >
            {activityData?.performedByName}
          </Typography>{' '}
          has {activityData?.activityType}{' '}
          <Typography
            variant="body2"
            color="primary"
            marginRight={0.3}
            component={'span'}
          >
            {' '}
            {activityData?.moduleName}
          </Typography>{' '}
          <Box>
            <Typography
              variant="body2"
              color="textPrimary"
              component={'span'}
              mr="0.625rem"
            >
              {dayjs(activityData?.createdAt)?.format(DATE_FORMAT?.UI)}
            </Typography>
            <Typography variant="body2" color="textPrimary" component={'span'}>
              {dayjs(activityData?.createdAt)?.format(TIME_FORMAT?.UI)}
            </Typography>
          </Box>
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.3}
        marginBottom={1.5}
      >
        <Box flex={0.15}></Box>
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
