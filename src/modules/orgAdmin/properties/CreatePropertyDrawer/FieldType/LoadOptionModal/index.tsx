import CommonModal from '@/components/CommonModal';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Typography, useTheme } from '@mui/material';

const LoadOptionModal = (props: any) => {
  const {
    isOpenLoadOptionModal,
    onClose,
    handleOpenPropertyModal,
    handleOpenOwnOptionsModal,
  } = props;
  const theme = useTheme();

  return (
    <>
      <CommonModal
        title=""
        open={isOpenLoadOptionModal}
        handleClose={onClose}
        handleSubmit={() => {}}
        okText="Load Options"
        cancelText="Cancel"
        footer
      >
        <RHFAutocomplete
          name="loadOption"
          label="Load Options"
          placeholder="Choose Option"
          size="small"
          options={[
            'United States',
            'Country',
            'Timezone',
            'Days of the week',
            'Month of the year',
            'Year',
          ]}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
        >
          <Typography
            variant="body1"
            sx={{ color: theme?.palette?.primary?.main, cursor: 'pointer' }}
            onClick={handleOpenOwnOptionsModal}
          >
            Paste in your own options
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme?.palette?.primary?.main, cursor: 'pointer' }}
            onClick={handleOpenPropertyModal}
          >
            Copy from property
          </Typography>
        </Box>
      </CommonModal>
    </>
  );
};

export default LoadOptionModal;
