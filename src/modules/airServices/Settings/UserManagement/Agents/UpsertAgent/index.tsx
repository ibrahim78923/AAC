import {
  Box,
  Dialog,
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
      {isAgentModalOpen && (
        <Dialog
          open={isAgentModalOpen}
          onClose={() => handleClose?.()}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 510,
              borderRadius: 8,
            },
          }}
        >
          <FormProvider
            methods={method}
            onSubmit={handleSubmit(handleUpsertAgentSubmit)}
          >
            <DialogTitle
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              pb={2.4}
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
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {upsertAgentFormFields?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                ))}
              </Grid>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                gap={2}
                flexWrap={'wrap'}
              >
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
                  Save
                </LoadingButton>
              </Box>
            </DialogContent>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
