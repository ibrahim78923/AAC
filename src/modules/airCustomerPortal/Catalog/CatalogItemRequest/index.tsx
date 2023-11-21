import React from 'react';
import useCatalogRequest from '../CatalogRequest/useCatalogRequest';
import { useRouter } from 'next/router';
import { allServices } from '../Catalog.data';
import { DialogActions, DialogContent, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { placeRequest } from '../CatalogRequest/CatalogRequest.data';
import { useWatch } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

const CatalogItemRequest = () => {
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
        <Grid container spacing={2}>
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
        <DialogActions>
          <LoadingButton>cancel</LoadingButton>
          <LoadingButton variant="contained" type="submit">
            confirm
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </DialogContent>
  );
};

export default CatalogItemRequest;
