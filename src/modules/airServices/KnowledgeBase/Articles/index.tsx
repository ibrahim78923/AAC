import { Box, Button, Grid, Typography } from '@mui/material';
import { FilterIcon, FolderGreyIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import { useArticles } from './useArticles';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { MoveFolder } from './MoveFolder';
import FilterArticles from './FilterArticles';
import { DeleteArticles } from './DeleteArticles';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';

export const Articles = () => {
  const {
    articlesColumns,
    selectedArticlesTab,
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
    setFolder,
    page,
    getValueArticlesListData,
  } = useArticles();

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={3} xl={1.75}>
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
            ]}
          >
            <Box
              sx={{
                m: '0.75rem 1.5rem 0.75rem 0 ',
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              {foldersList?.map((tab: any) => (
                <Box
                  key={tab?._id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    background:
                      tab?._id === selectedArticlesTab
                        ? theme?.palette?.grey?.['400']
                        : 'white',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setFolder(tab?._id)}
                >
                  <FolderGreyIcon
                    fill={
                      theme?.palette?.grey?.[
                        tab?._id === selectedArticlesTab ? '800' : '900'
                      ]
                    }
                  />
                  <Typography
                    color={
                      theme?.palette?.grey?.[
                        tab?._id === selectedArticlesTab ? '800' : '900'
                      ]
                    }
                    textTransform={'capitalize'}
                  >
                    {tab?.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </PermissionsGuard>
        </Grid>
        <Grid item xs={12} lg={9} xl={10.25}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
            alignItems={'center'}
          >
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
              ]}
            >
              <Search placeholder="Search Here" setSearchBy={setSearch} />
            </PermissionsGuard>
            <Box
              display={'flex'}
              gap={1}
              flexWrap={'wrap'}
              alignItems={'center'}
            >
              <PermissionsGuard
                permissions={
                  Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_LIST_VIEW_ACTIONS
                }
              >
                <SingleDropdownButton
                  disabled={!!!selectedArticlesData?.length}
                  dropdownOptions={dropdownOptions}
                />
              </PermissionsGuard>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
                ]}
              >
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FilterIcon />}
                  color="secondary"
                  onClick={() => setOpenFilter(true)}
                >
                  Filter
                </Button>
              </PermissionsGuard>
            </Box>
          </Box>
          <br />
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.ARTICLE_LIST_VIEW,
            ]}
          >
            <TanstackTable
              data={lazyGetArticlesStatus?.data?.data?.articles}
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
          </PermissionsGuard>
        </Grid>
      </Grid>
      {openDeleteModal && (
        <DeleteArticles
          deleteModalOpen={openDeleteModal}
          setDeleteModalOpen={setOpenDeleteModal}
          selectedArticlesData={selectedArticlesData}
          setSelectedArticlesData={setSelectedArticlesData}
          setPage={setPage}
          page={page}
          getValueArticlesListData={getValueArticlesListData}
          totalRecords={lazyGetArticlesStatus?.data?.data?.articles?.length}
        />
      )}
      {moveFolderModal && (
        <MoveFolder
          moveFolderModal={moveFolderModal}
          setMoveFolderModal={setMoveFolderModal}
          selectedArticlesData={selectedArticlesData?.[0]}
          setSelectedArticlesData={setSelectedArticlesData}
        />
      )}
      {openFilter && (
        <FilterArticles
          isOpenFilterDrawer={openFilter}
          setIsOpenFilterDrawer={setOpenFilter}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setPage={setPage}
        />
      )}
    </>
  );
};
