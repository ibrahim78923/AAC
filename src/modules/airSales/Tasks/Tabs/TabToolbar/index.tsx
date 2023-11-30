import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';
import ActionBtn from '../../ActionBtn';
import EditColumn from '../../EditColumn';
import FilterComp from '../../Filter';
import ListGridViewBtn from '../../ListGridViewBtn';
import { RefreshTasksIcon } from '@/assets/icons';
import { FilterWrapperI } from './TabToolbar.Interface';
import { styles } from './TabToobar.style';

const TabToolbar = ({
  handleActionBtn = () => {},
  handleToggler = () => {},
  handleRefreshList = () => {},
  disableActionBtn,
}: FilterWrapperI) => {
  return (
    <Box sx={styles.filterWrapper}>
      <Box display={'flex'} alignItems={'center'} gap={'8px'} flexWrap={'wrap'}>
        <Tooltip title={'Refresh Filter'}>
          <Button variant="outlined" onClick={handleRefreshList}>
            <RefreshTasksIcon />
          </Button>
        </Tooltip>
        <ActionBtn
          disableActionBtn={disableActionBtn}
          onChange={handleActionBtn}
        />
        <EditColumn />
        <FilterComp />
        <ListGridViewBtn onClick={handleToggler} />
      </Box>
    </Box>
  );
};

export default TabToolbar;
