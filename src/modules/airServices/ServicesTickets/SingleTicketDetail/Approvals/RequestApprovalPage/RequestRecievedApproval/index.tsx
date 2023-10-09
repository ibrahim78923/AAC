import { Box, Button, Grid, TextareaAutosize, Typography } from '@mui/material';
import Image from 'next/image';
import { ApprovalData } from '../AllApprovals.mock';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';
import ConversationModel from '@/components/Model/CoversationModel';

const RequestRecievedApproval = () => {
  const {
    theme,
    styles,
    textColor,
    handleApprovalModelClose,
    openApprovalModal,
    handleRecjectModelClose,
    openRejectModal,
    handleRecjectModelOpen,
    handleApprovalModelOpen,
  } = useRequestApprovalPage();
  const Icons: any = {
    Request: <SharedIcon />,
  };
  return (
    <>
      <Box sx={styles.approvalsContainerBox}>
        {ApprovalData?.filter((item) => item.status === 'Request')?.map(
          (filteredItem) => {
            return (
              <div key={filteredItem?.id} style={styles.approvalsContainer}>
                <Grid
                  container
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Grid item>
                    <Box sx={styles.requestApprovalBoxFirst}>
                      <Box>
                        <Image src={filteredItem?.img} alt="Avatar" />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: theme?.typography?.fontWeightMedium,
                          }}
                        >
                          {filteredItem?.mainText}
                        </Typography>
                        <Box sx={styles.requestApprovalBoxSecond}>
                          {Icons[filteredItem?.status]}
                          <span>
                            <Typography
                              variant="customStyle"
                              sx={{ color: textColor[filteredItem?.status] }}
                            >
                              {filteredItem?.iconText}
                            </Typography>
                          </span>
                        </Box>
                      </Box>
                    </Box>
                    <Typography
                      variant="customStyle"
                      sx={{ color: theme?.palette?.common?.black }}
                    >
                      {filteredItem?.detail}
                    </Typography>
                  </Grid>
                  <Grid item>
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
                  </Grid>
                </Grid>
              </div>
            );
          },
        )}
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

export default RequestRecievedApproval;
