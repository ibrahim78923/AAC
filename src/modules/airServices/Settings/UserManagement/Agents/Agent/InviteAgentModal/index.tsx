import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
          <DialogContent sx={{ mt: 2 }}>
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
            <Box display={'flex'} justifyContent={'flex-end'} gap={2} mt={0.5}>
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
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
