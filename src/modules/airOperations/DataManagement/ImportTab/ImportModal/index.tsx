import { ImportIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Button, Chip } from '@mui/material';
import { useImportModal } from './useImportModal';
import { FormProvider } from '@/components/ReactHookForm';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { stepsData } from './ImportModal.data';
import { LoadingButton } from '@mui/lab';
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
        <CommonDrawer
          isDrawerOpen={isDrawerOpen}
          onClose={handleClose}
          okText={modalStep === 3 ? 'Import' : 'Next'}
          title={'Import Data'}
          isOk={true}
          cancelText={modalStep === 1 ? 'Cancel' : 'Back'}
        >
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
        </CommonDrawer>
      )}
    </>
  );
};

export default ImportModal;
