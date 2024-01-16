import { Box, Button, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { FilterIcon, FolderGreyIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import { useArticles } from './useArticles';
import { styles } from './Articles.style';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { AlertModals } from '@/components/AlertModals';
import { MoveFolderModal } from './MoveFolderModal';
import FilterArticles from './FilterArticles';

export const Articles = () => {
  const {
    articlesColumns,
    selectedArticlesTab,
    handleSelectedArticlesTab,
    selectedArticlesData,
    openDeleteModal,
    setOpenDeleteModal,
    handleDeleteSubmit,
    moveFolderModal,
    setMoveFolderModal,
    dropdownOptions,
    theme,
    openFilter,
    setOpenFilter,
    articlesData,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    search,
    handleSearch,
    meta,
    handleFilterValues,
    foldersList,
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
                key={uuidv4()}
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
                  {tab?.folderName}
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
          >
            <Search
              placeholder="Search Here"
              value={search}
              onChange={(e: any) => handleSearch(e?.target?.value)}
            />
            <Box display={'flex'} gap={1}>
              <SingleDropdownButton
                disabled={!!!selectedArticlesData?.length}
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
            data={articlesData}
            columns={articlesColumns}
            isLoading={isLoading}
            currentPage={page}
            count={meta?.pages}
            pageLimit={pageLimit}
            totalRecords={meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={isFetching}
            isError={isError}
            isSuccess={isSuccess ?? true}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Grid>
      </Grid>
      <AlertModals
        type="delete"
        message="Do you want to delete the selected article?"
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleSubmitBtn={handleDeleteSubmit}
      />
      <MoveFolderModal
        moveFolderModal={moveFolderModal}
        setMoveFolderModal={setMoveFolderModal}
      />
      <FilterArticles
        isOpenFilterDrawer={openFilter}
        setIsOpenFilterDrawer={setOpenFilter}
        handleFilterValues={handleFilterValues}
      />
    </>
  );
};
