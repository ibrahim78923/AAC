import React from 'react';
import useCatalogRequest from '../CatalogRequest/useCatalogRequest';
import { useRouter } from 'next/router';
import { allsServices } from '../Catalog.data';
import { Button, DialogActions, DialogContent, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { placeRequest } from '../CatalogRequest/CatalogRequest.data';
import { useWatch } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
function CatalogItemRequest() {
  const { methodRequest, onSubmitRequest, control, getValues } =
    useCatalogRequest();
  useWatch({ control, name: 'requestForSomeOneElse' });
  const router = useRouter();
  const serviceData: any = allsServices?.find(
    (x: any) => x?.id == router?.query?.serviceId,
  );
  const { serviceId } = serviceData;

  return (
    <DialogContent dividers>
      <FormProvider methods={methodRequest} onSubmit={onSubmitRequest}>
        <Grid container spacing={2}>
          {placeRequest?.map((item: any) => {
            const { shouldDisplay } = item;
            let display = true;
            if (shouldDisplay)
              display = shouldDisplay({ getValues, other: { serviceId } });
            if (!display) return null;
            return (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            );
          })}
        </Grid>
        <DialogActions>
          <Button>cancel</Button>
          <Button variant="contained" type="submit">
            confirm
          </Button>
        </DialogActions>
      </FormProvider>
    </DialogContent>
  );
}

export default CatalogItemRequest;
