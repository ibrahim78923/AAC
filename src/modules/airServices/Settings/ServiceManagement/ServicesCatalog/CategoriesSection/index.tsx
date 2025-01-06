import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { pxToRem } from '@/utils/getFontValue';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { CatalogAddImage } from '@/assets/images';
import { AIR_SERVICES } from '@/constants/routes';
import FolderIcon from '@mui/icons-material/Folder';
import { TruncateText } from '@/components/TruncateText';
import CustomPagination from '@/components/CustomPagination';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import useCategoriesSection from './useCategoriesSection';
import { FormProvider } from '@/components/ReactHookForm';
import { addServiceCatalogData } from './CategoriesSection.data';

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
    theme,
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
              <Box
                height={pxToRem(200)}
                borderRadius={2}
                border={1}
                borderColor={'primary.main'}
                alignItems={'center'}
                display={'flex'}
                justifyContent={'center'}
                sx={{ cursor: 'pointer' }}
                onClick={handleClickOpen}
              >
                <PermissionsGuard
                  permissions={[
                    AIR_SERVICES_SETTINGS_SERVICE_MANAGEMENT_PERMISSIONS?.ADD_SERVICES_CATEGORY,
                  ]}
                >
                  <Box
                    alignItems={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    onClick={handleClickOpen}
                  >
                    <Image
                      src={CatalogAddImage}
                      height={64}
                      width={64}
                      alt={'Add Catalog'}
                    />
                  </Box>
                </PermissionsGuard>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Box
                height={pxToRem(200)}
                onClick={() => {
                  router?.push({
                    pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                  });
                }}
                borderRadius={2}
                sx={{ cursor: 'pointer' }}
                bgcolor={
                  !router?.query?.categoryId
                    ? `${theme?.palette?.primary?.light}`
                    : 'transparent'
                }
                border={1}
                borderColor={
                  !router?.query?.categoryId ? 'primary.main' : 'primary.light'
                }
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                p={1}
              >
                <FolderIcon color={'primary'} fontSize={'large'} />
                <Typography variant={'h5'}>All Services</Typography>
              </Box>
            </Grid>

            {categories?.map((service: any) => (
              <Grid item xs={12} md={6} lg={3} key={service?._id}>
                <Box
                  height={pxToRem(200)}
                  overflow={'auto'}
                  onClick={() => {
                    router?.push({
                      pathname: AIR_SERVICES?.SERVICE_CATALOG_SETTINGS,
                      query: {
                        categoryId: service?._id,
                        categoryName: service?.categoryName,
                      },
                    });
                  }}
                  borderRadius={2}
                  sx={{ cursor: 'pointer' }}
                  bgcolor={
                    router?.query?.categoryId === service?._id
                      ? `${theme?.palette?.primary?.light}`
                      : ''
                  }
                  border={1}
                  borderColor={
                    router?.query?.categoryId === service?._id
                      ? 'primary.main'
                      : 'primary.light'
                  }
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  p={1}
                >
                  <FolderIcon color="primary" fontSize="large" />

                  <TruncateText
                    text={service?.categoryName}
                    boxProps={{
                      sx: { fontSize: pxToRem(18), fontWeight: 600 },
                    }}
                  />

                  <TruncateText
                    text={service?.description}
                    size={100}
                    boxProps={{
                      sx: { fontSize: pxToRem(14) },
                    }}
                  />
                </Box>
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
