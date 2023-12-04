import { Box } from '@mui/material';
import React from 'react';
import { ServiceCatalogHardwareAction } from './ServiceCatalogHardwareAction';

const ServicesCatalogHardware = () => {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={2}
        ></Box>
        <Box>
          <ServiceCatalogHardwareAction />
        </Box>
      </Box>
    </>
  );
};

export default ServicesCatalogHardware;
