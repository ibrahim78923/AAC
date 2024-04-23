import CommonDrawer from '@/components/CommonDrawer';
import { useAddRewardsForm } from './useAddRewardsForm';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addRewardsFormFields } from './AddRewardsForm.data';

export const AddRewardsForm = (props: any) => {
  const { openDrawer } = props;
  const { handleSubmit, methods, submitAddRewards, closeAddRewardsForm } =
    useAddRewardsForm(props);
  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => closeAddRewardsForm()}
      title={'Add Rewards'}
      okText={'Save'}
      isOk
      cancelText={'Close'}
      footer
      submitHandler={handleSubmit(submitAddRewards)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {addRewardsFormFields
              ?.filter(
                (fields: any) => fields?.type?.includes(openDrawer?.rewardType),
              )
              ?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
