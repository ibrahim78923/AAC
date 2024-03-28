import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { useUpsertAgent } from './useUpsertAgent';

export const UpsertAgent = (props: any) => {
  const { isAgentModalOpen, selectedAgentList } = props;
  const {
    method,
    handleSubmit,
    handleUpsertAgentSubmit,
    patchAgentStatus,
    postAgentStatus,
    handleClose,
    upsertAgentFormFields,
  } = useUpsertAgent(props);

  return (
    <>
      <Dialog
        open={isAgentModalOpen}
        onClose={() => handleClose?.()}
        fullWidth
        maxWidth={'sm'}
      >
        <FormProvider
          methods={method}
          onSubmit={handleSubmit(handleUpsertAgentSubmit)}
        >
          <DialogTitle>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              flexWrap={'wrap'}
              mb={2}
            >
              <Typography variant="h4" color="primary.main">
                {!!selectedAgentList?.length ? 'Edit Agent' : 'Invite Agent'}
              </Typography>
              <IconButton
                onClick={() => handleClose?.()}
                sx={{ cursor: 'pointer' }}
              >
                <CloseModalIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              {upsertAgentFormFields?.map((form: any) => (
                <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                  <form.component {...form?.componentProps} size="small" />
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              onClick={() => handleClose?.()}
              variant="outlined"
              color="secondary"
              disabled={
                patchAgentStatus?.isLoading || postAgentStatus?.isLoading
              }
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={
                patchAgentStatus?.isLoading || postAgentStatus?.isLoading
              }
              loading={
                patchAgentStatus?.isLoading || postAgentStatus?.isLoading
              }
            >
              {!!selectedAgentList?.length ? 'Update' : 'Save'}
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};
