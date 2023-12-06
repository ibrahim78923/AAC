import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { requestApprovalPageData } from '../RequestApprovalPage.data';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import { ReceivedFileIcon, SharedIcon } from '@/assets/icons';
import { AlertModalCloseIcon } from '@/assets/icons';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { styles } from '../RequestApprovalPage.style';

export const AllApprovals = () => {
  const {
    theme,
    open,
    handleClick,
    handleClose,
    textColor,
    anchorEl,
    handleApprovalModalOpen,
    handleApprovalModalClose,
    openApprovalModal,
    handleRejectModalClose,
    handleRejectModalOpen,
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
        {requestApprovalPageData?.map((item: any) => {
          return (
            <Box sx={styles?.approvalsContainer} key={item?.id}>
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
                        {Icons?.[item?.status]}
                        <span>
                          <Typography
                            variant="customStyle"
                            color={textColor?.[item?.status]}
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
                      <Popover
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
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
                      </Popover>
                    </>
                  ) : item?.showButton === REQUESTED_CONDITION ? (
                    <Box sx={styles?.requestApprovalBoxFirst}>
                      <Button
                        variant="outlined"
                        onClick={handleApprovalModalOpen}
                        startIcon={
                          <CheckCircleIcon
                            sx={{ color: theme?.palette?.success?.main }}
                          />
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={handleRejectModalOpen}
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
          onClose={handleApprovalModalClose}
        >
          <Box width={'100%'} p={'1rem'}>
            <Box sx={styles?.dialogBoxStyle}>
              <Typography variant="h5">Approval</Typography>
              <AlertModalCloseIcon
                onClick={handleApprovalModalClose}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <RHFTextField
              name="approval"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
            <Box sx={styles?.boxBorderStyle}></Box>
            <Box sx={styles?.buttonBox}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleApprovalModalClose}
              >
                Cancel
              </Button>
              <Button variant="contained">Approve</Button>
            </Box>
          </Box>
        </Dialog>
        <Dialog
          fullWidth
          open={openRejectModal}
          onClose={handleRejectModalClose}
        >
          <Box width={'100%'} p={'1rem'}>
            <Box sx={styles?.dialogBoxStyle}>
              <Typography variant="h5">Approval</Typography>
              <AlertModalCloseIcon
                onClick={handleRejectModalClose}
                style={{ cursor: 'pointer' }}
              />
            </Box>
            <RHFTextField
              name="rejected"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
            <Box sx={styles?.boxBorderStyle}></Box>
            <Box sx={styles?.buttonBox}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleRejectModalClose}
              >
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
