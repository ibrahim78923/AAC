import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTierDataArray } from './UpsertTier.data';
import { useUpsertTier } from './useUpsertTier';

export const UpsertTier = (props: any) => {
  const { isDrawerOpen, tierId } = props;
  const { closeUpsertTier, handleSubmit, submitTierForm, upsertTierMethod } =
    useUpsertTier(props);

  return (
    <CommonDrawer
      isOk
      variant={'contained'}
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeUpsertTier?.()}
      okText={!!tierId ? 'Update' : 'Create'}
      title={!!tierId ? 'Edit Tier' : 'Create Tier'}
      submitHandler={() => handleSubmit?.(submitTierForm)?.()}
      isFooterFeatureText="Define Term"
      cancelText={'Cancel'}
      footer
      isFooterFeature
    >
      <Box mt={1}>
        <FormProvider methods={upsertTierMethod}>
          <Grid container spacing={2}>
            {upsertTierDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.heading && item?.heading}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
