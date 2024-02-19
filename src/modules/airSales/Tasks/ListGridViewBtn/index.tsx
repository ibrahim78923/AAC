import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { GridViewIcon, ListViewIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setToggleTableView } from '@/redux/slices/taskManagement/taskManagementSlice';

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
    </ButtonGroup>
  );
};

export default ListGridViewBtn;
