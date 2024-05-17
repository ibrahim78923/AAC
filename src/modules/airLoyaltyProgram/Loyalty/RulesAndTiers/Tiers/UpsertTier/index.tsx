import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTierDataArray } from './UpsertTier.data';
import { useUpsertTier } from './useUpsertTier';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Attachments } from '@/components/Attachments';
import { AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS } from '@/constants/permission-keys';

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
    isFormFilled,
  } = useUpsertTier(props);

  return (
    <CommonDrawer
      isOk
      variant={'contained'}
      isDrawerOpen={isDrawerOpen}
      onClose={
        !termData ? () => closeUpsertTier?.() : () => setTermData?.(false)
      }
      okText={!termData ? (!!tierId?._id ? 'Update' : 'Create') : 'Done'}
      title={!!tierId?._id ? 'Edit Tier' : 'Create Tier'}
      submitHandler={() => handleSubmit?.(submitTierForm)?.()}
      isFooterFeatureText="Define Term"
      isFooterFeatureHandler={() => setTermData?.(true)}
      cancelText={'Cancel'}
      footer
      isFooterFeature={!termData}
      isFooterFeatureDisabled={isFormFilled ? false : true}
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
            <br />

            {!!tierId?._id && (
              <>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="slateBlue.main"
                  mb={2}
                >
                  Attachments
                </Typography>
                <Box maxHeight={'20vh'}>
                  <Attachments
                    recordId={tierId?._id}
                    permissionKey={[
                      AIR_LOYALTY_PROGRAM_LOYALTY_RULES_AND_TIERS_PERMISSIONS?.EDIT_TIERS,
                    ]}
                    colSpan={{ sm: 12, lg: 12 }}
                  />
                </Box>
              </>
            )}
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
};
