import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { ApprovalData } from '../AllApprovals.mock';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SharedIcon from '@/assets/icons/shared/shared-icon';
import { useRequestApprovalPage } from '../useRequestApprovalPage';

const RequestRecievedApproval = () => {
  const { theme, styles, textColor } = useRequestApprovalPage();
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

export default RequestRecievedApproval;
