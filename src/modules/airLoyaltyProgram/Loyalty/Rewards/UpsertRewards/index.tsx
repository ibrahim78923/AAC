import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertRewards } from './useUpsertRewards';
import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  rewardsRadioButtonsFormFields,
  upsertRewardsData,
} from './UpsertRewards.data';
import { Attachments } from '@/components/Attachments';
import { AIR_LOYALTY_PROGRAM_LOYALTY_REWARDS_PERMISSIONS } from '@/constants/permission-keys';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ARRAY_INDEX } from '@/constants/strings';

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
    refetch,
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
        <ApiRequestFlow
          showSkeleton={isFetching || isLoading}
          hasError={isError}
          refreshApi={refetch}
        >
          <Box mt={1}>
            <FormProvider methods={methods}>
              <FormGrid formFieldsList={upsertRewardsData(watch)} />
              <Box mt={2}>
                {rewardsRadioButtonsFormFields?.map((form: any) => {
                  return (
                    <>
                      <CustomGrid md={form?.gridLength} key={form?.id}>
                        <form.component
                          {...form?.componentProps}
                          size="small"
                        />
                      </CustomGrid>
                      {watch(form?.componentProps?.name) ===
                        form?.componentProps?.options?.[ARRAY_INDEX?.ONE]
                          ?.value && (
                        <CustomGrid
                          md={form?.gridLength}
                          customStyles={{ mt: 2 }}
                        >
                          {form?.conditionalComponentOne}
                        </CustomGrid>
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
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};
