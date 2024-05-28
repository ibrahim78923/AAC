import CommonModal from '@/components/CommonModal';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { Grid, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';

const OwnOptionsModal = (props: any) => {
  const { open, onClose, handleCancelOwnOptionsModal } = props;
  const methods = useForm({});
  const theme = useTheme();
  return (
    <CommonModal
      title="Paste in your own options"
      open={open}
      handleClose={onClose}
      footer
      okText="Load Options"
      cancelText="Cancel"
      handleCancel={handleCancelOwnOptionsModal}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} sx={{ p: 0 }}>
          <Grid item xs={12}>
            <RHFTextField
              name="ownLineOptions"
              label="Place your options on their own line"
              placeholder="Place your options on their own line"
              size="small"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              name="delimiter"
              label="Add delimiter (optional)"
              placeholder="Add a delimiter"
              size="small"
            />
          </Grid>
          <Typography
            variant="body4"
            color={theme?.palette?.grey[600]}
            sx={{ pl: 2 }}
          >
            Use a comma, semi-colon, or any custom text to seperate labels from
            values e.g “orcalo1, orcalo 1”
          </Typography>
        </Grid>
      </FormProvider>
    </CommonModal>
  );
};

export default OwnOptionsModal;
