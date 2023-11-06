import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { services } from './Catalog.data';
import useCatalog from './useCatalog';

function Catalog() {
  const {
    handleClick,
    result,
    handleClickService,
    // open,
    // handleClickOpen,
    // handleClose,
  } = useCatalog();
  return (
    <>
      <Typography variant="h3">All Services</Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} md={6} lg={3} key={uuidv4()}>
            <Box
              onClick={() => handleClick(service?.title)}
              borderRadius={2}
              border={'0.2rem solid'}
              borderColor={'primary.lighter'}
              textAlign="center"
              mt={2}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                alignItems={'center'}
                display={'flex'}
                justifyContent={'center'}
              >
                <Image
                  src={service.image}
                  height={40}
                  width={40}
                  alt={`Service ${service?.id} Image`}
                />
              </Box>
              <Typography variant="h5" mt={2}>
                {service?.title}
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
                  width={'90%'}
                >
                  {service?.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        {result.map((allsService: any) => (
          <Grid item xs={12} md={6} lg={4} key={uuidv4()}>
            <Box
              key={uuidv4()}
              onClick={() => handleClickService?.(allsService.id)}
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
                <Image
                  src={allsService.image}
                  height={56}
                  width={58}
                  alt={`Service ${allsService.id} Image`}
                />
              </Box>
              <Box
                alignItems={'flex-start'}
                display={'flex'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                mt={2}
              >
                <Typography variant="h5">{allsService.title}</Typography>

                <Typography variant="body2" component={'span'}>
                  {allsService.description}
                </Typography>
                <Typography variant="body2" component={'span'}>
                  {allsService.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Catalog;
