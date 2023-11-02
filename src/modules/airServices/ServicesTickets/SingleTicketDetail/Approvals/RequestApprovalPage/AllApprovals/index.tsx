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
import { approvalData } from '../AllApprovals.data';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import { RecievedFileIcon } from '@/assets/icons';
import ConversationModel from '@/components/Model/CoversationModel';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

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
    REQUESTED_CONDITION,
    RECIEVED_CONDITION,
  } = useRequestApprovalPage();

  const methods: any = useForm({
    defaultValues: {
      description: '',
    },
  });

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
      <Box sx={styles?.approvalsContainerBox}>
        {approvalData?.map((item) => {
          return (
            <div key={uuidv4()} style={styles?.approvalsContainer}>
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
                        sx={{ fontWeight: theme?.typography?.fontWeightMedium }}
                      >
                        {item?.mainText}
                      </Typography>
                      <Box sx={styles?.requestApprovalBoxSecond}>
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
                  {item?.showButton === RECIEVED_CONDITION ? (
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
                  ) : item?.showButton === REQUESTED_CONDITION ? (
                    <Box sx={styles?.requestApprovalBoxFirst}>
                      <Button
                        onClick={handleApprovalModelOpen}
                        sx={{
                          ...styles.requestApprovalButton,
                          color: theme?.palette?.success?.main,
                          '&:hover': { bgcolor: theme?.palette?.grey?.[400] },
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
                          ...styles?.requestApprovalButton,
                          color: theme?.palette?.error?.main,
                          '&:hover': { bgcolor: theme?.palette?.grey?.[400] },
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
        <Box sx={{ width: { sm: '510px' } }}>
          <FormProvider onSubmit={() => {}} methods={methods}>
            <RHFTextField
              name="description"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
          </FormProvider>
        </Box>
        <Box sx={styles?.boxBorderStyle}></Box>
        <Box sx={styles?.buttonBox}>
          <Button
            onClick={handleApprovalModelClose}
            style={{ ...styles?.cancelButton }}
          >
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
        <Box sx={{ width: { sm: '510px' } }}>
          <FormProvider onSubmit={() => {}} methods={methods}>
            <RHFTextField
              name="description"
              multiline
              minRows={7}
              fullWidth
              placeholder="Add Your Remarks here"
              label="remarks"
            />
          </FormProvider>
        </Box>
        <Box sx={styles.boxBorderStyle}></Box>
        <Box sx={styles.buttonBox}>
          <Button
            onClick={handleRecjectModelClose}
            style={{ ...styles?.cancelButton }}
          >
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
