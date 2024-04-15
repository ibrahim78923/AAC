import { Avatar, Box, Grid, Typography } from '@mui/material';

import useCatalog from './useCatalog';
import { FolderIcon } from '@/assets/icons';
import CustomPagination from '@/components/CustomPagination';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

import { Permissions } from '@/constants/permissions';
import { AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { generateImage } from '@/utils/avatarUtils';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { CATALOG_SERVICE_TYPES } from '@/constants/strings';
export const Catalog = () => {
  const {
    result,
    handleClickService,
    data,
    handlePageChange,
    setPageLimit,
    setPage,
    isLoading,
    isFetching,
    router,
  } = useCatalog();

  return (
    <>
      <PermissionsGuard permissions={Permissions?.AIR_CUSTOMER_PORTAL_CATALOG}>
        <Typography variant="h3">All Services</Typography>
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.VIEW_ALL_CATALOG_SERVICES,
          ]}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
              <Box
                onClick={() => {
                  router.push({
                    pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                    query: {
                      categoryName: CATALOG_SERVICE_TYPES?.ALL,
                    },
                  });
                }}
                borderRadius={2}
                border={'0.2rem solid'}
                borderColor={'primary.lighter'}
                textAlign="center"
                mt={2}
                minHeight={'15rem'}
                p={2}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                  mt={2}
                >
                  <FolderIcon />
                </Box>
                <Typography variant="h5" mt={2}>
                  All Services
                </Typography>
                <Box
                  alignItems={'center'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    mt={1}
                    mb={2}
                    ml={2}
                    mr={2}
                  >
                    Browse the list of all services offered and raise a request.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {!!data?.data?.servicecategories?.length &&
              data?.data?.servicecategories?.map((service: any) => (
                <Grid item xs={12} md={6} lg={3} key={service?._id}>
                  <Box
                    onClick={() => {
                      router.push({
                        pathname: AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES,
                        query: {
                          categoryId: service?._id,
                          categoryName: service?.categoryName,
                        },
                      });
                    }}
                    borderRadius={2}
                    border={'0.2rem solid'}
                    borderColor={'primary.lighter'}
                    textAlign="center"
                    mt={2}
                    minHeight={'15rem'}
                    p={2}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      alignItems={'center'}
                      display={'flex'}
                      justifyContent={'center'}
                      mt={2}
                    >
                      <FolderIcon />
                    </Box>
                    <Typography variant="h5" mt={2}>
                      {service?.categoryName ?? '-'}
                    </Typography>
                    <Box
                      alignItems={'center'}
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      <Typography
                        variant="body2"
                        align="center"
                        gutterBottom
                        mt={1}
                        mb={2}
                        ml={2}
                        mr={2}
                      >
                        {service?.description ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
          <CustomPagination
            count={data?.data?.meta?.pages}
            pageLimit={data?.data?.meta?.limit}
            currentPage={data?.data?.meta?.page}
            totalRecords={data?.data?.meta?.total}
            onPageChange={handlePageChange}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </PermissionsGuard>
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.VIEW_CATALOG_SERVICES_DIFFERENT_TYPES,
          ]}
        >
          <Grid container>
            {isLoading || isFetching ? (
              <SkeletonForm />
            ) : (
              result?.map((allService: any) => (
                <Grid item xs={12} md={6} lg={4} key={allService?._id}>
                  <Box
                    key={allService?._id}
                    onClick={() =>
                      handleClickService?.(
                        allService?._id,
                        allService?.serviceCategory,
                      )
                    }
                    borderRadius={2}
                    border={'0.3rem solid'}
                    borderColor={'primary.lighter'}
                    display={'flex'}
                    flexDirection={'row'}
                    mt={4}
                    mr={3}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box
                      alignItems={'center'}
                      display={'flex'}
                      justifyContent={'flex-start'}
                      p={2}
                    >
                      <Avatar
                        sx={{ height: '4rem', width: '4rem' }}
                        src={generateImage(
                          allService?.attachmentDetails?.fileUrl,
                        )}
                      />
                    </Box>
                    <Box
                      alignItems={'flex-start'}
                      display={'flex'}
                      justifyContent={'flex-start'}
                      flexDirection={'column'}
                      mt={2}
                    >
                      <Typography variant="h5">
                        {allService?.itemName ?? '-'}
                      </Typography>

                      <Typography variant="body2" component={'span'}>
                        {allService?.description ?? '-'}
                      </Typography>
                      <Typography variant="body2" component={'span'}>
                        {allService?.cost ?? '-'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))
            )}
          </Grid>
        </PermissionsGuard>
      </PermissionsGuard>
    </>
  );
};
