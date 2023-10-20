import React from 'react';
import { Button, ButtonGroup, useTheme } from '@mui/material';
import { RecycleIcon } from '@/assets/icons';
import DrawerComp from '../Drawer';
import Insights from './Insight';
import Feed from './Feed';
import { useTask } from '../useTask';

const ActivityAndPerformance = () => {
  const theme = useTheme();
  const { counter, handleInsightsBtnClick, handleFeedBtnClick } = useTask();
  return (
    <DrawerComp title="" btnVariant="contained" btnIcon={<RecycleIcon />}>
      <ButtonGroup size="small" sx={{ mb: '24px' }}>
        <Button
          onClick={handleInsightsBtnClick}
          sx={{
            background: counter === 0 ? theme.palette.grey[400] : '',
          }}
        >
          Insights
        </Button>
        <Button
          onClick={handleFeedBtnClick}
          sx={{
            background: counter === 1 ? theme.palette.grey[400] : '',
          }}
        >
          Feed
        </Button>
      </ButtonGroup>
      {counter === 0 && <Insights />}
      {counter === 1 && <Feed />}
    </DrawerComp>
  );
};

export default ActivityAndPerformance;
