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
import { ArticlesPortalComponentPropsI } from '../../Articles/Articles.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const UpsertFolder = (props: ArticlesPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    onSubmit,
    postFolderStatus,
    closePortal,
    updateFolderForArticlesStatus,
  } = useUpsertFolder(props);

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
          onClick={() => closePortal?.()}
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
          {isPortalOpen?.data?._id
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.CREATE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
