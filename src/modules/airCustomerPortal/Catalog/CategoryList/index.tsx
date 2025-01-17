import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { IconInfoCard } from '@/components/Cards/IconInfoCard/IconInfoCard';
import CustomPagination from '@/components/CustomPagination';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { DATA_TYPES } from '@/constants/strings';
import { Grid } from '@mui/material';
import { useCategoryList } from './useCategoryList';
import { SKELETON_TYPES } from '@/constants/mui-constant';

export const CategoryList = () => {
  const {
    categoryList,
    showLoader,
    isError,
    setPage,
    setPageLimit,
    categoryId,
    companyId,
    router,
    data,
  } = useCategoryList();

  return (
    <>
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.TWO_LAYER_CARD}
      >
        <>
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

            {!!categoryList?.length &&
              categoryList?.map((category: any) => (
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
          <br />
          <CustomPagination
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            currentPage={data?.data?.meta?.page}
            totalRecords={data?.data?.meta?.total}
            onPageChange={(page: number) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      </ApiRequestFlow>
    </>
  );
};
