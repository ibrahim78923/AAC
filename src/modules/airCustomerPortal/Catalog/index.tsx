import { Box, Grid, Skeleton } from '@mui/material';
import useCatalog from './useCatalog';
import CustomPagination from '@/components/CustomPagination';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Permissions } from '@/constants/permissions';
import { AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { CategoryCard } from './CategoryCard';
import { ServiceCard } from './ServiceCard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { CategoryI, ServiceI } from './Catalog.interface';

export const Catalog = () => {
  const {
    handleClickService,
    serviceCatalogCategories,
    setPageLimit,
    setPage,
    isLoading,
    isFetching,
    router,
    services,
    categoryId,
    allCategories,
    isError,
    refetch,
  } = useCatalog();

  return (
    <>
      <PermissionsGuard permissions={Permissions?.AIR_CUSTOMER_PORTAL_CATALOG}>
        <PageTitledHeader title="All Services" />
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.VIEW_ALL_CATALOG_SERVICES,
          ]}
        >
          <Grid container spacing={2}>
            {serviceCatalogCategories?.isLoading ||
            serviceCatalogCategories?.isFetching ? (
              <SkeletonForm />
            ) : serviceCatalogCategories?.isError ? (
              <Box width="100%">
                <ApiErrorState
                  canRefresh
                  refresh={() => serviceCatalogCategories?.refetch?.()}
                />
              </Box>
            ) : (
              !!allCategories?.length &&
              allCategories?.map((category: CategoryI) => (
                <Grid item xs={12} md={6} lg={3} key={category?._id}>
                  <CategoryCard
                    category={category}
                    onCardClick={() => {
                      router?.push({
                        pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                        query: {
                          ...(!!category?._id
                            ? { categoryId: category?._id }
                            : {}),
                          categoryName: category?.categoryName,
                        },
                      });
                    }}
                    categoryId={categoryId}
                  />
                </Grid>
              ))
            )}
          </Grid>
          {serviceCatalogCategories?.isLoading ||
          serviceCatalogCategories?.isFetching ? (
            <Skeleton />
          ) : serviceCatalogCategories?.isError ? (
            <></>
          ) : (
            <>
              <br />
              <CustomPagination
                count={serviceCatalogCategories?.data?.data?.meta?.pages}
                pageLimit={serviceCatalogCategories?.data?.data?.meta?.limit}
                currentPage={serviceCatalogCategories?.data?.data?.meta?.page}
                totalRecords={serviceCatalogCategories?.data?.data?.meta?.total}
                onPageChange={(page: number) => setPage(page)}
                setPage={setPage}
                setPageLimit={setPageLimit}
              />
            </>
          )}
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.VIEW_CATALOG_SERVICES_DIFFERENT_TYPES,
          ]}
        >
          <Grid container spacing={1}>
            {isLoading || isFetching ? (
              <SkeletonForm />
            ) : isError ? (
              <Box width="100%">
                <ApiErrorState canRefresh refresh={() => refetch?.()} />
              </Box>
            ) : !!services?.data?.length ? (
              services?.data?.map((service: ServiceI) => (
                <Grid item xs={12} md={6} lg={4} key={service?._id}>
                  <ServiceCard
                    service={service}
                    onCardClick={() =>
                      handleClickService?.(
                        service?._id,
                        service?.serviceCategory,
                      )
                    }
                  />
                </Grid>
              ))
            ) : (
              <NoData message="No service found" />
            )}
          </Grid>
        </PermissionsGuard>
      </PermissionsGuard>
    </>
  );
};
