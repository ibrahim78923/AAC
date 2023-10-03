import { RecievedFileIcon, SharedIcon } from '@/assets/icons';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { ApprovalData } from './AllApprovals.mock';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import { uuid } from 'uuidv4';

const AllApprovals = () => {
  const theme = useTheme();
  const textColor: any = {
    Request: '#0AADC7',
    Recieve: theme?.palette?.primary?.main,
    Approve: theme?.palette?.success?.main,
    Reject: theme?.palette?.error?.main,
    Cancel: theme?.palette?.grey?.[900],
  };
  const Icons: any = {
    Request: <SharedIcon />,
    Recieve: <RecievedFileIcon />,
    Approve: (
      <CheckCircleIcon
        fontSize="small"
        sx={{ color: theme?.palette?.success?.main }}
      />
    ),
    Reject: <CancelIcon sx={{ color: theme?.palette?.error?.main }} />,
    Cancel: (
      <UnsubscribeIcon
        fontSize="small"
        sx={{ color: theme?.palette?.grey?.[900] }}
      />
    ),
  };
  return (
    <>
      <Box></Box>
      {ApprovalData?.map((item) => {
        return (
          <div
            key={uuid()}
            style={{
              border: '1px solid grey',
              borderRadius: '.5rem',
              padding: '1rem',
              marginBottom: '10px',
            }}
          >
            <Grid
              container
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid item>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Box>
                    <Image src={item.img} alt="Avatar" />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                      {item.mainText}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {Icons[item.status]}
                      <span>
                        <Typography
                          variant="customStyle"
                          sx={{
                            color: textColor[item?.status],
                            ml: '3px',
                          }}
                        >
                          {item.iconText}
                        </Typography>
                      </span>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  variant="customStyle"
                  sx={{ color: theme.palette.common.black }}
                >
                  {item.detail}
                </Typography>
              </Grid>
              <Grid item>
                {item?.showButton === 'Recieved' ? (
                  <MoreVertIcon fontSize="large" />
                ) : item?.showButton === 'Requested' ? (
                  <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button
                      sx={{
                        color: theme.palette?.grey[500],
                        border: '1px solid #E5E7EB',
                        padding: '0px 15px',
                        height: '40px',
                        fontWeight: '500',
                        '&:hover': { bgcolor: theme.palette.grey[400] },
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ color: theme?.palette?.success?.main }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ ml: '5px', color: theme?.palette?.success?.main }}
                      >
                        Approve
                      </Typography>
                    </Button>
                    <Button
                      sx={{
                        color: theme.palette?.grey[500],
                        border: '1px solid #E5E7EB',
                        padding: '0px 15px',
                        height: '40px',
                        fontWeight: '500',
                        '&:hover': { bgcolor: theme.palette.grey[400] },
                      }}
                    >
                      <CancelIcon sx={{ color: theme?.palette?.error?.main }} />
                      <Typography
                        variant="body2"
                        sx={{ ml: '5px', color: theme?.palette?.error?.main }}
                      >
                        Reject
                      </Typography>
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
    </>
  );
};

export default AllApprovals;
