import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useAddTime } from './useAddTime';

export const AddTime = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    addTimeFormFields,
    isDrawerOpen,
    postTicketStatus,
    closeDrawer,
  } = useAddTime(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => closeDrawer?.()}
      title="Add Time"
      submitHandler={handleSubmit(onSubmit)}
      footer
      isOk
      okText="Submit"
      isLoading={postTicketStatus?.isLoading}
      isDisabled={postTicketStatus?.isLoading}
      disabledCancelBtn={postTicketStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {addTimeFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
