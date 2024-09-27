import { PageTitledHeader } from '@/components/PageTitledHeader';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { AIR_SERVICES } from '@/constants';
import { Box, Grid, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { predefinedAssetTypeDataArray } from './DefaultFields.data';
import { LoadingButton } from '@mui/lab';

export default function DefaultFields() {
  const theme: any = useTheme();
  const methods: any = useForm({});
  const router: any = useRouter();

  const moveBack = () => {
    router?.push({
      pathname: AIR_SERVICES?.ASSET_TYPE_SETTINGS,
    });
  };

  return (
    <>
      <PageTitledHeader
        moveBack={() => moveBack?.()}
        canMovedBack
        title={'Default Fields'}
      />

      <FormProvider methods={methods}>
        <Grid container rowSpacing={1.8} columnSpacing={2}>
          <Grid item xs={12} lg={9}>
            <Box
              p={2}
              borderRadius={3}
              border={`2px solid ${theme?.palette?.custom?.off_white_three}`}
            >
              <Grid container rowSpacing={1.8} columnSpacing={3}>
                {predefinedAssetTypeDataArray?.map((form: any) => (
                  <Grid item xs={12} md={form?.md} key={form.id}>
                    <form.component
                      {...form?.componentProps}
                      size={'small'}
                      disabled
                    >
                      {form?.heading ? form?.heading : null}
                    </form.component>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone name={'fileUrl'} disabled />
              </Box>
            </Box>

            <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
              <LoadingButton
                variant="outlined"
                color="secondary"
                onClick={() => moveBack?.()}
              >
                Back
              </LoadingButton>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={3}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            <RHFDropZone name={'fileUrl'} disabled />
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
