import React from 'react';
import {
  Box,
  Button,
  Card,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { style } from './forecast.style';
import { FilterrIcon, PlusIcon, RefreshTasksIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';

import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import DealStage from './DealStage';
import ForecastCategory from './ForecastCategory';
import Goals from './Goals';
import useForecast from './useforecast';
import GoalsFilterDrawer from './GoalsDrwaer';
import { setFilterValues } from '@/redux/slices/forecast/forecastSlice';
import { useDispatch } from 'react-redux';

const Forecast = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isFilterDrawer, setIsFilterDrawer } = useForecast();
  const dispatch = useDispatch();
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
          <Tooltip title={'Refresh Filter'}>
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={() => {
                dispatch(setFilterValues(''));
              }}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={() => setIsFilterDrawer(true)}
            startIcon={<FilterrIcon />}
            sx={{ border: `1px solid ${theme?.palette?.custom?.dark}` }}
          >
            Filter
          </Button>
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
      {isFilterDrawer && (
        <GoalsFilterDrawer
          isOpenDrawer={isFilterDrawer}
          onClose={() => setIsFilterDrawer(false)}
          setIsFilterDrawer={setIsFilterDrawer}
        />
      )}
    </Card>
  );
};

export default Forecast;
