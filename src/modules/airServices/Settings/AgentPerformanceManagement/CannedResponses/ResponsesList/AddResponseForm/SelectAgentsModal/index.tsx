import {
  Avatar,
  AvatarGroup,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import { useSelectAgentsModal } from './useSelectAgentsModal';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { stringAvatar } from '../AddResponseForm.data';
import { CANNED_RESPONSES } from '@/constants/strings';

export const SelectAgentsModal = (props: any) => {
  const {
    method,
    onSubmit,
    agents,
    openSelectAgentsModal,
    closeSelectAgentsModal,
    apiQueryAgents,
    setValue,
  } = useSelectAgentsModal(props);
  return (
    <>
      {openSelectAgentsModal && (
        <Dialog
          open={openSelectAgentsModal}
          onClose={(_event, reason) => {
            if (reason && reason == 'backdropClick') return;
            closeSelectAgentsModal();
            setValue(
              CANNED_RESPONSES?.AVAILABLE_FOR,
              CANNED_RESPONSES?.ALL_AGENTS,
            );
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
              onClick={() => {
                closeSelectAgentsModal();
                setValue(
                  CANNED_RESPONSES?.AVAILABLE_FOR,
                  CANNED_RESPONSES?.ALL_AGENTS,
                );
              }}
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
                  <RHFAutocompleteAsync
                    name="agents"
                    size="small"
                    multiple
                    placeholder="select"
                    apiQuery={apiQueryAgents}
                    getOptionLabel={(option: any) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    required
                  />
                </Grid>
                {!!agents?.length && (
                  <Grid item xs={12}>
                    <AvatarGroup
                      max={4}
                      total={agents?.length}
                      sx={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      {agents?.map((avatar: any) => (
                        <Tooltip
                          title={`${avatar?.firstName} ${avatar?.lastName}`}
                          key={avatar?._id}
                        >
                          <Avatar
                            alt={`${avatar?.firstName} ${avatar?.lastName}`}
                            src={avatar?.attachments}
                            {...stringAvatar(
                              `${avatar?.firstName} ${avatar?.lastName}`,
                            )}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ pt: '0 !important' }}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <LoadingButton
                  onClick={() => {
                    closeSelectAgentsModal();
                    setValue(
                      CANNED_RESPONSES?.AVAILABLE_FOR,
                      CANNED_RESPONSES?.ALL_AGENTS,
                    );
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={!!!agents?.length}
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
