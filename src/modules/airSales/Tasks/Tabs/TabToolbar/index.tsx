import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Tooltip,
  useTheme,
} from '@mui/material';
import EditColumn from '../../EditColumn';
import FilterComp from '../../Filter';
import ListGridViewBtn from '../../ListGridViewBtn';
import { RefreshTasksIcon } from '@/assets/icons';
import { styles } from './TabToobar.style';
import { useAppSelector } from '@/redux/store';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreateTask from '../../CreateTask';
import { menuItems } from './TabToolbar.data';

const TabToolbar = () => {
  const theme = useTheme();

  const [isCreateTaskDrawerOpen, setIsCreateTaskDrawerOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task?.selectedTaskIds,
  );

  const menuFunctionsToRender: any = {
    edit: () => {
      setIsCreateTaskDrawerOpen(true);
      handleClose();
    },
    viewActivity: () => alert('viewActivity'),
    changeStatus: () => alert('changeStatus'),
    delete: () => alert('delete'),
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
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>

          <Button
            className="small"
            color={'inherit'}
            variant={'outlined'}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleClick}
            disabled={selectedTaskIds?.length > 0 ? false : true}
            classes={{ outlined: 'outlined_btn' }}
            type="submit"
            sx={{
              borderColor: (selectedTaskIds?.length > 0 ? false : true)
                ? theme?.palette?.custom?.dark
                : '',
              width: { xs: '100%', sm: 'auto' },
              color: (selectedTaskIds?.length > 0 ? false : true)
                ? theme?.palette?.custom?.dark
                : '',
            }}
          >
            Action
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {menuItems?.map((item: any) => {
              const isAbleToEdit =
                selectedTaskIds?.length > 1 &&
                (item?.name === 'edit' || item?.name === 'viewActivity');
              return (
                <MenuItem
                  disabled={isAbleToEdit}
                  onClick={menuFunctionsToRender[item?.name]}
                  key={item?.item}
                >
                  {item?.item}
                </MenuItem>
              );
            })}
          </Popover>

          <EditColumn />
          <FilterComp />
          <ListGridViewBtn />

          <CreateTask
            isCreateTaskDrawerOpen={isCreateTaskDrawerOpen}
            setIsCreateTaskDrawerOpen={setIsCreateTaskDrawerOpen}
            creationMode={'edit'}
          />
        </Box>
      </Box>
    </>
  );
};

export default TabToolbar;
