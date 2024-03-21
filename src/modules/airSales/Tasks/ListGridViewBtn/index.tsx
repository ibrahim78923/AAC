import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { GridViewIcon, ListViewIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setToggleTableView } from '@/redux/slices/taskManagement/taskManagementSlice';
import { AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const ListGridViewBtn = () => {
  const dispatch: any = useAppDispatch();

  const toggleTableView = useAppSelector(
    (state: any) => state?.task?.toggleTableView,
  );

  return (
    <ButtonGroup
      variant="outlined"
      aria-label="outlined button group"
      sx={{ minHeight: '36px' }}
    >
      <PermissionsGuard
        permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.LIST_VIEW]}
      >
        <Button
          color="inherit"
          className="small"
          onClick={() => dispatch(setToggleTableView('listView'))}
          sx={{
            '&:hover': { backgroundColor: '#F3F4F6' },
            backgroundColor: toggleTableView === 'listView' ? '#F3F4F6' : '',
          }}
        >
          <ListViewIcon />
        </Button>
      </PermissionsGuard>
      <PermissionsGuard
        permissions={[AIR_SALES_TASK_MANAGE_TASK_PERMISSIONS?.BOARD_VIEW]}
      >
        <Button
          color="inherit"
          className="small"
          onClick={() => dispatch(setToggleTableView('gridView'))}
          sx={{
            '&:hover': { backgroundColor: '#F3F4F6' },
            backgroundColor: toggleTableView === 'gridView' ? '#F3F4F6' : '',
          }}
        >
          <GridViewIcon />
        </Button>
      </PermissionsGuard>
    </ButtonGroup>
  );
};

export default ListGridViewBtn;
