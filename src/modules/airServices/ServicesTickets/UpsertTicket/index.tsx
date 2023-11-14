import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useUpsertTicket } from './useUpsertTicket';
import { upsertTicketFormFields } from './UpsertTicket.data';

export const UpsertTicket = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    isFetching,
    onClose,
    isLoading,
    ticketId,
  } = useUpsertTicket(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={!!ticketId ? 'Update' : 'Submit'}
      title={!!ticketId ? 'Edit Ticket' : 'Create New Ticket'}
      submitHandler={() => handleSubmit(submitUpsertTicket)()}
      isOk
      cancelText={'Cancel'}
      footer
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : (
        <Box mt={1}>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertTicket)}
          >
            <Grid container spacing={4}>
              {upsertTicketFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
};
