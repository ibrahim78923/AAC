import { Box, Button, Grid, Typography } from '@mui/material';
import { FilterIcon, FolderGreyIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import { useArticles } from './useArticles';
import { styles } from './Articles.style';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoveFolderModal } from './MoveFolderModal';
import FilterArticles from './FilterArticles';
import { DeleteArticles } from './DeleteArticles';

export const Articles = () => {
  const {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    openDeleteModal,
    setOpenDeleteModal,
    moveFolderModal,
    setMoveFolderModal,
    dropdownOptions,
    theme,
    openFilter,
    setOpenFilter,
    lazyGetArticlesStatus,
    setPage,
    setPageLimit,
    setSearch,
    foldersList,
    selectedArticlesData,
    setSelectedArticlesData,
    filterValues,
    setFilterValues,
  } = useArticles();

  const { tabWrapper, selectedTabColor } = styles();

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={3} xl={1.75}>
          <Box
            sx={{
              m: '0.75rem 1.5rem 0.75rem 0 ',
              maxHeight: { xs: '20vh', xl: '60vh' },
              overflowY: 'scroll',
            }}
          >
            {foldersList?.map((tab: any) => (
              <Box
                key={tab?._id}
                sx={{ ...tabWrapper(tab, selectedArticlesTab, theme) }}
                onClick={() => handleSelectedArticlesTab(tab?._id)}
              >
                <FolderGreyIcon
                  fill={selectedTabColor(tab?._id, selectedArticlesTab, theme)}
                />
                <Typography
                  color={selectedTabColor(tab?._id, selectedArticlesTab, theme)}
                  textTransform={'capitalize'}
                >
                  {tab?.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} lg={9} xl={10.25}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
            alignItems={'center'}
          >
            <Search placeholder="Search Here" setSearchBy={setSearch} />
            <Box
              display={'flex'}
              gap={1}
              flexWrap={'wrap'}
              alignItems={'center'}
            >
              <SingleDropdownButton
                disabled={!!selectedArticlesData?.length}
                dropdownOptions={dropdownOptions}
              />
              <Button
                variant="outlined"
                size="large"
                startIcon={<FilterIcon />}
                color="secondary"
                onClick={() => setOpenFilter(true)}
              >
                Filter
              </Button>
            </Box>
          </Box>
          <br />
          <TanstackTable
            data={
              lazyGetArticlesStatus?.data?.data?.articles ?? [
                { _id: '1', name: 'op', status: 'published' },
              ]
            }
            columns={articlesColumns}
            isLoading={lazyGetArticlesStatus?.isLoading}
            currentPage={lazyGetArticlesStatus?.data?.data?.meta?.page}
            count={lazyGetArticlesStatus?.data?.data?.meta?.pages}
            pageLimit={lazyGetArticlesStatus?.data?.data?.meta?.limit}
            totalRecords={lazyGetArticlesStatus?.data?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={lazyGetArticlesStatus?.isFetching}
            isError={lazyGetArticlesStatus?.isError}
            isSuccess={lazyGetArticlesStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Grid>
      </Grid>
      <DeleteArticles
        deleteModalOpen={openDeleteModal}
        setDeleteModalOpen={setOpenDeleteModal}
        selectedArticlesData={selectedArticlesData}
        setSelectedArticlesData={setSelectedArticlesData}
      />
      <MoveFolderModal
        moveFolderModal={moveFolderModal}
        setMoveFolderModal={setMoveFolderModal}
      />
      <FilterArticles
        isOpenFilterDrawer={openFilter}
        setIsOpenFilterDrawer={setOpenFilter}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        setPage={setPage}
        // handleFilterValues={handleFilterValues}
      />
    </>
  );
};
