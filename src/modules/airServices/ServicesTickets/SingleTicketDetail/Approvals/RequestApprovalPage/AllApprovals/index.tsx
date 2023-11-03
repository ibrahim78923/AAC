import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { requestApprovalPageData } from '../RequestApprovalPage.data';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import { ReceivedFileIcon } from '@/assets/icons';
import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { styles } from '../RequestApprovalPage.style';
import { v4 as uuidv4 } from 'uuid';

export const AllApprovals = () => {
  const {
    theme,
    open,
    handleClick,
    handleClose,
    textColor,
    anchorEl,
    handleApprovalModelOpen,
    handleApprovalModelClose,
    openApprovalModal,
    handleRejectModelClose,
    handleRejectModelOpen,
    openRejectModal,
    REQUESTED_CONDITION,
    RECEIVED_CONDITION: RECEIVED_CONDITION,
    methods,
  } = useRequestApprovalPage();

  const Icons: any = {
    Request: <SharedIcon />,
    Receive: <ReceivedFileIcon />,
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
      <Box sx={styles?.approvalsContainerBox}>
        {requestApprovalPageData?.map((item) => {
          return (
            <Box key={uuidv4()} sx={styles?.approvalsContainer}>
              <Grid
                container
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Grid item>
                  <Box sx={styles?.requestApprovalBoxFirst}>
                    <Box>
                      <Image src={item?.img} alt="Avatar" />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={theme?.typography?.fontWeightMedium}
                      >
                        {item?.mainText}
                      </Typography>
                      <Box sx={styles?.requestApprovalBoxSecond}>
                        {Icons[item?.status]}
                        <span>
                          <Typography
                            variant="customStyle"
                            color={textColor[item?.status]}
                          >
                            {item?.iconText}
                          </Typography>
                        </span>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    variant="customStyle"
                    color={theme?.palette?.common?.black}
                  >
                    {item?.detail}
                  </Typography>
                </Grid>
                <Grid item mt={{ md: '0', sm: '5px' }}>
                  {item?.showButton === RECEIVED_CONDITION ? (
                    <>
                      <IconButton onClick={handleClick}>
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
                  ) : item?.showButton === REQUESTED_CONDITION ? (
                    <Box sx={styles?.requestApprovalBoxFirst}>
                      <Button
                        variant="outlined"
                        onClick={handleApprovalModelOpen}
                        startIcon={
                          <CheckCircleIcon
                            sx={{ color: theme?.palette?.success?.main }}
                          />
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={handleRejectModelOpen}
                        variant="outlined"
                        color="error"
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
            </Box>
          );
        })}
      </Box>
      <FormProvider methods={methods}>
        <Dialog
          fullWidth
          open={openApprovalModal}
          onClose={handleApprovalModelClose}
        >
          <Box width={'100%'} p={'1rem'}>
            <Box sx={styles?.dialogBoxStyle}>
              <Typography variant="h5">Approval</Typography>
              <AlertModalCloseIcon
                onClick={handleApprovalModelClose}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <RHFTextField
              name="description"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
            <Box sx={styles?.boxBorderStyle}></Box>
            <Box sx={styles?.buttonBox}>
              <Button variant="outlined" onClick={handleApprovalModelClose}>
                Cancel
              </Button>
              <Button variant="contained">Approve</Button>
            </Box>
          </Box>
        </Dialog>
        <Dialog
          fullWidth
          open={openRejectModal}
          onClose={handleRejectModelClose}
        >
          <Box width={'100%'} p={'1rem'}>
            <Box sx={styles?.dialogBoxStyle}>
              <Typography variant="h5">Approval</Typography>
              <AlertModalCloseIcon
                onClick={handleRejectModelClose}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <RHFTextField
              name="description"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
            <Box sx={styles?.boxBorderStyle}></Box>
            <Box sx={styles?.buttonBox}>
              <Button variant="outlined" onClick={handleRejectModelClose}>
                Cancel
              </Button>
              <Button variant="contained" color="error">
                Reject
              </Button>
            </Box>
          </Box>
        </Dialog>
      </FormProvider>
    </>
  );
};
