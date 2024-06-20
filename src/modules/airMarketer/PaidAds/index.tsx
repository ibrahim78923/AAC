import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { style } from './PaidAds.style';
import { PlusIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';
import Audience from './Audience';
import Analyze from './Analyze';
import Manage from './Manage';
import Events from './Events';
import CreateAudience from './CreateAudience';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import usePaidAds from './usePaidAds';
import CreateEvent from './CreateEvent';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_MARKETER_PAID_ADS_CREATE_ADS_PERMISSIONS,
  AIR_MARKETER_PAID_ADS_PERMISSIONS,
} from '@/constants/permission-keys';

const PaidAds = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isOpenEventDrawer, setIsOpenEventDrawer } = usePaidAds();
  return (
    <Card sx={{ p: '16px 24px' }}>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        gap={2}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h3">Paid Ads</Typography>
          <Typography variant="body2" color={theme?.palette?.custom?.main}>
            Manage your Ad Creation
          </Typography>
        </Box>
        <Box
          display="flex"
          gap={1}
          sx={style?.button(theme?.palette)}
          flexWrap="wrap"
        >
          <CreateAudience />
          <PermissionsGuard
            permissions={[AIR_MARKETER_PAID_ADS_PERMISSIONS?.CREATE_EVENT]}
          >
            <Button
              className="eventBtn small"
              variant="outlined"
              color="inherit"
              startIcon={<PlusIcon />}
              onClick={() => {
                setIsOpenEventDrawer(true);
              }}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Create Event
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_PAID_ADS_CREATE_ADS_PERMISSIONS?.CREATE_AD_CAMPAIGN,
            ]}
          >
            <Button
              className="small"
              variant="contained"
              startIcon={<PlusIcon />}
              onClick={() => router.push(AIR_MARKETER?.CREATE_AD)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Create Ad
            </Button>
          </PermissionsGuard>
        </Box>
      </Stack>
      <Box>
        <CommonTabs tabsArray={['Manage', 'Audiences', 'Events', 'Analyze']}>
          <PermissionsGuard
            permissions={[AIR_MARKETER_PAID_ADS_PERMISSIONS?.MANAGE_ADS]}
          >
            <Manage />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_PAID_ADS_PERMISSIONS?.AUDIENCE_LIST]}
          >
            <Audience />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_PAID_ADS_PERMISSIONS?.EVENTS_LIST]}
          >
            <Events />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_PAID_ADS_PERMISSIONS?.ANALYZE_ADS]}
          >
            <Analyze />
          </PermissionsGuard>
        </CommonTabs>
      </Box>
      {isOpenEventDrawer && (
        <CreateEvent
          isDrawerOpen={isOpenEventDrawer}
          onClose={() => {
            setIsOpenEventDrawer(false);
          }}
        />
      )}
    </Card>
  );
};

export default PaidAds;
