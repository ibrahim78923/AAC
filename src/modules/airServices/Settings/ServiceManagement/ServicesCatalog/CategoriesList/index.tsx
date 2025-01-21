import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES } from '@/constants/routes';
import CustomPagination from '@/components/CustomPagination';
import { IconInfoCard } from '@/components/Cards/IconInfoCard/IconInfoCard';
import { DATA_TYPES } from '@/constants/strings';
import { AddNewCard } from '@/components/Cards/AddNewCard';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { UpsertCategory } from '../UpsertCategory';
import { useCategoriesList } from './useCategoriesList';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const CategoriesList = () => {
  const {
    router,
    isLoading,
    isFetching,
    isPortalOpen,
    categories,
    paginationData,
    setPageLimit,
    setPage,
    setIsPortalOpen,
    openPortal,
    handlePageChange,
  } = useCategoriesList();

  return (
    <>
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.LARGE_VERTICAL_TWO_LAYER_DOUBLE_CARD}
      >
        <CustomGrid isContainer spacing={2}>
          <CustomGrid xs={12} md={6} lg={3}>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_SERVICES_CATEGORY,
              ]}
            >
              <AddNewCard onClick={openPortal} />
            </PermissionsGuard>
          </CustomGrid>
          <CustomGrid xs={12} md={6} lg={3}>
            <IconInfoCard
              name={'All Services'}
              isActive={router?.query?.categoryId === DATA_TYPES?.UNDEFINED}
              onClick={() => {
                router?.push({
                  pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                });
              }}
            />
          </CustomGrid>

          {categories?.map((category: any) => (
            <CustomGrid xs={12} md={6} lg={3} key={category?._id}>
              <IconInfoCard
                name={category?.categoryName}
                description={category?.description}
                isActive={router?.query?.categoryId === category?._id}
                onClick={() => {
                  router?.push({
                    pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                    query: {
                      categoryId: category?._id,
                      categoryName: category?.categoryName,
                    },
                  });
                }}
              />
            </CustomGrid>
          ))}
        </CustomGrid>

        <CustomPagination
          count={paginationData?.pages}
          pageLimit={paginationData?.limit}
          currentPage={paginationData?.page}
          totalRecords={paginationData?.total}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </ApiRequestFlow>

      {isPortalOpen && (
        <UpsertCategory
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
      )}
    </>
  );
};
