import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTierDataArray } from './UpsertTier.data';
import { useUpsertTier } from './useUpsertTier';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

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
    isLoading,
    isError,
    isFetching,
    updateTierProgress,
  } = useUpsertTier(props);

  return (
    <CommonDrawer
      isOk
      variant={'contained'}
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeUpsertTier?.()}
      okText={!termData ? (!!tierId?._id ? 'Update' : 'Create') : 'Done'}
      title={!!tierId?._id ? 'Edit Tier' : 'Create Tier'}
      submitHandler={
        !termData
          ? () => handleSubmit?.(submitTierForm)?.()
          : () => setTermData?.(false)
      }
      isFooterFeatureText="Define Term"
      isFooterFeatureHandler={() => setTermData?.(true)}
      cancelText={'Cancel'}
      footer
      isFooterFeature={!termData}
      isLoading={postTierProgress?.isLoading || updateTierProgress?.isLoading}
      isDisabled={postTierProgress?.isLoading || updateTierProgress?.isLoading}
      disabledCancelBtn={
        postTierProgress?.isLoading || updateTierProgress?.isLoading
      }
    >
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState />
      ) : (
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
      )}
    </CommonDrawer>
  );
};
