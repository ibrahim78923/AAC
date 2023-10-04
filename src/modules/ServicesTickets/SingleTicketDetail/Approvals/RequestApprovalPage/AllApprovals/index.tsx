import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { ApprovalData } from './AllApprovals.mock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPageState } from '../useRequestApprovalPage.state';
import { RecievedFileIcon } from '@/assets/icons';

const AllApprovals = () => {
  const { theme, open, handleClick, handleClose, styles, textColor, anchorEl } =
    useRequestApprovalPageState();

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
                <Grid item>
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
    </>
  );
};

export default AllApprovals;
