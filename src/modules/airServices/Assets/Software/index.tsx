import { Box, Button } from '@mui/material';
import { columns } from './Software.data';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { FilterSharedIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import SoftwareFilter from './SoftwareFilter';
import { SoftwareAssignCategory } from './SoftwareAssignCategory';
import { UpsertSoftware } from './UpsertSoftware';
import { useSoftware } from './useSoftware';

function Software() {
  const {
    router,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    assetsSoftwares,
    isAddDrawerOpen,
    setIsAddDrawerOpen,
    softwareData,
    setSoftwareData,
    openAssignModal,
    setOpenAssignModal,
    searchValue,
    setSearchValue,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    handlePageChange,
    paginationData,
    setFilterValues,
    isOpenFilterDrawer,
    setIsOpenFilterDrawer,
    submitForm,
    methods,
    handleClose,
  } = useSoftware();

  return (
    <>
      <PageTitledHeader
        title={'Software'}
        addTitle={'New Software'}
        handleAction={() => setIsAddDrawerOpen(true)}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box>
          <Search
            label="search"
            width="100%"
            searchBy={searchValue}
            setSearchBy={setSearchValue}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!softwareData?.length}
            onClick={() => {
              setOpenAssignModal(true);
            }}
          >
            Assign Category
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
            onClick={() => setIsOpenFilterDrawer(true)}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <Box>
        <TanstackTable
          isError={isError}
          isSuccess={isSuccess}
          isLoading={isLoading}
          isFetching={isFetching}
          data={assetsSoftwares}
          columns={columns(
            softwareData,
            setSoftwareData,
            assetsSoftwares,
            router,
          )}
          isPagination
          count={paginationData?.pages}
          totalRecords={paginationData?.total}
          pageLimit={pageLimit}
          currentPage={page}
          onPageChange={handlePageChange}
          setPageLimit={setPageLimit}
          setPage={setPage}
        />
      </Box>

      {isOpenFilterDrawer && (
        <SoftwareFilter
          isOpenDrawer={isOpenFilterDrawer}
          setIsOpenFilterDrawer={setIsOpenFilterDrawer}
          setFilterValues={setFilterValues}
        />
      )}

      <SoftwareAssignCategory
        openAssignModal={openAssignModal}
        setOpenAssignModal={setOpenAssignModal}
        selectedSoftware={softwareData}
      />
      <UpsertSoftware
        isDrawerOpen={isAddDrawerOpen}
        onClose={handleClose}
        submitForm={submitForm}
        methods={methods}
        title="New Software"
      />
    </>
  );
}

export default Software;
