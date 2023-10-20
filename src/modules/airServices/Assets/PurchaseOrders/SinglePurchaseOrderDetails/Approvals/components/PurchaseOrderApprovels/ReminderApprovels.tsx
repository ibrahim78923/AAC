import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { ApprovalsData } from './PurchaseOrderApprovels.data';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { useRequestApprovalPage } from '../../../../../../ServicesTickets/SingleTicketDetail/Approvals/RequestApprovalPage/useRequestApprovalPage';
import { RecievedFileIcon, ReminderBell } from '@/assets/icons';

const ReminderRequestApproval = ({ status }: any) => {
  const { theme, styles, textColor } = useRequestApprovalPage();

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
        {ApprovalsData?.filter((item) => item.status === status).map(
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
                    {status === 'Request' ? (
                      <Box sx={styles.requestApprovalBoxFirst}>
                        <Button
                          onClick={() => {}}
                          sx={{
                            ...styles.requestApprovalButton,
                            color: theme?.palette?.grey[800],
                            '&:hover': { bgcolor: theme?.palette?.grey[400] },
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {}}
                          sx={{
                            ...styles.requestApprovalButton,
                            color: theme?.palette?.primary?.main,
                            backgroundColor: theme?.palette?.primary?.light,
                            '&:hover': { bgcolor: theme?.palette?.grey[400] },
                          }}
                          startIcon={<ReminderBell />}
                        >
                          Send Reminder
                        </Button>
                      </Box>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            );
          },
        )}
      </Box>
    </>
  );
};

export default ReminderRequestApproval;
