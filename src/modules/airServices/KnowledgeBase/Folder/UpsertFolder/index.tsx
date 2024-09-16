import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFolder } from './useUpsertFolder';
import { LoadingButton } from '@mui/lab';
import {
  SET_DRAWER_CONSTANTS,
  upsertFolderFormFields,
} from './UpsertFolder.data';
import CloseIcon from '@mui/icons-material/Close';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const UpsertFolder = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closePortal,
    updateFolderForArticlesStatus,
    isPortalOpen,
  } = useUpsertFolder();

  return (
    <Dialog
      open={isPortalOpen?.isOpen as boolean}
      onClose={closePortal}
      maxWidth={'sm'}
      fullWidth
    >
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
            {SET_DRAWER_CONSTANTS?.[isPortalOpen?.action]?.title}
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={closePortal}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods}>
          {upsertFolderFormFields?.map((item: ReactHookFormFieldsI) => (
            <item.component
              {...item?.componentProps}
              key={item?.id}
              size={'small'}
            />
          ))}
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ paddingTop: `0rem !important` }}>
        <LoadingButton
          type="button"
          variant="outlined"
          color="secondary"
          onClick={closePortal}
          disabled={
            postFolderStatus?.isLoading ||
            updateFolderForArticlesStatus?.isLoading
          }
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          loading={
            postFolderStatus?.isLoading ||
            updateFolderForArticlesStatus?.isLoading
          }
        >
          {SET_DRAWER_CONSTANTS?.[isPortalOpen?.action]?.buttonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
