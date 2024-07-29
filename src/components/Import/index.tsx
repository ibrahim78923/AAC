import { FormProvider, RHFFileImport } from '@/components/ReactHookForm';
import { useImport } from './useImport';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { MappedColumns } from './MappedColumns';
import { FiberManualRecord } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

export const Import = (props: any) => {
  const {
    isDrawerOpen,
    title,
    crmColumnsOptions,
    importFileStatus,
    mandatoryColumnsList = [],
    labelForImport = 'Add File',
  } = props;

  const {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
    showItemsList,
    fields,
    remove,
    uploadFileTos3UsingSignedUrlStatus,
    lazyGetSignedUrlForImportStatus,
    cancelBtnHandler,
  } = useImport(props);

  return (
    <Dialog open={isDrawerOpen} onClose={onClose} maxWidth={'md'} fullWidth>
      <DialogTitle>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
          mb={1.5}
        >
          <Typography variant="h4" color="slateBlue.main">
            {title}
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={onClose}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box marginY={2} />
        <FormProvider methods={importFormMethod}>
          {!showItemsList ? (
            <>
              <Typography variant="h5" fontWeight={700} color="custom.main">
                Uploaded file must have these columns
              </Typography>
              {!!mandatoryColumnsList?.length ? (
                mandatoryColumnsList?.map((columnList: any) => (
                  <ListItem sx={{ color: 'grey.900' }} key={columnList?._id}>
                    <ListItemIcon>
                      <FiberManualRecord sx={{ fontSize: '10px' }} />
                    </ListItemIcon>
                    {columnList?.label}
                  </ListItem>
                ))
              ) : (
                <Typography
                  variant="body2"
                  fontWeight={700}
                  color="slateBlue.main"
                >
                  No Required Columns
                </Typography>
              )}
              <br />
              <RHFFileImport name="file" label={labelForImport} />
            </>
          ) : (
            <>
              <MappedColumns
                name="csvColumns"
                fields={fields}
                remove={remove}
                crmColumnsOptions={crmColumnsOptions}
              />
            </>
          )}
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="outlined"
          color="secondary"
          type="button"
          onClick={() => cancelBtnHandler?.()}
          disabled={
            importFileStatus?.isLoading ||
            uploadFileTos3UsingSignedUrlStatus?.isLoading ||
            lazyGetSignedUrlForImportStatus?.isLoading
          }
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="button"
          variant="contained"
          loading={
            importFileStatus?.isLoading ||
            uploadFileTos3UsingSignedUrlStatus?.isLoading ||
            lazyGetSignedUrlForImportStatus?.isLoading
          }
          onClick={() => handleSubmit(submitImportFile)()}
          disabled={
            importFileStatus?.isLoading ||
            uploadFileTos3UsingSignedUrlStatus?.isLoading ||
            lazyGetSignedUrlForImportStatus?.isLoading
          }
        >
          Import
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
