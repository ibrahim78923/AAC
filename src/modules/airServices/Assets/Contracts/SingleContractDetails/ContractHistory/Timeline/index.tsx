import { CALENDAR_FORMAT, DATE_TIME_FORMAT } from '@/constants';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';

export const Timeline = ({ data, timelineIndex }: any) => {
  const theme = useTheme();
  return (
    <>
      {timelineIndex !== 0 && (
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
      )}
      <Box display={'flex'} flexWrap={'wrap'} gap={1.25}>
        <Typography variant="body4" sx={{ flex: 0.15 }} pt={1}>
          {dayjs(data?.startDate)?.format(DATE_TIME_FORMAT?.DDMYHMA)}
        </Typography>
        <Box>
          <IconButton
            disabled
            color="primary"
            sx={{ border: `1px solid ${theme?.palette?.primary?.main}` }}
          >
            <BorderColorIcon color="primary" />
          </IconButton>
        </Box>
        <Box sx={{ flex: 0.8 }}>
          {' '}
          <Typography
            variant="body2"
            fontWeight={600}
            color="primary"
            marginRight={0.3}
          >
            {data?.status}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {dayjs(data?.startDate, DATE_TIME_FORMAT?.DMY)
              ?.format(CALENDAR_FORMAT?.UI)
              .toUpperCase()}{' '}
            to{' '}
            {dayjs(data?.endDate, DATE_TIME_FORMAT?.DMY)
              ?.format(CALENDAR_FORMAT?.UI)
              ?.toUpperCase()}
          </Typography>
          <Box
            display={'flex'}
            marginY={'.4rem'}
            alignItems={'center'}
            gap={1.5}
          >
            <Button
              size="small"
              sx={{
                color: theme?.palette?.grey?.[600],
                background: theme?.palette?.primary?.light,
                fontSize: '0.8rem',
                fontWeight: 400,
                ':hover': {
                  background: theme?.palette?.primary?.light,
                },
              }}
            >
              Cost: {data?.cost}
            </Button>
            <Button
              size="small"
              sx={{
                color: theme?.palette?.grey?.[600],
                background: theme?.palette?.primary?.light,
                fontSize: '0.8rem',
                fontWeight: 400,
                ':hover': {
                  background: theme?.palette?.primary?.light,
                },
              }}
            >
              createdBy :{' '}
              {data?.performedBy?.firstName + ' ' + data?.performedBy?.lastName}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
