import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { createTicketDataArray } from './CreateTicket.data';
import { v4 as uuidv4 } from 'uuid';
import { useCreateTicket } from './useCreateTicket';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

function CreateTicket(props: any) {
  const { isDrawerOpen } = props;
  const {
    handleSubmit,
    submitCreateNewTicket,
    methods,
    isFetching,
    onClose,
    isLoading,
  } = useCreateTicket(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose?.()}
      okText={'Submit'}
      title={'Create New Ticket'}
      submitHandler={() => handleSubmit(submitCreateNewTicket)()}
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
            onSubmit={handleSubmit(submitCreateNewTicket)}
          >
            <Grid container spacing={4}>
              {createTicketDataArray?.map((item: any) => (
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
}

export default CreateTicket;
