import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CatalogRequest } from '../CatalogRequest';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import useCatalogService from './useCatalogService';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';
import { AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ServiceCard } from '../ServiceCard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';

const CatalogService = () => {
  const {
    open,
    setOpen,
    servicesDetails,
    isLoading,
    isFetching,
    isError,
    refetch,
    router,
    theme,
  } = useCatalogService();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState canRefresh refresh={() => refetch?.()} />;

  return (
    <>
      <PermissionsGuard
        permissions={Permissions?.AIR_CUSTOMER_PORTAL_CATALOG_DETAIL}
      >
        <PageTitledHeader
          canMovedBack
          moveBack={() => router?.push(AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES)}
          title={
            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={1}
            >
              <Typography
                variant="h3"
                sx={{ color: theme?.palette?.primary?.main }}
              >
                Tickets
              </Typography>
              <ArrowForwardIosIcon fontSize="small" />
              <Typography variant="h5">
                {servicesDetails?.data?.itemName}
              </Typography>
            </Box>
          }
        />
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.VIEW_DETAILS_OF_SPECIFIC_SERVICES,
          ]}
        >
          <Grid container>
            <Grid item xs={12} md={6} lg={4}>
              <ServiceCard service={servicesDetails?.data} />
            </Grid>
          </Grid>

          <Grid container>
            <Box my={1}>
              <Typography variant="h5">
                {servicesDetails?.data?.itemName}
              </Typography>
              <Typography variant="body1" my={1} color="blue.lighter">
                Description:
              </Typography>
              {!!servicesDetails?.data?.description ? (
                <Typography
                  color="blue.lighter"
                  variant="body4"
                  dangerouslySetInnerHTML={{
                    __html: servicesDetails?.data?.description,
                  }}
                />
              ) : (
                '---'
              )}
            </Box>
            <Grid item xs={12}>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'end'}
                position={'absolute'}
                bottom={'1rem'}
                right={'2rem'}
                gap={2}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    router?.push(AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES)
                  }
                >
                  Cancel
                </Button>
                <PermissionsGuard
                  permissions={[
                    AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.REQUEST_FOR_CATALOG_SERVICES,
                  ]}
                >
                  <Button variant="contained" onClick={() => setOpen?.(true)}>
                    Place Request
                  </Button>
                </PermissionsGuard>
              </Box>
            </Grid>
          </Grid>
        </PermissionsGuard>
      </PermissionsGuard>
      {open && (
        <CatalogRequest
          open={open}
          setOpen={setOpen}
          servicesDetails={servicesDetails}
        />
      )}
    </>
  );
};

export default CatalogService;
