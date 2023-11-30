import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { style } from './PaidAds.style';
import { PlusIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';
import Audience from './Audience';
import Analyze from './Analyze';
import Manage from './Manage';
import Events from './Events';
import CreateAudience from './CreateAudience';
import CreateEvent from './CreateEvent';
import usePaidAds from './usePaidAds';

const PaidAds = () => {
  const { isOpenEventDrawer, setIsOpenEventDrawer, theme } = usePaidAds();
  return (
    <Box>
      <Card sx={{ p: '16px 24px' }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h3">Paid Ads</Typography>
          <Box display="flex" gap={1} sx={style?.button(theme?.palette)}>
            <CreateAudience />
            <Button
              className="eventBtn"
              variant="outlined"
              startIcon={<PlusIcon />}
              onClick={() => setIsOpenEventDrawer(true)}
            >
              Create Event
            </Button>
            <Button variant="contained" startIcon={<PlusIcon />}>
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
      </Card>
      {isOpenEventDrawer && (
        <CreateEvent
          isDrawerOpen={isOpenEventDrawer}
          onClose={() => {
            setIsOpenEventDrawer(false);
          }}
        />
      )}
    </Box>
  );
};

export default PaidAds;
