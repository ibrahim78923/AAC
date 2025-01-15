import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Grid } from '@mui/material';
import { AIR_SERVICES } from '@/constants/routes';
import CustomPagination from '@/components/CustomPagination';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import useCategoriesSection from './useCategoriesSection';
import { FormProvider } from '@/components/ReactHookForm';
import { addServiceCatalogData } from './CategoriesSection.data';
import { IconInfoCard } from '@/components/Cards/IconInfoCard/IconInfoCard';
import { DATA_TYPES } from '@/constants/strings';
import { AddNewCard } from '@/components/Cards/AddNewCard';

export default function CategoriesSection(props: any) {
  const {
    categoriesIsLoading,
    categoriesIsFetching,
    handleClickOpen,
    categories,
    paginationData,
    setPage,
    setPageLimit,
    handlePageChange,
    open,
  } = props;

  const {
    router,
    methods,
    handleSubmit,
    onSubmit,
    handleClose,
    postServiceCatalogTriggerStatus,
  } = useCategoriesSection(props);

  return (
    <>
      {categoriesIsLoading || categoriesIsFetching ? (
        <SkeletonForm />
      ) : (
        <>
          <Grid container spacing={2} mb={1}>
            <Grid item xs={12} md={6} lg={3}>
              <PermissionsGuard
                permissions={[
                  AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_SERVICES_CATEGORY,
                ]}
              >
                <AddNewCard onClick={handleClickOpen} />
              </PermissionsGuard>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <IconInfoCard
                name={'All Services'}
                isActive={router?.query?.categoryId === DATA_TYPES?.UNDEFINED}
                onClick={() => {
                  router?.push({
                    pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                  });
                }}
              />
            </Grid>

            {categories?.map((category: any) => (
              <Grid item xs={12} md={6} lg={3} key={category?._id}>
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
              </Grid>
            ))}
          </Grid>

          <CustomPagination
            count={paginationData?.pages}
            pageLimit={paginationData?.limit}
            currentPage={paginationData?.page}
            totalRecords={paginationData?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </>
      )}

      {open && (
        <CustomCommonDialog
          isPortalOpen={open}
          onClose={handleClose}
          dialogTitle={'New Service Category'}
          closePortal={handleClose}
          handleCancelButton={handleClose}
          disabledCancelButton={postServiceCatalogTriggerStatus?.isLoading}
          handleSubmitButton={handleSubmit(onSubmit)}
          showSubmitLoader={postServiceCatalogTriggerStatus?.isLoading}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {addServiceCatalogData?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </CustomCommonDialog>
      )}
    </>
  );
}
