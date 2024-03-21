import { ImportIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Button, Chip } from '@mui/material';
import { useImportModal } from './useImportModal';
import { FormProvider } from '@/components/ReactHookForm';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { requiredColumns } from './ImportModal.data';
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
    csvFileData,
    handleImportTable,
  } = useImportModal();

  const steps: any = {
    1: (
      <FirstStep
        handleSelect={handleSelect}
        importLog={importLog}
        product={product}
      />
    ),
    2: <SecondStep requiredColumns={requiredColumns} />,
    3: (
      <ThirdStep
        csvFileData={csvFileData}
        importLog={importLog}
        handleImportTable={handleImportTable}
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
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetImportModalForm}
            >
              {modalStep === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(submitImportModalForm)}
              disabled={
                !!!importLog ||
                product === null ||
                (modalStep === 2 && importDeals === null)
              }
            >
              {modalStep === 3 ? 'Import' : 'Next'}
            </Button>
          </Box>
        </CommonDrawer>
      )}
    </>
  );
};

export default ImportModal;
