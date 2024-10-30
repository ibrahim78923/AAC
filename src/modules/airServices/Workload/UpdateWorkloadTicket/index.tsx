import CommonDrawer from '@/components/CommonDrawer';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTicket } from './useUpdateWorkloadTicket';

export const UpdateWorkloadTicket = ({ openDrawer, onClose, data }: any) => {
  const {
    handleSubmit,
    onSubmit,
    methods,
    patchTicketStatus,
    workloadTicketDataArray,
  } = useUpdateWorkloadTicket({
    onClose,
    dataGet: data,
  });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={data?.extendedProps?.ticketIdNumber}
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={patchTicketStatus?.isLoading}
      isDisabled={patchTicketStatus?.isLoading}
      isLoading={patchTicketStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {workloadTicketDataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
