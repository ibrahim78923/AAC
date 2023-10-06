import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { ApprovalData } from '../AllApprovals.mock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import { RecievedFileIcon } from '@/assets/icons';
import ConversationModel from '@/components/Model/CoversationModel';

export const AllApprovals = () => {
  const {
    theme,
    open,
    handleClick,
    handleClose,
    styles,
    textColor,
    anchorEl,
    handleApprovalModelOpen,
    handleApprovalModelClose,
    openApprovalModal,
    handleRecjectModelClose,
    handleRecjectModelOpen,
    openRejectModal,
  } = useRequestApprovalPage();

  const Icons: any = {
    Request: <SharedIcon />,
    Recieve: <RecievedFileIcon />,
    Approve: (
      <CheckCircleIcon
        fontSize="small"
        sx={{ color: theme?.palette?.success?.main }}
      />
    ),
    Reject: (
      <CancelIcon
        fontSize="small"
        sx={{ color: theme?.palette?.error?.main }}
      />
    ),
    Cancel: (
      <UnsubscribeIcon
        fontSize="small"
        sx={{ color: theme?.palette?.grey?.[900] }}
      />
    ),
  };

  return (
    <>
      <Box sx={styles.approvalsContainerBox}>
        {ApprovalData?.map((item) => {
          return (
            <div key={item?.id} style={styles.approvalsContainer}>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Grid item>
                  <Box sx={styles.requestApprovalBoxFirst}>
                    <Box>
                      <Image src={item?.img} alt="Avatar" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: theme?.typography?.fontWeightMedium }}
                      >
                        {item?.mainText}
                      </Typography>
                      <Box sx={styles.requestApprovalBoxSecond}>
                        {Icons[item?.status]}
                        <span>
                          <Typography
                            variant="customStyle"
                            sx={{ color: textColor[item?.status] }}
                          >
                            {item?.iconText}
                          </Typography>
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="customStyle"
                    sx={{ color: theme?.palette?.common?.black }}
                  >
                    {item?.detail}
                  </Typography>
                </Grid>
                <Grid item sx={{ mt: { md: '0', sm: '5px' } }}>
                  {item?.showButton === 'Recieved' ? (
                    <>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVertIcon fontSize="large" />
                      </IconButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem onClick={handleClose}>Send Reminder</MenuItem>
                        <MenuItem onClick={handleClose}>
                          Cancel Approval
                        </MenuItem>
                      </Menu>
                    </>
                  ) : item?.showButton === 'Requested' ? (
                    <Box sx={styles.requestApprovalBoxFirst}>
                      <Button
                        onClick={handleApprovalModelOpen}
                        sx={{
                          ...styles.requestApprovalButton,
                          color: theme?.palette?.success?.main,
                          '&:hover': { bgcolor: theme?.palette?.grey[400] },
                        }}
                        startIcon={
                          <CheckCircleIcon
                            sx={{ color: theme?.palette?.success?.main }}
                          />
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={handleRecjectModelOpen}
                        sx={{
                          ...styles.requestApprovalButton,
                          color: theme?.palette?.error?.main,
                          '&:hover': { bgcolor: theme?.palette?.grey[400] },
                        }}
                        startIcon={
                          <CancelIcon
                            sx={{ color: theme?.palette?.error?.main }}
                          />
                        }
                      >
                        Reject
                      </Button>
                    </Box>
                  ) : (
                    ''
                  )}
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Box>
      <ConversationModel
        open={openApprovalModal}
        handleClose={handleApprovalModelClose}
        selectedItem="Approval"
      >
        <Typography variant="body2">Remarks</Typography>
        <Box>
          <TextareaAutosize
            placeholder="Add Your Remarks here"
            style={styles.textareaStyle}
          />
        </Box>
        <Box sx={styles.boxBorderStyle}></Box>
        <Box sx={styles.buttonBox}>
          <Button onClick={handleApprovalModelClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained">Approve</Button>
        </Box>
      </ConversationModel>
      <ConversationModel
        open={openRejectModal}
        handleClose={handleRecjectModelClose}
        selectedItem="Reject"
      >
        <Typography variant="body2">Remarks</Typography>
        <Box>
          <TextareaAutosize
            placeholder="Add Your Remarks here"
            style={styles.textareaStyle}
          />
        </Box>
        <Box sx={styles.boxBorderStyle}></Box>
        <Box sx={styles.buttonBox}>
          <Button onClick={handleRecjectModelClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" color="error">
            Reject
          </Button>
        </Box>
      </ConversationModel>
    </>
  );
};
