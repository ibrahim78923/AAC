import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';

import ActivityAndPerformance from '../ActivityAndPerformance';
import CreateTask from '../CreateTask';
import { PlusIcon, UmbrellaIcon } from '@/assets/icons';
import { RecycleIcon } from '@/assets/icons';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS } from '@/constants/permission-keys';
import useCreateTask from '../CreateTask/useCreateTask';
import { useAppDispatch } from '@/redux/store';
import {
  setCompaniesSelectedIds,
  setContactsSelectedIds,
  setDealsSelectedIds,
  setSelectedTaskIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';
import ImportTaskDrawer from './ImportTaskDrawer';
const TaskHeader = () => {
  const theme = useTheme();
  const [isCreateTaskDrawerOpen, setIsCreateTaskDrawerOpen] = useState(false);
  const [isOpenCollapsAndExpand, setIsOpenCollapsAndExpand] =
    useState<any>(false);
  const dispatch: any = useAppDispatch();
  const { reset } = useCreateTask({});

  const [isImportTask, setIsImportTask] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        padding: '16px 24px',
        gap: '15px',
      }}
    >
      <Typography
        sx={{
          flex: 1,
          fontSize: '24px',
          fontWeight: 600,
          color: theme?.palette?.grey[800],
          marginBottom: { xs: '16px', sm: 0 },
          width: { xs: '100%', sm: 'auto' },
          textAlign: { xs: 'start', sm: 'start', md: 'start', lg: 'start' },
        }}
      >
        Tasks
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '8px', sm: '8px' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <PermissionsGuard
          permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.IMPORT_TASK]}
        >
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            startIcon={<UmbrellaIcon />}
            onClick={() => setIsImportTask(true)}
          >
            Import
          </Button>
        </PermissionsGuard>
        <Button
          variant="contained"
          className="small"
          sx={{ background: theme?.palette?.secondary?.main }}
          onClick={() => setIsOpenCollapsAndExpand(true)}
        >
          <RecycleIcon />
        </Button>
        <ActivityAndPerformance
          setIsOpenCollapsAndExpand={setIsOpenCollapsAndExpand}
          isOpenCollapsAndExpand={isOpenCollapsAndExpand}
        />
        <PermissionsGuard
          permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.CRAETE_TASK]}
        >
          <Button
            onClick={() => {
              reset({});
              dispatch(setContactsSelectedIds([]));
              dispatch(setCompaniesSelectedIds([]));
              dispatch(setSelectedTaskIds([]));
              dispatch(setDealsSelectedIds([]));
              dispatch(setDealsSelectedIds([]));
              setIsCreateTaskDrawerOpen(true);
            }}
            className="small"
            variant="contained"
            startIcon={<PlusIcon />}
          >
            Create Task
          </Button>
        </PermissionsGuard>
        {isCreateTaskDrawerOpen && (
          <CreateTask
            isCreateTaskDrawerOpen={isCreateTaskDrawerOpen}
            setIsCreateTaskDrawerOpen={setIsCreateTaskDrawerOpen}
            creationMode={'create'}
          />
        )}
      </Box>

      <ImportTaskDrawer open={isImportTask} setIsImportTask={setIsImportTask} />
    </Box>
  );
};

export default TaskHeader;
