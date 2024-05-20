import React from 'react';
import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
import { style } from './forecast.style';
import { PlusIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';

import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import DealStage from './DealStage';
import ForecastCategory from './ForecastCategory';
import Goals from './Goals';

const Forecast = () => {
  const theme = useTheme();
  const router = useRouter();

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
            onClick={() => router.push(AIR_SALES?.CREATE_GOALS)}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Create Goal
          </Button>
        </Box>
      </Stack>
      <Box>
        <CommonTabs tabsArray={['Deal Stage', 'Forecast Category', 'Goals']}>
          <DealStage />
          <ForecastCategory />
          <Goals />
        </CommonTabs>
      </Box>
    </Card>
  );
};

export default Forecast;
