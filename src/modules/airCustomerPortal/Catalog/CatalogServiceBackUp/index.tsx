import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { allServices } from '../Catalog.data';
import { useRouter } from 'next/router';
import { FormProvider } from '@/components/ReactHookForm';
import useCatalogService from '../CatalogService/useCatalogService';
import { dataBackUp } from '../CatalogService/CatalogService.data';
const CatalogServiceBackUp = () => {
  const router = useRouter();
  const serviceData = allServices?.find(
    (service: any) => service?.id == router?.query?.serviceId,
  );
  const { method, onSubmit } = useCatalogService();
  return (
    <>
      <Typography variant="body3">Description:</Typography>
      <Box maxWidth={'65%'} mb={1}>
        <Typography variant="body4">
          {serviceData?.serviceDescription}
        </Typography>
      </Box>
      <FormProvider methods={method} onSubmit={onSubmit}>
        <Grid container spacing={5} mt={4}>
          {dataBackUp?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </>
  );
};
export default CatalogServiceBackUp;
