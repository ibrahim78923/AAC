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
import { upsertFolderFormFields } from './UpsertFolder.data';
import CloseIcon from '@mui/icons-material/Close';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const UpsertFolder = (props: any) => {
  const { isPortalOpen } = props;
  const { methods, handleSubmit, onSubmit, postFolderStatus, closePortal } =
    useUpsertFolder(props);

  return (
    <Dialog
      open={isPortalOpen?.isUpsertFolder as boolean}
      onClose={() => closePortal()}
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
            {isPortalOpen?.data?._id
              ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
              : GENERIC_UPSERT_FORM_CONSTANT?.CREATE}{' '}
            Folder
          </Typography>
          <CloseIcon
            sx={{ color: 'custom.darker', cursor: 'pointer' }}
            onClick={() => closePortal?.()}
          />
        </Box>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {upsertFolderFormFields?.map((item: any) => (
            <item.component
              {...item?.componentProps}
              key={item?.id}
              size={'small'}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            marginBottom={'2rem'}
            gap={'1rem'}
          >
            <LoadingButton
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => closePortal?.()}
              disabled={postFolderStatus?.isLoading}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={postFolderStatus?.isLoading}
            >
              {isPortalOpen?.data?._id
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.CREATE}
            </LoadingButton>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
