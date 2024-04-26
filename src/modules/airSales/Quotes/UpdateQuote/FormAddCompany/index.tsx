import { Grid, Box, Alert, useTheme } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { dataArray } from './FormAddCompany.data';
import useFormAddContact from './useFormAddContact';
import { v4 as uuidv4 } from 'uuid';

const FormAddCompany = ({ open, onClose }: any) => {
  const theme = useTheme();
  const { onSubmit, handleSubmit, methods, contacts, loadingCompnayPost } =
    useFormAddContact(onClose);

  return (
    <CommonDrawer
      submitHandler={handleSubmit(onSubmit)}
      title="Your Company Information"
      isLoading={loadingCompnayPost}
      cancelBtnHandler={onClose}
      cancelText={'Cancel'}
      isDrawerOpen={open}
      onClose={onClose}
      okText="Add"
      footer
      isOk
    >
      <Box sx={{ pt: '27px' }}>
        <Alert
          severity="info"
          sx={{
            bgcolor: theme?.palette?.custom?.alice_blue,
            color: theme?.palette?.slateBlue['main'],
            fontSize: '14px',
            mb: '24px',
          }}
        >
          Changes you make here will only affect this quote. If you want to
          change your company info for future quotes, you can do that in your
          account&apos;s branding.
        </Alert>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {dataArray(contacts)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.name}>
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
    </CommonDrawer>
  );
};

export default FormAddCompany;
