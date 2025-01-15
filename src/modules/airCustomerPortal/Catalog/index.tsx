import { Box, Grid, Skeleton } from '@mui/material';
import useCatalog from './useCatalog';
import CustomPagination from '@/components/CustomPagination';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { ServiceCard } from './ServiceCard';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { CategoryI, ServiceI } from './Catalog.interface';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { IconInfoCard } from '@/components/Cards/IconInfoCard/IconInfoCard';
import { DATA_TYPES } from '@/constants/strings';

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
    companyId,
  } = useCatalog();

  return (
    <>
      <PageTitledHeader title="All Services" />
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <IconInfoCard
              name="All Services"
              description="Browse the list of all services offered and raise a request."
              isActive={categoryId === DATA_TYPES?.UNDEFINED}
              onClick={() => {
                router?.push({
                  pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                  query: {
                    ...(!!companyId && { companyId }),
                    categoryName: 'All Services',
                  },
                });
              }}
            />
          </Grid>

          {!!allCategories?.length &&
            allCategories?.map((category: CategoryI) => (
              <Grid item xs={12} md={6} lg={3} key={category?._id}>
                <IconInfoCard
                  name={category?.categoryName}
                  description={category?.description}
                  isActive={categoryId === category?._id}
                  onClick={() => {
                    router?.push({
                      pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                      query: {
                        ...(!!category?._id
                          ? { categoryId: category?._id }
                          : {}),
                        ...(!!companyId && { companyId }),
                        categoryName: category?.categoryName,
                      },
                    });
                  }}
                />
              </Grid>
            ))}
        </Grid>
      )}
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

      <br />

      <Grid container spacing={1}>
        {isLoading || isFetching ? (
          <SkeletonForm />
        ) : isError ? (
          <Box width="100%">
            <ApiErrorState canRefresh refresh={() => refetch?.()} />
          </Box>
        ) : !!services?.data?.length ? (
          services?.data?.map((service: ServiceI) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={service?._id}>
                <ServiceCard
                  service={service}
                  onCardClick={() =>
                    handleClickService?.(service?._id, service?.serviceCategory)
                  }
                />
              </Grid>
            );
          })
        ) : (
          <NoData message="No service found" />
        )}
      </Grid>
    </>
  );
};
