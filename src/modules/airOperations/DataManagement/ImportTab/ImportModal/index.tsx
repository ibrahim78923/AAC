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
} from '@mui/material';
import { useImportModal } from './useImportModal';
import { FormProvider } from '@/components/ReactHookForm';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import { stepsData } from './ImportModal.data';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@/assets/icons/shared/close-icon';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
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
    theme,
    productOptions,
    isLoading,
    isFetching,
  } = useImportModal();
  const steps: any = {
    1: (
      <FirstStep
        handleSelect={handleSelect}
        importLog={importLog}
        product={product}
        productOptions={productOptions}
      />
    ),
    2: (
      <SecondStep
        requiredColumns={stepsData[importLog]}
        handlePreview={handlePreview}
        productOptions={productOptions}
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
        className="small"
      >
        Import
      </Button>
      {isDrawerOpen &&
        (isLoading || isFetching ? (
          <SkeletonTable />
        ) : (
          <Drawer open={isDrawerOpen} onClose={handleClose} anchor="right">
            <Box
              display="flex"
              flexDirection="column"
              minHeight="100vh"
              width={
                modalStep === 3
                  ? { md: '45rem', xs: '100vw' }
                  : { sm: '35rem', xs: '100vw' }
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
                    pt: 1,
                  }}
                >
                  <Typography variant="subtitle1" textTransform="capitalize">
                    Import Data
                  </Typography>
                  <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
                    <CloseIcon />
                  </Box>
                </Toolbar>
              </AppBar>
              <Box flex="1" overflow="scroll">
                <Container>
                  <Chip label={`Step ${modalStep} of 3`} color="secondary" />
                  {modalStep === 3 && (
                    <Typography fontWeight={600} color="custom.main">
                      Map Columns from your file to the right CRM fields.
                    </Typography>
                  )}
                  <FormProvider methods={methodsImportModalForm}>
                    {steps[modalStep]}
                  </FormProvider>
                </Container>
              </Box>
              <Box position="static">
                <Toolbar
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 1,
                    padding: 1.5,
                    borderTop: 1,
                    borderColor: theme?.palette?.custom?.dark,
                  }}
                >
                  <Box display={'flex'} gap={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={resetImportModalForm}
                      className="small"
                      disabled={
                        lazyGetSignedUrlForImportStatus?.isLoading ||
                        uploadFileTos3UsingSignedUrlStatus?.isLoading ||
                        importFileStatus?.isLoading ||
                        newImportFileForServicesStatus?.isLoading
                      }
                    >
                      {modalStep === 1
                        ? GENERIC_UPSERT_FORM_CONSTANT?.CANCEL
                        : GENERIC_UPSERT_FORM_CONSTANT?.BACK}
                    </Button>
                    <LoadingButton
                      variant="contained"
                      className="small"
                      loading={
                        uploadFileTos3UsingSignedUrlStatus?.isLoading ||
                        lazyGetSignedUrlForImportStatus?.isLoading ||
                        importFileStatus?.isLoading ||
                        newImportFileForServicesStatus?.isLoading
                      }
                      onClick={handleSubmit(submitImportModalForm)}
                      disabled={
                        !!!importLog ||
                        product === null ||
                        (modalStep === 2 && importDeals === null)
                      }
                    >
                      {modalStep === 3
                        ? GENERIC_UPSERT_FORM_CONSTANT?.IMPORT
                        : GENERIC_UPSERT_FORM_CONSTANT?.NEXT}
                    </LoadingButton>
                  </Box>
                </Toolbar>
              </Box>
            </Box>
          </Drawer>
        ))}
    </>
  );
};

export default ImportModal;
