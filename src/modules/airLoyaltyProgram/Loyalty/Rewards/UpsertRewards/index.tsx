import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRewards } from './useUpsertRewards';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  rewardsRadioButtonsFormFields,
  upsertRewardsData,
} from './UpsertRewards.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';

export const UpsertRewards = (props: any) => {
  const { isRewardDrawerOpen, setIsRewardDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    watch,
    onSubmit,
    rewardsStatus,
    getTiersDropdown,
    updateRewardStatus,
    isLoading,
    isFetching,
    isError,
  } = useUpsertRewards(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isRewardDrawerOpen?.isOpen}
        onClose={() => setIsRewardDrawerOpen?.(false)}
        okText={'Create'}
        title={'Create Reward'}
        submitHandler={handleSubmit(onSubmit)}
        isOk
        cancelText={'Cancel'}
        footer
        isLoading={rewardsStatus?.isLoading || updateRewardStatus?.isLoading}
        isDisabled={rewardsStatus?.isLoading || updateRewardStatus?.isLoading}
        disabledCancelBtn={
          rewardsStatus?.isLoading || updateRewardStatus?.isLoading
        }
      >
        {isFetching || isLoading ? (
          <SkeletonForm />
        ) : isError ? (
          <ApiErrorState />
        ) : (
          <Box mt={1}>
            <FormProvider methods={methods}>
              <Grid container spacing={2}>
                {upsertRewardsData(getTiersDropdown)?.map((item: any) => (
                  <Grid item xs={12} md={item?.md} key={item?.id}>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Grid>
                ))}
              </Grid>
              <Box mt={2}>
                {rewardsRadioButtonsFormFields?.map((form: any) => {
                  return (
                    <>
                      <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                        <form.component
                          {...form?.componentProps}
                          size="small"
                        />
                      </Grid>
                      {watch(form?.componentProps?.name) ===
                        form?.componentProps?.options?.[1]?.value && (
                        <Grid item xs={12} md={form?.gridLength} mt={2}>
                          {form?.conditionalComponentOne}
                        </Grid>
                      )}
                    </>
                  );
                })}
              </Box>
            </FormProvider>
          </Box>
        )}
      </CommonDrawer>
    </>
  );
};
