import { Box, Skeleton, Typography } from '@mui/material';
import BroadcastDetailsTab from './BroadcastDetailsTab';
import { styles } from './BroadcastDetails.style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { statusTag } from '@/utils';
import useBroadcastDetails from './useBroadcastDetails';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';

const BroadcastDetails = () => {
  const { navigate, theme, smsDetailsLoading, smsBroadcastDetails } =
    useBroadcastDetails();

  return (
    <Box sx={styles?.wrapper}>
      <Box sx={styles?.pageHeader}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowBackIcon
            onClick={() => {
              navigate?.push(AIR_MARKETER?.WHATSAPP_MERKETING);
            }}
            sx={{ cursor: 'pointer' }}
          />
          {smsDetailsLoading ? (
            <Skeleton width={200} height={45} />
          ) : (
            <Typography variant="h3">
              {smsBroadcastDetails?.name ?? 'N/A'}
            </Typography>
          )}
        </Box>
        {smsDetailsLoading ? (
          <Skeleton width={200} height={45} />
        ) : (
          <Box sx={styles?.cardHeader}>
            <Box
              sx={{
                width: '10px',
                height: '10px',
                backgroundColor: `${statusTag(
                  smsBroadcastDetails?.status,
                  theme,
                )}`,
                borderRadius: '50%',
              }}
            />
            <Box>
              <Typography>{smsBroadcastDetails?.status}</Typography>
              <Typography variant="body2">
                {dayjs(smsBroadcastDetails?.schedualDate)?.format(
                  DATE_FORMAT?.API,
                )}
                &nbsp;&nbsp;
                {dayjs(smsBroadcastDetails?.schedualDate)?.format(
                  TIME_FORMAT?.API,
                )}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      <BroadcastDetailsTab
        broadcastDetails={smsBroadcastDetails}
        isLoading={smsDetailsLoading}
        recordStatus={smsBroadcastDetails?.status}
      />
    </Box>
  );
};

export default BroadcastDetails;
