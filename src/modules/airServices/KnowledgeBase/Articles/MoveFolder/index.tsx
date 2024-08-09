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
import { ArticlesPortalComponentPropsI } from '../Articles.interface';

export const MoveFolder = (props: ArticlesPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    methods,
    submitMoveFolder,
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
      <DialogContent>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitMoveFolder)}
        >
          <Grid container spacing={1}>
            {moveFolderFormFields?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?._id}>
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
          onClick={handleSubmit(submitMoveFolder)}
        >
          Move
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
