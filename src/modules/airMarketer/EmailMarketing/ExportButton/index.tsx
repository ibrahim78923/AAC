import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useExportButton } from './useExportButton';
import { exportButtonFormFields } from './ExportButton.data';

export const ExportButton = (props: any) => {
  const { isExportModalOpen, handleExportModalOpen } = props;
  const { methods, handleSubmit, onSubmit } = useExportButton();

  return (
    <CommonDrawer
      isOk={handleExportModalOpen}
      isDrawerOpen={isExportModalOpen}
      onClose={handleExportModalOpen}
      okText="Save"
      title="Create Rules"
      cancelText={'Cancel'}
      footer
    >
      <Box mt={1}>
        <FormProvider methods={methods} onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={1}>
            {exportButtonFormFields?.map((item: any) => (
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
