import React from 'react';
import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { services } from './Catalog.data';
import useCatalog from './useCatalog';

const Catalog = () => {
  const theme = useTheme();
  const { handleClick, result, handleClickService } = useCatalog();
  return (
    <>
      <Typography variant="h3">All Services</Typography>
      <Grid container spacing={2}>
        {services?.map((service) => (
          <Grid item xs={12} md={6} lg={3} key={uuidv4()}>
            <Box
              onClick={() => handleClick(service?.title)}
              borderRadius={2}
              border={'0.2rem solid'}
              borderColor={'primary.lighter'}
              textAlign="center"
              mt={2}
              p={2}
              sx={{ cursor: 'pointer' }}
            >
              <Box textAlign={'center'}>
                <Avatar
                  sx={{
                    backgroundColor: theme?.palette?.primary?.light,
                    margin: 'auto',
                  }}
                  alt={`Service ${service?.id} Image`}
                >
                  <service.image />
                </Avatar>
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
                  ml={2}
                  mr={2}
                >
                  {service?.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        {result?.map((allService: any) => (
          <Grid item xs={12} md={6} lg={4} key={uuidv4()}>
            <Box
              key={uuidv4()}
              onClick={() => handleClickService?.(allService?.id)}
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
                  src={allService?.image}
                  height={56}
                  width={58}
                  alt={`Service ${allService?.id} Image`}
                />
              </Box>
              <Box
                alignItems={'flex-start'}
                display={'flex'}
                justifyContent={'flex-start'}
                flexDirection={'column'}
                mt={2}
              >
                <Typography variant="h5">{allService?.title}</Typography>

                <Typography variant="body2" component={'span'}>
                  {allService?.description}
                </Typography>
                <Typography variant="body2" component={'span'}>
                  {allService?.price}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Catalog;
