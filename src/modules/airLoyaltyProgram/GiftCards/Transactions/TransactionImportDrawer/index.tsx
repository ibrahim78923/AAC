import { Button, Box } from '@mui/material';
import { ImportIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { useImportModal } from './useImportModal';
import { FormProvider } from '@/components/ReactHookForm';

import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { IMPORT_ACTIONS, IMPORT_ACTIONS_STEPS } from '@/constants/strings';

const ImportModal = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    methodsImportModalForm,
    submitImportModalForm,
    resetImportModalForm,
    modalStep,
    handleClose,
  } = useImportModal();

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
          okText={
            modalStep === IMPORT_ACTIONS_STEPS?.STEP_THREE
              ? IMPORT_ACTIONS?.IMPORT
              : IMPORT_ACTIONS?.NEXT
          }
          title={'Import Transaction'}
          submitHandler={submitImportModalForm}
          isOk={true}
          cancelText={
            modalStep === IMPORT_ACTIONS_STEPS?.STEP_ONE ? 'Cancel' : 'Back'
          }
        >
          <FormProvider methods={methodsImportModalForm}>
            {modalStep === IMPORT_ACTIONS_STEPS?.STEP_ONE && <FirstStep />}
            {modalStep === IMPORT_ACTIONS_STEPS?.STEP_TWO && <SecondStep />}
            {modalStep === IMPORT_ACTIONS_STEPS?.STEP_THREE && <ThirdStep />}
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
              {modalStep === IMPORT_ACTIONS_STEPS?.STEP_ONE ? 'Cancel' : 'Back'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={submitImportModalForm}
            >
              {modalStep === IMPORT_ACTIONS_STEPS?.STEP_THREE
                ? 'Import'
                : 'Next'}
            </Button>
          </Box>
        </CommonDrawer>
      )}
    </>
  );
};

export default ImportModal;
