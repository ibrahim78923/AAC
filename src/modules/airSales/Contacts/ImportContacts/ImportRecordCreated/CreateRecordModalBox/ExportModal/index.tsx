import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFCheckbox } from '@/components/ReactHookForm';

import { ExportRecordIcon } from '@/assets/icons';

const ExportModal = ({ open, onClose }: any) => {
  const methods: any = useForm({
    defaultValues: {
      csv: '',
      xls: '',
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = async () => {};
  return (
    <>
      <CommonModal
        open={open}
        handleClose={onClose}
        title="Export Record"
        okText={'Export'}
        cancelText={'Cancel'}
        footer={true}
        headerIcon={<ExportRecordIcon />}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={6}>
              <RHFCheckbox name="csv" label="CSV" />
            </Grid>
            <Grid item xs={6}>
              <RHFCheckbox name="xls" label="XLS" />
            </Grid>
          </Grid>
        </FormProvider>
      </CommonModal>
    </>
  );
};

export default ExportModal;
