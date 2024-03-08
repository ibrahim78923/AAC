import React, { useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Tooltip,
  useTheme,
} from '@mui/material';
import CommonModal from '@/components/CommonModal';
import EditColumn from '../../EditColumn';
import FilterComp from '../../Filter';
import ListGridViewBtn from '../../ListGridViewBtn';

import { RefreshTasksIcon } from '@/assets/icons';
import { FilterIcon } from '@/assets/icons';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CreateTask from '../../CreateTask';
import { menuItems, statusButtonsData } from './TabToolbar.data';
import {
  useDeleteTasksMutation,
  useGetTaskDetailsQuery,
  usePatchCreateTaskStatusMutation,
} from '@/services/airSales/task';
import {
  setFiltersData,
  setSelectedTaskIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';

import { styles } from './TabToobar.style';

import { v4 as uuidv4 } from 'uuid';
import { AlertModals } from '@/components/AlertModals';
import { enqueueSnackbar } from 'notistack';

const TabToolbar = () => {
  const dispatch: any = useAppDispatch();
  const theme = useTheme();

  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const [isCreateTaskDrawerOpen, setIsCreateTaskDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const { data: taskData } = useGetTaskDetailsQuery({
    id: selectedTaskIds?.length === 1 && selectedTaskIds[0],
  });

  const [deleteTask] = useDeleteTasksMutation();

  const idsStrings = selectedTaskIds && selectedTaskIds.join(',');

  const deleteTaskHandler: any = async () => {
    setDeleteIsLoading(true);
    try {
      await deleteTask({ id: idsStrings })?.unwrap();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setIsDeleteModalOpen(false);
      setDeleteIsLoading(false);
      dispatch(setSelectedTaskIds([]));
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  const [patchCreateTaskStatus] = usePatchCreateTaskStatusMutation();

  const onStatusChangeHandler = async (value: any) => {
    const payload = {
      status: value,
    };
    try {
      await patchCreateTaskStatus({
        body: payload,
        id: selectedTaskIds && selectedTaskIds[0],
      }).unwrap();
      enqueueSnackbar('Status Updated Successfully', {
        variant: 'success',
      });
      setIsChangeStatusModalOpen(false);
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const menuFunctionsToRender: any = {
    edit: () => {
      setIsCreateTaskDrawerOpen(true);
      handleClose();
    },
    viewActivity: () => alert('viewActivity'),
    changeStatus: () => {
      setIsChangeStatusModalOpen(true);
      handleClose();
    },
    delete: () => {
      setIsDeleteModalOpen(true);
      handleClose();
    },
  };
  const handelRefreshFilter = () => {
    dispatch(setFiltersData('clear'));
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
              onClick={handelRefreshFilter}
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
            Actions
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
                (item?.name === 'edit' ||
                  item?.name === 'viewActivity' ||
                  item?.name === 'changeStatus');
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
          <Button
            className="small"
            color={'inherit'}
            variant={'outlined'}
            startIcon={<FilterIcon />}
            sx={{
              minHeight: '36px',
              '& .startIcon': {},
              width: { xs: '100%', sm: 'auto' },
            }}
            classes={{
              startIcon: 'startIcon',
            }}
            onClick={() => setIsFilterDrawerOpen(true)}
          >
            Filter
          </Button>
          <FilterComp
            setIsFilterDrawerOpen={setIsFilterDrawerOpen}
            isFilterDrawerOpen={isFilterDrawerOpen}
          />
          <ListGridViewBtn />

          {isCreateTaskDrawerOpen && (
            <CreateTask
              isCreateTaskDrawerOpen={isCreateTaskDrawerOpen}
              setIsCreateTaskDrawerOpen={setIsCreateTaskDrawerOpen}
              creationMode={'edit'}
              taskData={taskData}
            />
          )}

          {isChangeStatusModalOpen && (
            <CommonModal
              open={isChangeStatusModalOpen}
              handleClose={() => setIsChangeStatusModalOpen(false)}
              handleCancel={() => setIsChangeStatusModalOpen(false)}
              handleSubmit={() => setIsChangeStatusModalOpen(false)}
              title="Change Status"
              width={'25vw'}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                {statusButtonsData?.map((item: any) => (
                  <Button
                    variant={
                      taskData?.data?.status === item?.value
                        ? 'contained'
                        : 'outlined'
                    }
                    {...(taskData?.data?.status === item?.value
                      ? {}
                      : { color: 'inherit' })}
                    key={uuidv4()}
                    {...(taskData?.data?.status === item?.value
                      ? {}
                      : { onClick: () => onStatusChangeHandler(item?.value) })}
                  >
                    {item?.label}
                  </Button>
                ))}
              </Box>
            </CommonModal>
          )}

          <AlertModals
            message="You're about to delete a record. Are you sure?"
            type="delete"
            open={isDeleteModalOpen}
            handleClose={() => setIsDeleteModalOpen(false)}
            handleSubmitBtn={deleteTaskHandler}
            loading={deleteIsLoading}
          />
        </Box>
      </Box>
    </>
  );
};

export default TabToolbar;
