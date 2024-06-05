import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useAddCallTags } from './useAddCallTags';

const AddCallTags = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    cancelAddCallTagsForm,
    addCallTagsFormFields,
  } = useAddCallTags(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="Add Call Tag"
      okText="Add"
      cancelText="cancel"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => cancelAddCallTagsForm?.()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {addCallTagsFormFields?.map((item: any) => (
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

export default AddCallTags;
