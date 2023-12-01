import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button, Grid } from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TanstackTable from '@/components/Table/TanstackTable';
import {
  actionsOptions,
  responsesTableColumns,
  responsesTableData,
} from './ResponsesList.data';
import { AddResponseDrawer } from './AddResponseDrawer';
import { enqueueSnackbar } from 'notistack';
import { AlertModals } from '@/components/AlertModals';
import { MoveFolderModal } from './MoveFolderModal';
import { useResponsesList } from './useResponsesList';
import { styles } from './ResponsesList.styles';

export const ResponsesList = () => {
  const {
    setOpenMoveFolderModal,
    openMoveFolderModal,
    setDeleteModal,
    setSelectedData,
    deleteModal,
    setOpenAddResponseDrawer,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    openAddResponseDrawer,
    selectedData,
    convertToTitleCase,
    router,
    handleActionClick,
  } = useResponsesList();
  return (
    <>
      <Box>
        <PageTitledHeader
          title={`Canned Responses > ${convertToTitleCase(
            router?.query?.response,
          )}`}
          canMovedBack
          moveBack={() => router?.back()}
        />
      </Box>
      <Box sx={styles?.tableContainer}>
        <Grid container>
          <Grid item xs={12}>
            <Box p={1.2}>
              <Grid container>
                <Grid item xs={6}>
                  <Box sx={styles?.searchBox}>
                    <Search size="small" label="Search" />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={styles?.actionButtonsContainer}>
                    <SingleDropdownButton
                      dropdownOptions={actionsOptions(handleActionClick)}
                      dropdownName="Actions"
                      disabled={!!!selectedData?.length}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AddBoxRoundedIcon sx={styles?.plusIcon} />}
                      disableElevation
                      onClick={() => setOpenAddResponseDrawer(true)}
                    >
                      Add New
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TanstackTable
              columns={responsesTableColumns(
                selectedData,
                setSelectedData,
                responsesTableData,
              )}
              data={responsesTableData}
              isLoading={false}
              isFetching={false}
              isError={false}
              isSuccess={true}
              currentPage={page}
              count={2}
              pageLimit={pageLimit}
              totalRecords={4}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
              isPagination
            />
          </Grid>
        </Grid>
      </Box>
      <AddResponseDrawer
        open={openAddResponseDrawer}
        setDrawerOpen={setOpenAddResponseDrawer}
      />
      <AlertModals
        message={'Are you sure you want to delete?'}
        type={'delete'}
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        handleSubmitBtn={() => {
          setSelectedData([]);
          enqueueSnackbar('Deleted Successfully!', {
            variant: 'success',
          });
          setDeleteModal(false);
        }}
      />
      <MoveFolderModal
        openMoveFolderModal={openMoveFolderModal}
        closeMoveFolderModal={() => setOpenMoveFolderModal(false)}
      />
    </>
  );
};
