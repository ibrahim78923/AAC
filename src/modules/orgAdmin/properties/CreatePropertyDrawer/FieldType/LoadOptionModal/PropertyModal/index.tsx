import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

const PropertyModal = (props: any) => {
  const { open, onClose, handleCancelPropertyModal } = props;
  const methods = useForm({});

  return (
    <CommonModal
      title="Copy from property"
      open={open}
      handleClose={onClose}
      footer
      okText="Load Options"
      cancelText="Cancel"
      handleCancel={handleCancelPropertyModal}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} sx={{ p: 0 }}>
          <Grid item xs={12}>
            <RHFAutocomplete
              name="moduleType"
              label="Module Type"
              placeholder="Choose Module type"
              size="small"
              options={['Company', 'Company employee', 'Contact']}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutocomplete
              name="propertyOptions"
              label="Property to copy options from"
              placeholder="Choose Property"
              size="small"
              options={[
                'How helpful was our onboarding process?',
                'Industry standard question type',
              ]}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </CommonModal>
  );
};

export default PropertyModal;
