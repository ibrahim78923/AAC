import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button, Grid } from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import TanstackTable from '@/components/Table/TanstackTable';
import { actionsOptions } from './ResponsesList.data';
import { MoveFolderModal } from './MoveFolderModal';
import { useResponsesList } from './useResponsesList';
import { AIR_SERVICES } from '@/constants';
import { DeleteResponseModal } from './DeleteResponseModal';
import { AddResponseForm } from './AddResponseForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

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
    tableColumns,
    search,
    setSearch,
    responsesList,
    responsesListMetaData,
    lazyGetResponsesListStatus,
  } = useResponsesList();
  return (
    <>
      <Box>
        <PageTitledHeader
          title={`Canned Response > ${convertToTitleCase(
            router?.query?.response,
          )} Responses`}
          canMovedBack
          moveBack={() => router?.push(AIR_SERVICES?.CANNED_RESPONSE_SETTINGS)}
        />
      </Box>
      <Box
        borderRadius={3}
        border="0.06rem solid"
        borderColor="custom.light_lavender_gray"
      >
        <Grid container>
          <Grid item xs={12}>
            <Box p={1.2}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <PermissionsGuard
                      permissions={[
                        AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
                      ]}
                    >
                      <Search
                        size="small"
                        label="Search"
                        searchBy={search}
                        setSearchBy={setSearch}
                        width={500}
                      />
                    </PermissionsGuard>
                  </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                  >
                    <PermissionsGuard
                      permissions={
                        Permissions?.AIR_SERVICES_SETTINGS_AGENT_PERFORMANCE_MANAGEMENT_CANNED_RESPONSES_LIST
                      }
                    >
                      <SingleDropdownButton
                        dropdownOptions={actionsOptions(handleActionClick)}
                        dropdownName="Actions"
                        disabled={!!!selectedData?.length}
                        sx={{
                          width: { sm: 'auto', xs: '100%' },
                        }}
                      />
                    </PermissionsGuard>
                    <PermissionsGuard
                      permissions={[
                        AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.ADD_NEW_RESPONSES_IN_DIFFERENT_FOLDERS,
                      ]}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          width: { sm: 'auto', xs: '100%' },
                        }}
                        startIcon={
                          <AddBoxRoundedIcon sx={{ color: 'custom.white' }} />
                        }
                        disableElevation
                        onClick={() => {
                          setOpenAddResponseDrawer(true);
                          setSelectedData([]);
                        }}
                      >
                        Add New
                      </Button>
                    </PermissionsGuard>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_RESPONSES_LIST,
              ]}
            >
              <TanstackTable
                columns={tableColumns}
                data={responsesList}
                isLoading={lazyGetResponsesListStatus?.isLoading}
                isFetching={lazyGetResponsesListStatus?.isFetching}
                isError={lazyGetResponsesListStatus?.isError}
                isSuccess={lazyGetResponsesListStatus?.isSuccess || true}
                currentPage={page}
                count={responsesListMetaData?.pages}
                pageLimit={pageLimit}
                totalRecords={responsesListMetaData?.total}
                onPageChange={(page: any) => setPage(page)}
                setPage={setPage}
                setPageLimit={setPageLimit}
                isPagination
              />
            </PermissionsGuard>
          </Grid>
        </Grid>
      </Box>
      <AddResponseForm
        open={openAddResponseDrawer}
        setDrawerOpen={setOpenAddResponseDrawer}
        folderName={convertToTitleCase(router?.query?.response)}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <DeleteResponseModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        setSelectedData={setSelectedData}
        selectedData={selectedData}
      />
      <MoveFolderModal
        openMoveFolderModal={openMoveFolderModal}
        closeMoveFolderModal={() => setOpenMoveFolderModal(false)}
        setSelectedData={setSelectedData}
        selectedData={selectedData}
      />
    </>
  );
};
