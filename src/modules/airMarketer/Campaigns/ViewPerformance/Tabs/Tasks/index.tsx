import { Box, Button, Grid, Menu, MenuItem, Stack } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import useTasks from './useTasks';
import EditTask from './EditTask';
import { AlertModalDeleteIcon, DownIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { columns } from './Tasks.data';

const Tasks = ({ CurrCampaignId }: any) => {
  const {
    anchorEl,
    theme,
    actionMenuOpen,
    handleActionsMenuClose,
    handleActionsMenuClick,
    isOpenEditTaskDrawer,
    setIsOpenEditTaskDrawer,
    handleTaskDrawer,
    isOpenDeleteDrawer,
    handleClickDeleteModal,
    setIsOpenDeleteDrawer,
    setSearchValue,
    compaignsTasksData,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
    selectedRowData,
    getCampaignsTasks,
    setSelectedRowData,
    selectedRec,
    setSelectedRec,
    setStatusVariant,
    disableActions,
    handleDeleteModal,
    deleteTaskLoading,
  } = useTasks(CurrCampaignId);

  const columnsProps = {
    selectedRec,
    setSelectedRec,
    compaignsTasksData,
    setStatusVariant,
    setSelectedRowData,
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Search
              size="small"
              label={'Search here'}
              setSearchBy={setSearchValue}
            />
            <Box>
              <Button
                disabled={disableActions}
                id="basic-button"
                aria-controls={'basic-menu'}
                aria-haspopup="true"
                aria-expanded={'true'}
                className="small"
                variant="outlined"
                color="inherit"
                onClick={handleActionsMenuClick}
                sx={{
                  color: theme?.palette?.grey[500],
                  border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
                  '@media (max-width:581px)': {
                    width: '100%',
                  },
                }}
              >
                Actions &nbsp; <DownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={actionMenuOpen}
                onClose={handleActionsMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  '.MuiPopover-paper': {
                    minWidth: '100px',
                  },
                }}
              >
                <MenuItem onClick={handleTaskDrawer}>Edit</MenuItem>
                <MenuItem onClick={handleClickDeleteModal}>Delete</MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            totalRecords={getCampaignsTasks?.data?.meta?.total}
            currentPage={getCampaignsTasks?.data?.meta?.page}
            pageLimit={getCampaignsTasks?.data?.meta?.limit}
            count={getCampaignsTasks?.data?.meta?.pages}
            onPageChange={(page: any) => setPage(page)}
            setPageLimit={setPageLimit}
            columns={columns(columnsProps)}
            data={compaignsTasksData}
            isPagination
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>

      {isOpenEditTaskDrawer?.isToggle && (
        <EditTask
          isOpenDrawer={isOpenEditTaskDrawer}
          onClose={() =>
            setIsOpenEditTaskDrawer({
              ...isOpenEditTaskDrawer,
              isToggle: false,
            })
          }
          selectedRec={selectedRowData?._id}
          // onClose={() => {
          //   {
          //     setSelectedRec([]);
          //     setIsOpenEditTaskDrawer({ isToggle: false, type: '' });
          //   }
          // }}
        />
      )}
      {isOpenDeleteDrawer?.isToggle && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={isOpenDeleteDrawer?.isToggle}
          handleClose={() =>
            setIsOpenDeleteDrawer({ ...isOpenDeleteDrawer, isToggle: false })
          }
          handleSubmitBtn={() => handleDeleteModal(isOpenDeleteDrawer?.id)}
          loading={deleteTaskLoading}
        />
      )}
    </>
  );
};

export default Tasks;
