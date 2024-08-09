import { Box, Button, Grid, Typography } from '@mui/material';
import { FilterIcon, FolderGreyIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { useArticles } from './useArticles';
import { SingleFolderDetail } from '../Folder/SingleFolderDetail';
import { ALL_FOLDER } from './Articles.data';
import { ArticlesComponentPropsI } from './Articles.interface';

export const Articles = (props: ArticlesComponentPropsI) => {
  const { isPortalOpen, setIsPortalOpen } = props;
  const {
    articlesColumns,
    selectedArticlesTab,
    dropdownOptions,
    theme,
    lazyGetArticlesStatus,
    setPage,
    setPageLimit,
    setSearch,
    foldersList,
    selectedArticlesData,
    setFolder,
    isLoading,
    isFetching,
    isError,
    renderPortalComponent,
    portalComponentProps,
  } = useArticles(props);

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
              {isLoading || isFetching ? (
                <SkeletonForm />
              ) : isError ? (
                <ApiErrorState />
              ) : (
                foldersList?.map((tab: any) => (
                  <Box
                    key={tab?._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      p: 1,
                      background:
                        tab?._id === selectedArticlesTab?._id
                          ? theme?.palette?.grey?.['400']
                          : 'common.white',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => setFolder(tab)}
                  >
                    <FolderGreyIcon
                      fill={
                        theme?.palette?.grey?.[
                          tab?._id === selectedArticlesTab?._id ? '800' : '900'
                        ]
                      }
                    />
                    <Typography
                      color={
                        theme?.palette?.grey?.[
                          tab?._id === selectedArticlesTab?._id ? '800' : '900'
                        ]
                      }
                      textTransform={'capitalize'}
                    >
                      {tab?.name}
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </PermissionsGuard>
        </Grid>
        <Grid item xs={12} lg={9} xl={10.25}>
          {selectedArticlesTab?._id === ALL_FOLDER ? (
            <></>
          ) : (
            <SingleFolderDetail {...portalComponentProps} />
          )}
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
                  onClick={() =>
                    setIsPortalOpen({ isOpen: true, isFilter: true })
                  }
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
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
