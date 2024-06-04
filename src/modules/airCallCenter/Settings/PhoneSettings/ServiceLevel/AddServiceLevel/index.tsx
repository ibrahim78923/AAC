import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddServiceLevel } from './useAddServiceLevel';

const AddServiceLevel = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    cancelAddServiceLevelForm,
    addServiceLevelFormFields,
  } = useAddServiceLevel(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="New Service Level"
      okText="save"
      cancelText="cancel"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => cancelAddServiceLevelForm?.()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {addServiceLevelFormFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddServiceLevel;
