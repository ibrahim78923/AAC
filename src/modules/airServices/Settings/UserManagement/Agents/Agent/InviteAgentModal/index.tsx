import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { FormProvider } from '@/components/ReactHookForm';
import { agentFieldsData } from './InviteAgentModal.data';
import { useInviteAgentModal } from './useInviteAgentModal';

export const InviteAgentModel = (props: any) => {
  const { isAgentModalOpen, editAgentModalTitle } = props;
  const { inviteAgentMethods, onSubmit, handleAddAgentModal } =
    useInviteAgentModal(props);

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
          <DialogContent>
            <FormProvider
              methods={inviteAgentMethods}
              onSubmit={inviteAgentMethods?.handleSubmit?.(onSubmit)}
            >
              <Grid container gap={2.4}>
                {agentFieldsData?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
              <Button
                onClick={() => handleAddAgentModal?.()}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
