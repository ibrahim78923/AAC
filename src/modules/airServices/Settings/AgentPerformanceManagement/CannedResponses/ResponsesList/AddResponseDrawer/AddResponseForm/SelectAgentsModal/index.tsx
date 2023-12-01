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
import { styles } from './SelectAgentsModal.styles';

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
          PaperProps={styles?.paperProps}
        >
          <DialogTitle sx={styles?.titleContainer}>
            <Box sx={styles?.titleContainer}>
              <CheckCircleRoundedIcon sx={styles?.iconContainer} />
              <Typography variant="h3">Agents</Typography>
            </Box>
            <Box onClick={closeSelectAgentsModal} sx={styles?.closeModalIcon}>
              <CloseModalIcon />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Grid container gap={1.4}>
              <Grid item xs={12}>
                <Box onClick={handleOpenUsersList} sx={styles?.selectUserBox}>
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
                  <AvatarGroup max={4} sx={styles?.avatarGroup}>
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
          <DialogActions sx={styles?.dialogActions}>
            <Box sx={styles?.dialogActionsBox}>
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
