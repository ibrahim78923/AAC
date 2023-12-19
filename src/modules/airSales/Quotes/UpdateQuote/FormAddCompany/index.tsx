import { Grid, Box, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addCompanyFields,
  validationSchema,
  initValues,
} from './FormAddCompany.data';

const FormAddCompany = ({ open, onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Ticket Updated Successfully', {
      variant: 'success',
    });
  };

  return (
    <CommonDrawer
      title="Your Company Information"
      okText="Add"
      isDrawerOpen={open}
      onClose={onClose}
      isOk={true}
      cancelText={'Cancel'}
      footer={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box sx={{ pt: '27px' }}>
        <Alert
          severity="info"
          sx={{
            bgcolor: '#E6F5FE',
            color: '#374151',
            fontSize: '14px',
            mb: '24px',
          }}
        >
          Changes you make here will only affect this quote. If you want to
          change your company info for future quotes, you can do that in your
          account&apos;s branding.
        </Alert>
        <FormProvider methods={methods}>
          <Grid container spacing={'32px'}>
            {addCompanyFields?.map((item) => (
              <Grid item xs={12} key={item.id}>
                <item.component {...item.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FormAddCompany;
