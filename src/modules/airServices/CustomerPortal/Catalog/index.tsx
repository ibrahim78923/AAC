import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';

import { allsServices, services } from './Catalog.data';

function Catalog() {
  return (
    <>
      <Typography variant="h3">All Services</Typography>
      <Grid container justifyContent={'space-between'}>
        {services.map((service) => (
          <Box
            key={service.id}
            width={280}
            height={240}
            borderRadius={2}
            border={'0.2rem solid'}
            borderColor={'primary.lighter'}
            textAlign="center"
            mt={2}
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
                alt={`Service ${service.id} Image`}
              />
            </Box>
            <Typography variant="h5" mt={2}>
              {service.title}
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
                mt={2}
                p={1}
                width={'90%'}
              >
                {service.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Grid>
      <Grid container justifyContent={'space-between'}>
        {allsServices.map((allsService) => (
          <Box
            key={allsService.id}
            width={420}
            height={120}
            borderRadius={2}
            border={'0.3rem solid'}
            borderColor={'primary.lighter'}
            display={'flex'}
            flexDirection={'row'}
            mt={2}
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
        ))}
      </Grid>
    </>
  );
}

export default Catalog;
