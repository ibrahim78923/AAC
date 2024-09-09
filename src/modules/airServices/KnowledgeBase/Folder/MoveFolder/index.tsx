import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider } from '@/components/ReactHookForm';
import { useMoveFolder } from './useMoveFolder';
import CloseIcon from '@mui/icons-material/Close';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const MoveFolder = () => {
  const {
    methods,
    submitMoveFolder,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
    isPortalOpen,
  } = useMoveFolder();

  return (
    <Dialog
      open={isPortalOpen?.isOpen as boolean}
      onClose={closeMoveFolderModal}
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
            Move to other folder
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={closeMoveFolderModal}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {moveFolderFormFields?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ paddingTop: `0rem !important` }}>
        <LoadingButton
          variant="outlined"
          color="secondary"
          onClick={closeMoveFolderModal}
          type="button"
          disabled={patchArticleStatus?.isLoading}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant="contained"
          type="submit"
          loading={patchArticleStatus?.isLoading}
          onClick={handleSubmit(submitMoveFolder)}
        >
          Move
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
