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
import { AlertModalCloseIcon } from '@/assets/icons';
import { useMoveFolder } from './useMoveFolder';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const MoveFolder = (props: any) => {
  const { moveFolderModal } = props;
  const {
    methodMoveFolderForm,
    submitMoveFolder,
    isLoading,
    isFetching,
    patchArticleStatus,
    handleSubmit,
    closeMoveFolderModal,
    moveFolderFormFields,
  } = useMoveFolder(props);
  return (
    <Dialog
      open={moveFolderModal}
      onClose={() => closeMoveFolderModal()}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap={'wrap'}
        >
          <Typography variant="h3" color="slateBlue.main">
            Move to other folder
          </Typography>
          <AlertModalCloseIcon
            onClick={() => closeMoveFolderModal()}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <FormProvider
        methods={methodMoveFolderForm}
        onSubmit={handleSubmit(submitMoveFolder)}
      >
        <DialogContent>
          {isLoading || isFetching ? (
            <SkeletonForm />
          ) : (
            <Grid container spacing={1}>
              {moveFolderFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?._id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            color="secondary"
            onClick={() => closeMoveFolderModal()}
            type="button"
            disabled={patchArticleStatus?.isLoading}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={patchArticleStatus?.isLoading}
          >
            Move
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
