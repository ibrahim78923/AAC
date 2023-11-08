import { ViewDetailBackArrowIcon } from '@/assets/icons';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import useCatalog from '../useCatalog';
import { allsServices } from '../Catalog.data';
import { CatalogRequest } from '../CatalogRequest';

function CatalogService() {
  const router = useRouter();
  const theme: any = useTheme();
  const serviceData = allsServices.find(
    (x: any) => x?.id == router?.query?.serviceId,
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
          <ViewDetailBackArrowIcon />
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
        <Grid item xs={12} md={6} lg={4} key={serviceData.id}>
          <Box
            key={serviceData.id}
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
                src={serviceData.image}
                height={56}
                width={58}
                alt={`Service ${serviceData.id} Image`}
              />
            </Box>
            <Box
              alignItems={'flex-start'}
              display={'flex'}
              justifyContent={'flex-start'}
              flexDirection={'column'}
              mt={2}
            >
              <Typography variant="h5">{serviceData.title}</Typography>

              <Typography variant="body2" component={'span'}>
                {serviceData.description}
              </Typography>
              <Typography variant="body2" component={'span'}>
                {serviceData.price}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Box m={1}>
          <Typography variant="h5">{serviceData.title}</Typography>
          {serviceData.title === 'Adobe Photoshop CC' && (
            <>
              <Typography variant="body3">Description:</Typography>
              <Box maxWidth={'65%'} mb={1}>
                <Typography variant="body4">
                  {serviceData?.serviceDescription}
                </Typography>
              </Box>
              <Typography variant="body3">Features:</Typography>
              <Box maxWidth={'9%'} mb={1}>
                <Typography variant="body4">{serviceData?.feature}</Typography>
              </Box>
              <Box maxWidth={'100%'} mb={1}>
                <Typography variant="body4">{serviceData?.platform}</Typography>
              </Box>
              <Typography variant="body2">System Requirement:</Typography>
              <Typography variant="body2">Windows:</Typography>
              <Box maxWidth={'100%'} ml={2}>
                <ul>
                  <Typography variant="body4">
                    <li>
                      Intel Pentium 4 or AMD Athlon 64 processor (2GHz or
                      faster)
                    </li>
                    <li>
                      Microsoft Windows 7 with Service Pack 1 or Windows 8
                    </li>
                    <li>
                      1GB of RAM (3GB recommended) for 32-bit; 2GB of RAM (8GB
                      recommended) for 64-bit
                    </li>
                    <li>2GB of available hard-disk space for installation</li>
                  </Typography>
                </ul>
              </Box>
              <Typography variant="body2">Mac OS:</Typography>
              <Box maxWidth={'100%'} ml={2}>
                <ul>
                  <Typography variant="body4">
                    <li>Multicore Intel processor with 64-bit support</li>
                    <li>Mac OS X v10.6.8, v10.7, or v10.8</li>
                    <li>2GB of RAM (8GB recommended)</li>
                    <li>2GB of available hard-disk space for installation</li>
                  </Typography>
                </ul>
              </Box>
            </>
          )}
        </Box>
        <Grid item xs={12}>
          {serviceData.title === 'Adobe Photoshop CC' ? (
            <Box
              display={'flex'}
              alignItems={'end'}
              justifyContent={'end'}
              flexDirection={'row'}
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
          ) : (
            <Box
              display={'flex'}
              alignItems={'end'}
              justifyContent={'end'}
              flexDirection={'row'}
              mt={'35rem'}
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
          )}
          <CatalogRequest open={open} setOpen={setOpen} />
        </Grid>
      </Grid>
    </>
  );
}

export default CatalogService;
