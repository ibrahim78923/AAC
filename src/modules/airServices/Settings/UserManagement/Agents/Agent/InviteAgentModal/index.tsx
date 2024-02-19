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
import { useInviteAgentModal } from './useInviteAgentModal';
import { agentFieldsData } from './InviteAgentModal.data';
import { LoadingButton } from '@mui/lab';

export const InviteAgentModel = (props: any) => {
  const { isAgentModalOpen, editAgentModalTitle } = props;
  const {
    inviteAgentMethods,
    handleSubmitAgent,
    handleAddAgentModal,
    departmentDropdown,
    isLoading,
  } = useInviteAgentModal(props);

  return (
    <>
      {isAgentModalOpen && (
        <Dialog
          open={isAgentModalOpen}
          onClose={() => handleAddAgentModal?.()}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 510,
              borderRadius: 8,
            },
          }}
        >
          <FormProvider
            methods={inviteAgentMethods}
            onSubmit={handleSubmitAgent}
          >
            <DialogTitle
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              pb={2.4}
            >
              <Typography variant="h4" color="primary?.main">
                {editAgentModalTitle}
              </Typography>
              <IconButton
                onClick={() => handleAddAgentModal?.()}
                sx={{ cursor: 'pointer' }}
              >
                <CloseModalIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Grid container gap={2.4}>
                {agentFieldsData(editAgentModalTitle, departmentDropdown)?.map(
                  (form: any) => (
                    <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                      <form.component {...form?.componentProps} size="small" />
                    </Grid>
                  ),
                )}
              </Grid>
              <Box
                display={'flex'}
                justifyContent={'flex-end'}
                gap={2}
                mt={0.5}
              >
                <LoadingButton
                  onClick={() => handleAddAgentModal?.()}
                  variant="outlined"
                  color="secondary"
                  disabled={isLoading}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
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
