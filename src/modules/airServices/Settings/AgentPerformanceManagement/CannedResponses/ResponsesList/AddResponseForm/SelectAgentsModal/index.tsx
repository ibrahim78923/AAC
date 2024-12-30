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
import { CANNED_RESPONSES } from '@/constants/strings';
import { fullName, fullNameInitial, generateImage } from '@/utils/avatarUtils';

export const SelectAgentsModal = (props: any) => {
  const {
    methods,
    onSubmit,
    selectedAgentsList,
    openSelectAgentsModal,
    closeSelectAgentsModal,
    apiQueryAgents,
    setValue,
    productId,
    handleSubmit,
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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container gap={1.4}>
                <Grid item xs={12}>
                  <RHFAutocompleteAsync
                    name="agents"
                    size="small"
                    multiple
                    placeholder="Select"
                    apiQuery={apiQueryAgents}
                    getOptionLabel={(option: any) =>
                      `${option?.firstName} ${option?.lastName}`
                    }
                    externalParams={{ admin: true, productId }}
                    required
                  />
                </Grid>

                {!!selectedAgentsList?.length && (
                  <Grid item xs={12}>
                    <AvatarGroup
                      max={4}
                      total={selectedAgentsList?.length}
                      sx={{
                        justifyContent: 'flex-end',
                      }}
                    >
                      {selectedAgentsList?.map((selectedAgent: any) => (
                        <Tooltip
                          title={fullName(
                            selectedAgent?.firstName,
                            selectedAgent?.lastName,
                          )}
                          key={selectedAgent?._id}
                        >
                          <Avatar
                            sx={{
                              bgcolor: 'primary.main',
                              width: 28,
                              height: 28,
                            }}
                            variant={'circular'}
                            src={generateImage(
                              selectedAgent?.avatar?.url ??
                                selectedAgent?.avatar,
                            )}
                          >
                            <Typography
                              variant={'body2'}
                              textTransform={'uppercase'}
                            >
                              {fullNameInitial(
                                selectedAgent?.firstName,
                                selectedAgent?.lastName,
                              )}
                            </Typography>
                          </Avatar>
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
                  variant={'outlined'}
                  color={'secondary'}
                  className={'small'}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  type={'submit'}
                  variant={'contained'}
                  className={'small'}
                  disabled={!!!selectedAgentsList?.length}
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
