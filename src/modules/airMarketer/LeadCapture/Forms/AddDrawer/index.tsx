import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { formsArray } from './AddDrawer.data';

const AddDrawer = (props: any) => {
  const { isOpen, onClose, methods, onSubmit, loading } = props;

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={onClose}
      title={'Add Form'}
      okText={'Create'}
      footer={true}
      isOk={true}
      submitHandler={onSubmit}
      isLoading={loading}
    >
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {formsArray?.map((item: any) => (
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

export default AddDrawer;
