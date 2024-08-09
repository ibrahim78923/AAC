import { ImportIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useImportModal } from './useImportModal';
import { FormProvider } from '@/components/ReactHookForm';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { stepsData } from './ImportModal.data';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@/assets/icons/shared/close-icon';
const ImportModal = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsImportModalForm,
    submitImportModalForm,
    resetImportModalForm,
    modalStep,
    handleClose,
    handleSelect,
    importLog,
    product,
    handleSubmit,
    importDeals,
    fields,
    handlePreview,
    remove,
    lazyGetSignedUrlForImportStatus,
    uploadFileTos3UsingSignedUrlStatus,
    importFileStatus,
    newImportFileForServicesStatus,
  } = useImportModal();
  const theme = useTheme();
  const steps: any = {
    1: (
      <FirstStep
        handleSelect={handleSelect}
        importLog={importLog}
        product={product}
      />
    ),
    2: (
      <SecondStep
        requiredColumns={stepsData[importLog]}
        handlePreview={handlePreview}
      />
    ),
    3: (
      <ThirdStep
        importLog={importLog}
        methodsImportModalForm={methodsImportModalForm}
        fields={fields}
        remove={remove}
      />
    ),
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ImportIcon />}
        color="secondary"
        onClick={() => setIsDrawerOpen(true)}
      >
        Import
      </Button>
      {isDrawerOpen && (
        <Drawer anchor="right" open={isDrawerOpen} onClose={handleClose}>
          <Box
            width={
              modalStep === 3
                ? { md: '45rem', xs: '100vw' }
                : { sm: '35rem', xs: '100vw' }
            }
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={2}
            >
              <Typography variant="h3" textTransform="capitalize">
                Import Data
              </Typography>
              <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
                <CloseIcon />
              </Box>
            </Box>
            <Container>
              <Chip label={`Step ${modalStep} of 3`} color="secondary" />
              {modalStep === 3 && (
                <Typography fontWeight={600} color="custom.main" mt={1.5}>
                  Map Columns from your file to the right CRM fields.
                </Typography>
              )}
              <Box
                height={modalStep === 3 ? '47rem' : '49rem'}
                overflow={'scroll'}
                mt={1}
              >
                <FormProvider methods={methodsImportModalForm}>
                  {steps[modalStep]}
                </FormProvider>
              </Box>
              <Toolbar
                sx={{
                  borderTop: 1,
                  borderColor: theme?.palette?.custom?.dark,
                  mt: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={resetImportModalForm}
                  disabled={
                    lazyGetSignedUrlForImportStatus?.isLoading ||
                    uploadFileTos3UsingSignedUrlStatus?.isLoading ||
                    importFileStatus?.isLoading ||
                    newImportFileForServicesStatus?.isLoading
                  }
                >
                  {modalStep === 1 ? 'Cancel' : 'Back'}
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(submitImportModalForm)}
                  disabled={
                    !!!importLog ||
                    product === null ||
                    (modalStep === 2 && importDeals === null)
                  }
                  loading={
                    uploadFileTos3UsingSignedUrlStatus?.isLoading ||
                    lazyGetSignedUrlForImportStatus?.isLoading ||
                    importFileStatus?.isLoading ||
                    newImportFileForServicesStatus?.isLoading
                  }
                >
                  {modalStep === 3 ? 'Import' : 'Next'}
                </LoadingButton>
              </Toolbar>
            </Container>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default ImportModal;
