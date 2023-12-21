import React, { useState } from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import ActionBtn from '../../ActionBtn';
import EditColumn from '../../EditColumn';
import FilterComp from '../../Filter';
import ListGridViewBtn from '../../ListGridViewBtn';
import { RefreshTasksIcon } from '@/assets/icons';
import { FilterWrapperI } from './TabToolbar.Interface';
import { styles } from './TabToobar.style';
import CreateTask from '../../CreateTask';
import { MenuItems } from '../../ActionBtn/ActionBtn.data';

const TabToolbar = ({
  handleToggler = () => {},
  handleRefreshList = () => {},
  disableActionBtn,
}: FilterWrapperI) => {
  const [isEditAction, setIsEditAction] = useState(false);

  const handleActionBtn = (item: any) => {
    if (item === 'edit') {
      setIsEditAction(!isEditAction);
    }
  };

  return (
    <>
      <Box sx={styles?.filterWrapper}>
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'8px'}
          flexWrap={'wrap'}
        >
          <Tooltip title={'Refresh Filter'}>
            <Button
              color="inherit"
              className="small"
              variant="outlined"
              onClick={handleRefreshList}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <ActionBtn
            disableActionBtn={disableActionBtn}
            onChange={handleActionBtn}
            menuItems={MenuItems}
            title="Actions"
          />
          <EditColumn />
          <FilterComp />
          <ListGridViewBtn onClick={handleToggler} />
        </Box>
      </Box>
      {isEditAction && <CreateTask title={'Edit Task'} />}
    </>
  );
};

export default TabToolbar;
