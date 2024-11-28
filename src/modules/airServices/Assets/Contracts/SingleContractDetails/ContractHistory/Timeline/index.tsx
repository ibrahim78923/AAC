import { CALENDAR_FORMAT, DATE_TIME_FORMAT } from '@/constants';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import { otherDateFormat } from '@/lib/date-time';

export const Timeline = ({ data, timelineIndex }: any) => {
  const theme = useTheme();

  return (
    <>
      {timelineIndex !== 0 && (
        <Box display={'flex'} flexWrap={'wrap'} gap={1.3} marginBottom={1.5}>
          <Divider
            orientation="vertical"
            sx={{
              borderRadius: '20px',
              background: theme?.palette?.primary?.light,
              width: '4px',
              height: '49px',
            }}
          />
        </Box>
      )}
      <Box display={'flex'} flexWrap={'wrap'} gap={1.25}>
        <Typography variant="body4" sx={{ flex: 0.15 }} pt={1}>
          {otherDateFormat(data?.startDate, DATE_TIME_FORMAT?.DDMYHMA)}
        </Typography>
        <Box mt={0.2}>
          <FiberManualRecord fontSize="small" color="primary" />
        </Box>
        <Box sx={{ flex: 0.8 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            color="primary"
            marginRight={0.3}
          >
            {data?.activity}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {otherDateFormat(data?.startDate, CALENDAR_FORMAT?.UI)} to{' '}
            {otherDateFormat(data?.endDate, CALENDAR_FORMAT?.UI)}
          </Typography>
          <Box
            display={'flex'}
            marginY={'.4rem'}
            alignItems={'center'}
            gap={1.5}
          >
            <Button
              className="small"
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
              className="small"
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
              createdBy :
              {data?.performedBy?.firstName + ' ' + data?.performedBy?.lastName}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
