import { Box, Skeleton, Typography } from '@mui/material';
import CommonTabs from '@/components/Tabs';
import BroadcastDetailsTab from './BroadcastDetailsTab';
import AnalyticsTab from './AnalyticsTab';
import { styles } from './BroadcastDetails.style';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { statusTag } from '@/utils';
import useBroadcastDetails from './useBroadcastDetails';

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
            <Typography>{smsBroadcastDetails?.status}</Typography>
          </Box>
        )}
      </Box>
      <CommonTabs tabsArray={['Broadcast Details', 'Analytics']}>
        <BroadcastDetailsTab
          broadcastDetails={smsBroadcastDetails}
          isLoading={smsDetailsLoading}
          recordStatus={smsBroadcastDetails?.status}
        />
        <AnalyticsTab
          statisticsData={smsBroadcastDetails?.statisticsData}
          isLoading={smsDetailsLoading}
          isDashboardData={false}
        />
      </CommonTabs>
    </Box>
  );
};

export default BroadcastDetails;
