import CommonDrawer from '@/components/CommonDrawer';

import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useAddNewVendor } from './useAddNewVendor';
import { newVendorDataArray } from './AddNewVendor.data';

const AddNewVendor = (props: any) => {
  const { isADrawerOpen } = props;

  const { methodsNewVendor, handleSubmit, onSubmit, onClose } =
    useAddNewVendor(props);

  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isADrawerOpen}
        onClose={() => onClose?.()}
        title="New Vendor"
        okText="Save"
        isOk
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box>
          <FormProvider
            methods={methodsNewVendor}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              {newVendorDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default AddNewVendor;
