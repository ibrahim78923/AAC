import { ViewDetailBackArrowIcon } from '@/assets/icons';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Theme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { allServices } from '../Catalog.data';
import { CatalogRequest } from '../CatalogRequest';
import { v4 as uuidv4 } from 'uuid';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import useCatalogService from './useCatalogService';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

import { Permissions } from '@/constants/permissions';
import { AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS } from '@/constants/permission-keys';
import CatalogServiceDetails from '../CatalogServiceDetails';
import { generateImage } from '@/utils/avatarUtils';

const CatalogService = () => {
  const router = useRouter();
  const theme: Theme = useTheme();
  const serviceData = allServices?.find(
    (service: any) => service?.id == router?.query?.serviceId,
  );
  const { handleClickOpen, open, setOpen, servicesDetails } =
    useCatalogService();
  return (
    <>
      <PermissionsGuard
        permissions={Permissions?.AIR_CUSTOMER_PORTAL_CATALOG_DETAIL}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
        >
          <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
            <Button
              onClick={() =>
                router?.push(AIR_CUSTOMER_PORTAL?.CATALOG_SERVICES)
              }
            >
              <ViewDetailBackArrowIcon />
            </Button>
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
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_CUSTOMER_PORTAL_CATALOG_PERMISSIONS?.VIEW_DETAILS_OF_SPECIFIC_SERVICES,
          ]}
        >
          <Grid container>
            <Grid item xs={12} md={6} lg={4} key={uuidv4()}>
              <Box
                key={servicesDetails?.data?._id}
                borderRadius={2}
                border={'0.3rem solid'}
                borderColor={'primary.lighter'}
                display={'flex'}
                flexDirection={'row'}
                mt={1}
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
                      servicesDetails?.data?.attachmentDetails?.fileUrl,
                    )}
                  />
                </Box>
                <Box
                  alignItems={'flex-start'}
                  display={'flex'}
                  justifyContent={'flex-start'}
                  flexDirection={'column'}
                  maxHeight={'100px'}
                  minHeight={'100px'}
                  overflow={'scroll'}
                  mt={2}
                >
                  <Typography variant="h5">
                    {servicesDetails?.data?.itemName}
                  </Typography>

                  <Typography variant="body2" component={'span'}>
                    {servicesDetails?.data?.description}
                  </Typography>
                  <Typography variant="body2" component={'span'}>
                    {servicesDetails?.data?.cost}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Box m={1}>
              <Typography variant="h5">{serviceData?.title}</Typography>
              <CatalogServiceDetails servicesDetails={servicesDetails} />
            </Box>
            <Grid item xs={12}>
              <Box
                display={'flex'}
                alignItems={'end'}
                justifyContent={'end'}
                flexDirection={'row'}
                position={'absolute'}
                bottom={'1rem'}
                right={'2rem'}
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
                  <Button
                    variant="contained"
                    sx={{ ml: '1rem' }}
                    onClick={handleClickOpen}
                  >
                    Place Request
                  </Button>
                </PermissionsGuard>
              </Box>

              <CatalogRequest
                open={open}
                setOpen={setOpen}
                servicesDetails={servicesDetails}
              />
            </Grid>
          </Grid>
        </PermissionsGuard>
      </PermissionsGuard>
    </>
  );
};

export default CatalogService;
