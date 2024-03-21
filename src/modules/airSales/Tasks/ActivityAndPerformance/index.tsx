import React from 'react';
import { Button, ButtonGroup, useTheme } from '@mui/material';
import { RecycleIcon } from '@/assets/icons';
import DrawerComp from '../Drawer';
import Insights from './Insight';
import Feed from './Feed';
import { useTask } from '../useTask';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS } from '@/constants/permission-keys';

const ActivityAndPerformance = () => {
  const theme = useTheme();
  const { counter, handleInsightsBtnClick, handleFeedBtnClick } = useTask();
  return (
    <DrawerComp
      title=""
      color="secondary"
      btnVariant="contained"
      btnIcon={<RecycleIcon />}
    >
      <ButtonGroup size="small" sx={{ mb: '24px' }}>
        <PermissionsGuard
          permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.VIEW_INSIGHT]}
        >
          <Button
            onClick={handleInsightsBtnClick}
            sx={{
              background: counter === 0 ? theme?.palette?.grey[400] : '',
            }}
            color="inherit"
            size="small"
          >
            Insights
          </Button>
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.VIEW_FEEDS]}
        >
          <Button
            onClick={handleFeedBtnClick}
            sx={{
              background: counter === 1 ? theme?.palette?.grey[400] : '',
            }}
            color="inherit"
            size="small"
          >
            Feed
          </Button>
        </PermissionsGuard>
      </ButtonGroup>
      {counter === 0 && <Insights />}
      {counter === 1 && <Feed />}
    </DrawerComp>
  );
};

export default ActivityAndPerformance;
