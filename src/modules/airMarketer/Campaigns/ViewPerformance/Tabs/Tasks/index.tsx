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
    handleDeleteModal,
    setIsOpenDeleteDrawer,
    setSearchValue,
    compaignsTasksData,
    isFetching,
    isLoading,
    setPage,
    setPageLimit,
    getCampaignsTasks,
    setSelectedRowData,
    selectedRec,
    setSelectedRec,
    setStatusVariant,
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
              >
                <MenuItem onClick={handleTaskDrawer}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
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

      {isOpenEditTaskDrawer && (
        <EditTask
          isOpenDrawer={isOpenEditTaskDrawer}
          onClose={() => setIsOpenEditTaskDrawer(false)}
        />
      )}
      {isOpenDeleteDrawer && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete"
          typeImage={<AlertModalDeleteIcon />}
          open={isOpenDeleteDrawer}
          handleClose={() => setIsOpenDeleteDrawer(false)}
          handleSubmitBtn={() => setIsOpenDeleteDrawer(false)}
        />
      )}
    </>
  );
};

export default Tasks;
