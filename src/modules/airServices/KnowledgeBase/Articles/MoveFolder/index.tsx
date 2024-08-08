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
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import CloseIcon from '@mui/icons-material/Close';

export const MoveFolder = (props: any) => {
  const { isPortalOpen } = props;
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
      open={isPortalOpen?.isMoveFolder as boolean}
      onClose={() => closeMoveFolderModal()}
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
            onClick={() => closeMoveFolderModal?.()}
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
