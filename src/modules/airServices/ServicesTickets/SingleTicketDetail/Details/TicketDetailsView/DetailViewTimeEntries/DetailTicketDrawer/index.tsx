import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useDetailTicketDrawer } from './useDetailTicketDrawer';

export const DetailTicketDrawer = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    ticketDetailsFormFields,
    isDrawerOpen,
    setIsDrawerOpen,
    booleanVar,
    postTicketStatus,
    isError,
  } = useDetailTicketDrawer(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add Time"
      submitHandler={handleSubmit(onSubmit)}
      footer={true}
      isOk={true}
      okText={booleanVar === true ? 'submit' : 'Start timer'}
      isLoading={postTicketStatus?.isLoading}
      isDisabled={isError || postTicketStatus?.isLoading}
      disabledCancelBtn={isError || postTicketStatus?.isLoading}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {ticketDetailsFormFields?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
