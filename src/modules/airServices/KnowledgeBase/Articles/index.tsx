import { Box, Button, Grid } from '@mui/material';
import { FilterIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { useArticles } from './useArticles';
import { SingleFolderDetail } from '../Folder/SingleFolderDetail';
import { ALL_FOLDER } from './Articles.data';
import { ChildComponentPropsI } from '../KnowledgeBase.interface';
import { Folder } from '../Folder';

export const Articles = (props: ChildComponentPropsI) => {
  const { isPortalOpen, setIsPortalOpen } = props;
  const {
    articlesColumns,
    selectedArticlesTab,
    dropdownOptions,
    lazyGetArticlesStatus,
    setPage,
    setPageLimit,
    setSearch,
    selectedArticlesData,
    renderPortalComponent,
    portalComponentProps,
    folderComponentProps,
    getArticlesListData,
    page,
  } = useArticles(props);

  return (
    <>
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.ARTICLE_LIST_VIEW,
        ]}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3} xl={1.75}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_KNOWLEDGE_BASE_ARTICLES_LIST_PERMISSIONS?.SEARCH_AND_FILTER,
              ]}
            >
              <Folder {...folderComponentProps} />
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
              errorProps={{
                canRefresh: true,
                refresh: () => getArticlesListData?.(page),
              }}
            />
          </Grid>
        </Grid>
      </PermissionsGuard>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
