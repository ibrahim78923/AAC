import CommonDrawer from '@/components/CommonDrawer';
import { upsertFormFields } from './UpsertLocations.data';
import { useUpsertLocations } from './useUpsertLocations';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';

const UpsertLocations = (props: any) => {
  const { isDrawerOpen, onClose, isUpdate } = props;
  const { methods, handleSubmit, submitUpsertLocationForm } =
    useUpsertLocations(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose(false)}
      isOk
      okText={isUpdate ? 'Update' : 'Add'}
      footer
      title={isUpdate ? 'Update Location' : 'Add Location'}
      submitHandler={() => {
        methods.handleSubmit(submitUpsertLocationForm)();
      }}
    >
      <Box mt={1}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitUpsertLocationForm)}
        >
          <Grid container spacing={1}>
            {upsertFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default UpsertLocations;
