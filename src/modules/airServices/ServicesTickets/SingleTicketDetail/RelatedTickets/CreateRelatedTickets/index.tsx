import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  createTicketDataArray,
  createTicketDefaultValues,
  createTicketValidationSchema,
} from './CreateRelatedTickets.data';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

function CreateRelatedTickets({ isDrawerOpen, setIsDrawerOpen }: any) {
  const methods: any = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const { handleSubmit } = methods;

  const submit = () => {
    enqueueSnackbar('child ticket added successfully', {
      variant: 'success',
    });
  };
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title="Add child ticket"
        submitHandler={() => methods?.handleSubmit(submit)()}
        footer={true}
        isOk={true}
        okText="Add child ticket"
      >
        <Box mt={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit?.(submit)}>
            <Grid container spacing={4}>
              {createTicketDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}

export default CreateRelatedTickets;
