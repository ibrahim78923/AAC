import { ImportIcon } from '@/assets/icons';
import {
  AppBar,
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
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            width={
              modalStep === 3
                ? { lg: '700px', md: '500px', sm: '500px', xs: '100vw' }
                : { lg: '520px', md: '500px', sm: '500px', xs: '100vw' }
            }
          >
            <AppBar
              sx={{
                backgroundColor: theme?.palette?.common?.white,
                color: theme?.palette?.common?.black,
                boxShadow: 'none',
              }}
              position="static"

            >
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pt: '20px',
                }}
              >
                <Box
                  sx={{
                    marginBottom: '20px',
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle1" textTransform="capitalize">
                    Import Data
                  </Typography>
                </Box>
                <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
                  <CloseIcon />
                </Box>
              </Toolbar>
            </AppBar>
            <Box flex="1" overflow="scroll">
              <Container>
                <Box marginY={2} />

                <Chip label={`Step ${modalStep} of 3`} color="secondary" />
                <FormProvider methods={methodsImportModalForm}>
                  {steps[modalStep]}
                </FormProvider>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: 24,
                    bottom: 8,
                    zIndex: 50,
                    minWidth: '800px',
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
                </Box>
              </Container>
            </Box>
            <Toolbar
              sx={{
                borderTop: 1,
                borderColor: theme?.palette?.custom?.dark,
              }}
            />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default ImportModal;
