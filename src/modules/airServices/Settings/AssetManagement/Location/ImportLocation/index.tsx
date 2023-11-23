import { Box, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useImportLocation } from './useImportLocation';

export const ImportLocation = (props: any) => {
  const { isDrawerOpen } = props;
  const { handleSubmit, submitImportLocation, methods, onClose } =
    useImportLocation(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => onClose()}
      okText={'Import'}
      title={'Location Import'}
      submitHandler={() => handleSubmit(submitImportLocation)()}
      isOk
      cancelText={'Cancel'}
      footer
    >
      <Box mt={1}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitImportLocation)}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="body2">Add File</Typography>
              <RHFDropZone />
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
