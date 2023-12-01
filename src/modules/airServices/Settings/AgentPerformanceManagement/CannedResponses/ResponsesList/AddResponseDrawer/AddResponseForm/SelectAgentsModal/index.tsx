import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import { ArrowDownIcon, CloseModalIcon } from '@/assets/icons';
import { useSelectAgentsModal } from './useSelectAgentsModal';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { SearchableMultiSelect } from './SearchableMultiSelect';
import { userData } from './SelectAgentsModal.data';

export const SelectAgentsModal = ({
  openSelectAgentsModal,
  closeSelectAgentsModal,
  setAgentsResponses,
}: any) => {
  const {
    agents,
    setPendingValue,
    pendingValue,
    handleCloseUsersList,
    anchorElUserList,
    handleOpenUsersList,
  } = useSelectAgentsModal();
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
          <DialogContent>
            <Grid container gap={1.4}>
              <Grid item xs={12}>
                <Box
                  onClick={handleOpenUsersList}
                  p="0.47rem 1rem"
                  border="0.06rem solid"
                  borderColor="custom.light_lavender_gray"
                  borderRadius=".5rem"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="body2" color="grey.600">
                    Select User
                  </Typography>
                  <Box>
                    <ArrowDownIcon />
                  </Box>
                </Box>
                <SearchableMultiSelect
                  labels={userData}
                  anchorEl={anchorElUserList}
                  handleClose={handleCloseUsersList}
                  pendingValue={pendingValue}
                  setPendingValue={setPendingValue}
                  value={agents}
                />
              </Grid>
              {!!agents?.length && (
                <Grid item xs={12}>
                  <AvatarGroup
                    max={4}
                    sx={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    {agents?.map((avatar) => (
                      <Avatar
                        key={avatar?.id}
                        alt={avatar?.name}
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
              <Button
                onClick={closeSelectAgentsModal}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!!!agents?.length}
                onClick={() => {
                  setAgentsResponses(agents);
                  closeSelectAgentsModal();
                }}
              >
                Assign
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
