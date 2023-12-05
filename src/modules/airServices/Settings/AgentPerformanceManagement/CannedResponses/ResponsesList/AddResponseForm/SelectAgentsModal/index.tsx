import {
  Avatar,
  AvatarGroup,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { useSelectAgentsModal } from './useSelectAgentsModal';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { userData } from './SelectAgentsModal.data';
import { FormProvider, RHFAutocomplete } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';

export const SelectAgentsModal = ({
  openSelectAgentsModal,
  closeSelectAgentsModal,
  setAgentsResponses,
}: any) => {
  const { agents, method, onSubmit } = useSelectAgentsModal();
  return (
    <>
      {openSelectAgentsModal && (
        <Dialog
          open={openSelectAgentsModal}
          onClose={(_event, reason) => {
            if (reason && reason == 'backdropClick') return;
            closeSelectAgentsModal();
          }}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: 468,
              borderRadius: 12,
            },
          }}
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
            >
              <CheckCircleRoundedIcon
                sx={{
                  color: 'primary.main',
                }}
              />
              <Typography variant="h3">Agents</Typography>
            </Box>
            <Box
              onClick={closeSelectAgentsModal}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CloseModalIcon />
            </Box>
          </DialogTitle>
          <FormProvider
            methods={method}
            onSubmit={method?.handleSubmit(onSubmit)}
          >
            <DialogContent>
              <Grid container gap={1.4}>
                <Grid item xs={12}>
                  <RHFAutocomplete name="agents" options={userData} multiple />
                </Grid>
                {!!agents?.length && (
                  <Grid item xs={12}>
                    <AvatarGroup
                      max={4}
                      sx={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      {agents?.map((avatar: any) => (
                        <Avatar
                          key={avatar?.id}
                          alt={avatar?.label}
                          src={avatar?.src?.src}
                        />
                      ))}
                    </AvatarGroup>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ pt: '0 !important' }}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <LoadingButton
                  onClick={closeSelectAgentsModal}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={!!!agents?.length}
                  onClick={() => {
                    setAgentsResponses(agents);
                    closeSelectAgentsModal();
                  }}
                >
                  Assign
                </LoadingButton>
              </Box>
            </DialogActions>
          </FormProvider>
        </Dialog>
      )}
    </>
  );
};
