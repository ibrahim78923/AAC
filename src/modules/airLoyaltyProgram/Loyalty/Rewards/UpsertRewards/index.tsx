import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRewards } from './useUpsertRewards';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  rewardsRadioButtonsFormFields,
  upsertRewardsData,
} from './UpsertRewards.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { Attachments } from '@/components/Attachments';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';

export const UpsertRewards = (props: any) => {
  const { isRewardDrawerOpen, setIsRewardDrawerOpen } = props;
  const {
    methods,
    handleSubmit,
    watch,
    onSubmit,
    rewardsStatus,
    updateRewardStatus,
    isLoading,
    isFetching,
    isError,
    rewardId,
  } = useUpsertRewards(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isRewardDrawerOpen?.isOpen}
        onClose={() => setIsRewardDrawerOpen?.(false)}
        okText={rewardId ? 'Update' : 'Create'}
        title={rewardId ? 'Update Reward' : 'Create Reward'}
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
                {upsertRewardsData(watch)?.map((item: any) => (
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
                {!!rewardId && (
                  <>
                    <Typography fontWeight={500} color="slateBlue.main" mb={2}>
                      Attachments
                    </Typography>
                    <Box maxHeight={'20vh'}>
                      <Attachments
                        recordId={rewardId}
                        permissionKey={[
                          AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS?.VIEW_REWARD_DETAILS,
                        ]}
                        colSpan={{ sm: 12, lg: 12 }}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </FormProvider>
          </Box>
        )}
      </CommonDrawer>
    </>
  );
};
