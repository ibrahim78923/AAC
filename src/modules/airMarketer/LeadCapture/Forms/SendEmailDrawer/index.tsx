import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { formFields } from './SendEmailDrawer.data';
import useSendEmailDrawer from './useSendEmailDrawer';

const SendEmailDrawer = (props: any) => {
  const { open, onClose } = props;
  const {
    customersData,
    customersGroupData,
    methods,
    watchIsCustomers,
    watchIsCustomersGroup,
    handleFormSubmit,
  } = useSendEmailDrawer();

  const getFormFields = formFields(
    !!watchIsCustomers,
    !!watchIsCustomersGroup,
    customersData,
    customersGroupData,
  );

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      title={'Send To'}
      okText={'Send'}
      footer={true}
      isOk={true}
      submitHandler={handleFormSubmit}
      // isLoading={loading}
    >
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={'22px'}>
            {getFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default SendEmailDrawer;
