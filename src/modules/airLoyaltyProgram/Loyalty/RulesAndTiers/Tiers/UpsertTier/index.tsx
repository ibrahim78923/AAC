import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTierDataArray } from './UpsertTier.data';
import { useUpsertTier } from './useUpsertTier';

export const UpsertTier = (props: any) => {
  const { isDrawerOpen, tierId } = props;
  const {
    closeUpsertTier,
    handleSubmit,
    submitTierForm,
    upsertTierMethod,
    termData,
    setTermData,
    watch,
    apiContactQuery,
    postTierProgress,
  } = useUpsertTier(props);

  return (
    <CommonDrawer
      isOk
      variant={'contained'}
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeUpsertTier?.()}
      okText={!termData ? (!!tierId ? 'Update' : 'Create') : 'Done'}
      title={!!tierId ? 'Edit Tier' : 'Create Tier'}
      submitHandler={
        !termData
          ? () => handleSubmit?.(submitTierForm)?.()
          : () => setTermData(false)
      }
      isFooterFeatureText="Define Term"
      isFooterFeatureHandler={() => setTermData(true)}
      cancelText={'Cancel'}
      footer
      isFooterFeature={!termData}
      isLoading={postTierProgress?.isLoading}
      isDisabled={postTierProgress?.isLoading}
      disabledCancelBtn={postTierProgress?.isLoading}
    >
      <Box mt={1}>
        <FormProvider methods={upsertTierMethod}>
          <Grid container spacing={2}>
            {upsertTierDataArray({ termData, watch, apiContactQuery })?.map(
              (item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.id}
                  display={item?.component === Box ? 'none' : 'block'}
                >
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.heading && item?.heading}
                  </item.component>
                </Grid>
              ),
            )}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
