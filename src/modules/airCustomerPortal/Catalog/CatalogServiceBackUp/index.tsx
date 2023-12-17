import { Box, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { allServices } from '../Catalog.data';
import { useRouter } from 'next/router';
import { FormProvider } from '@/components/ReactHookForm';
import useCatalogService from '../CatalogService/useCatalogService';
import { dataBackUp } from '../CatalogService/CatalogService.data';
const CatalogServiceBackUp = () => {
  const theme: any = useTheme();
  const router = useRouter();
  const serviceData = allServices?.find(
    (service: any) => service?.id == router?.query?.serviceId,
  );
  const { method, onSubmit } = useCatalogService();
  return (
    <>
      <Box maxWidth={'65%'} sx={{ color: theme?.palette?.blue?.lighter }}>
        <Typography variant="body3">Description:</Typography>
        <br />
        <Typography variant="body4">
          {serviceData?.serviceDescription}
        </Typography>
      </Box>
      <FormProvider methods={method} onSubmit={onSubmit}>
        <Grid container spacing={5} mt={4}>
          {dataBackUp?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </>
  );
};
export default CatalogServiceBackUp;
