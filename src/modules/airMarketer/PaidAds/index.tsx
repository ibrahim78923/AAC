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

const PaidAds = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isOpenEventDrawer, setIsOpenEventDrawer } = usePaidAds();
  return (
    <Card sx={{ p: '16px 24px' }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h3">Paid Ads</Typography>
          <Typography variant="body2" color={theme?.palette?.custom?.main}>
            Manage your Ad Creation
          </Typography>
        </Box>
        <Box display="flex" gap={1} sx={style?.button(theme?.palette)}>
          <CreateAudience />
          <Button
            className="eventBtn small"
            variant="outlined"
            color="inherit"
            startIcon={<PlusIcon />}
            onClick={() => {
              setIsOpenEventDrawer(true);
            }}
          >
            Create Event
          </Button>
          <Button
            className="small"
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => router.push(AIR_MARKETER?.CREATE_AD)}
          >
            Create Ad
          </Button>
        </Box>
      </Stack>
      <Box>
        <CommonTabs tabsArray={['Manage', 'Audiences', 'Events', 'Analyze']}>
          <Manage />
          <Audience />
          <Events />
          <Analyze />
        </CommonTabs>
      </Box>
      {/* {isAudience && <CreateAudience />} */}
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
