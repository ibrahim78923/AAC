import React from 'react';
import useCatalogRequest from '../CatalogRequest/useCatalogRequest';
import { useRouter } from 'next/router';
import { allServices } from '../Catalog.data';
import { Box, DialogContent, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { placeRequest } from '../CatalogRequest/CatalogRequest.data';
import { useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

const CatalogItemRequest = ({ handleClose }: any) => {
  const { methodRequest, onSubmitRequest, control, getValues } =
    useCatalogRequest();
  useWatch<any>({ control, name: 'requestForSomeOneElse' });
  const router = useRouter();
  const serviceData: any = allServices?.find(
    (service: any) => service?.id == router?.query?.serviceId,
  );
  const { serviceId } = serviceData;

  return (
    <DialogContent dividers>
      <FormProvider methods={methodRequest} onSubmit={onSubmitRequest}>
        <Grid container>
          {placeRequest?.map((item: any) => {
            const { shouldDisplay } = item;
            let display = true;
            shouldDisplay &&
              (display = shouldDisplay({ getValues, other: { serviceId } }));
            if (!display) return <></>;
            return (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            );
          })}
        </Grid>
        <Box display={'flex'} justifyContent={'flex-end'} gap={1}>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            cancel
          </LoadingButton>
          <LoadingButton variant="contained" type="submit">
            confirm
          </LoadingButton>
        </Box>
      </FormProvider>
    </DialogContent>
  );
};

export default CatalogItemRequest;
