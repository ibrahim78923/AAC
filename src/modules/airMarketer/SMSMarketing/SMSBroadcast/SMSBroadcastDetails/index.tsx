import { Box, Skeleton, Stack, Typography } from '@mui/material';
import CommonTabs from '@/components/Tabs';
import useSMSBroadcast from '../useSMSBroadcast';
import SMSDetails from './SMSDetails';
import Analytics from './Analytics';
import { styles } from './SMSBroadcastDetails.style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_MARKETER } from '@/routesConstants/paths';
import useSMSBroadcastDetails from './useSMSBroadcastDetails';
import { statusTag } from '@/utils';

const SMSBroadcastDetails = () => {
  const { navigate, theme } = useSMSBroadcast();
  const { smsBroadcastDetails, smsDetailsLoading } = useSMSBroadcastDetails();
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowBackIcon
            onClick={() => {
              navigate.push(AIR_MARKETER?.SMS_MARKETING);
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
            <Typography variant="body2">
              {smsBroadcastDetails?.status ?? 'N/A'}
            </Typography>
          </Box>
        )}
      </Stack>
      <CommonTabs tabsArray={['SMS Details', 'Analytics']}>
        <SMSDetails
          detailsData={smsBroadcastDetails}
          isLoading={smsDetailsLoading}
        />
        <Analytics
          analyticsData={smsBroadcastDetails}
          isLoading={smsDetailsLoading}
          isDashboard={false}
        />
      </CommonTabs>
    </>
  );
};

export default SMSBroadcastDetails;
