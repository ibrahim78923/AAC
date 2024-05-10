import React from 'react';
import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { style } from './forecast.style';
import { PlusIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';
// import Audience from './Audience';
// import Analyze from './Analyze';
// import Manage from './Manage';
// import Events from './Events';
// import CreateAudience from './CreateAudience';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
// import useForecast from './useforecast';
import DealStage from './DealStage';
// import CreateEvent from './CreateEvent';

const Forecast = () => {
  const theme = useTheme();
  const router = useRouter();
  // const { isOpenEventDrawer, setIsOpenEventDrawer } = useForecast();
  return (
    <Card sx={{ p: '16px 24px' }}>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        gap={2}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h3">Forecast</Typography>
        </Box>
        <Box
          display="flex"
          gap={1}
          sx={style?.button(theme?.palette)}
          flexWrap="wrap"
        >
          <Button
            className="small"
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => router.push(AIR_MARKETER?.CREATE_AD)}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Create Goal
          </Button>
        </Box>
      </Stack>
      <Box>
        <CommonTabs tabsArray={['Deal Stage', 'Forecast Category', 'Goals']}>
          <DealStage />
          {/*<Audience />
        <Events />
        <Analyze /> */}
        </CommonTabs>
      </Box>
      {/* {isOpenEventDrawer && (
      <CreateEvent
        isDrawerOpen={isOpenEventDrawer}
        onClose={() => {
          setIsOpenEventDrawer(false);
        }}
      />
    )} */}
    </Card>
  );
};

export default Forecast;
