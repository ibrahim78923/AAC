import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { style } from './PaidAds.style';
import { PlusIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';
import Audience from './Audience';
import Analyze from './Analyze';
import Manage from './Manage';
import Events from './Events';
import CreateAudience from './CreateAudience';

const PaidAds = () => {
  const theme = useTheme();
  return (
    <Card sx={{ p: '16px 24px' }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h3">Paid Ads</Typography>
          <Typography variant="body2">Manage your Ad Creation</Typography>
        </Box>
        <Box display="flex" gap={1} sx={style?.button(theme?.palette)}>
          <CreateAudience />
          <Button
            className="eventBtn small"
            variant="outlined"
            color="inherit"
            startIcon={<PlusIcon />}
          >
            Create Event
          </Button>
          <Button
            className="small"
            variant="contained"
            startIcon={<PlusIcon />}
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
    </Card>
  );
};

export default PaidAds;
