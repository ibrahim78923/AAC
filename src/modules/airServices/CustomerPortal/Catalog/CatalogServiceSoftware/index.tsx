import { Box, Typography } from '@mui/material';
import React from 'react';
import { allServices } from '../Catalog.data';
import { useRouter } from 'next/router';

const CatalogServiceSoftware = () => {
  const router = useRouter();
  const serviceData = allServices?.find(
    (service: any) => service?.id == router?.query?.serviceId,
  );
  return (
    <>
      <Typography variant="body3">Description:</Typography>
      <Box maxWidth={'65%'} mb={1}>
        <Typography variant="body4">
          {serviceData?.serviceDescription}
        </Typography>
      </Box>
      <>
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
                Intel Pentium 4 or AMD Athlon 64 processor (2GHz or faster)
              </li>
              <li>Microsoft Windows 7 with Service Pack 1 or Windows 8</li>
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
    </>
  );
};
export default CatalogServiceSoftware;
