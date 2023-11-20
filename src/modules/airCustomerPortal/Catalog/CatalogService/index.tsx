import { ViewDetailBackArrowIcon } from '@/assets/icons';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import useCatalog from '../useCatalog';
import { allServices } from '../Catalog.data';
import { CatalogRequest } from '../CatalogRequest';
import CatalogServiceBackUp from '../CatalogServiceBackUp';
import CatalogServiceSoftware from '../CatalogServiceSoftware';
import { v4 as uuidv4 } from 'uuid';

import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { CATALOG_SERVICE } from '@/constants/strings';

const CatalogService = () => {
  const router = useRouter();
  const theme: any = useTheme();
  const serviceData = allServices?.find(
    (service: any) => service?.id == router?.query?.serviceId,
  );
  const { open, handleClickOpen, setOpen } = useCatalog();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <Button
            onClick={() =>
              router.push(AIR_CUSTOMER_PORTAL?.CATALOG_SERVICE_DETAILS)
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

          <Typography variant="h5">{serviceData?.title}</Typography>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} key={uuidv4()}>
          <Box
            key={serviceData?.id}
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
              <Image
                src={serviceData?.image || ''}
                height={56}
                width={58}
                alt={`Service ${serviceData?.id} Image`}
              />
            </Box>
            <Box
              alignItems={'flex-start'}
              display={'flex'}
              justifyContent={'flex-start'}
              flexDirection={'column'}
              mt={2}
            >
              <Typography variant="h5">{serviceData?.title}</Typography>

              <Typography variant="body2" component={'span'}>
                {serviceData?.description}
              </Typography>
              <Typography variant="body2" component={'span'}>
                {serviceData?.price}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Box m={1}>
          <Typography variant="h5">{serviceData?.title}</Typography>
          {serviceData?.title === CATALOG_SERVICE?.DATA_BACKUP ? (
            <>
              <CatalogServiceBackUp />
            </>
          ) : (
            <>
              <CatalogServiceSoftware />
            </>
          )}
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
            <Button>Cancel</Button>
            <Button
              variant="contained"
              sx={{ ml: '1rem' }}
              onClick={handleClickOpen}
            >
              Place Request
            </Button>
          </Box>

          <CatalogRequest open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
};

export default CatalogService;
