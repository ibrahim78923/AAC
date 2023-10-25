import NoData from '@/components/NoData';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import { Fragment, useState } from 'react';
import {
  approvalsDataArray,
  approvalsStatusColor,
  approvalsStatusMessage,
} from './Approvals.data';
import { Avatar, Box, Button, Grid, Typography, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { RequestApprovalForm } from './RequestApprovalForm';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';

export const Approvals = () => {
  const theme: any = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      {approvalsDataArray.length <= 0 ? (
        <NoData
          image={NoAssociationFound}
          message={
            'Make Approved Purchases by sending the order to your stakeholders for approval'
          }
        >
          <Button
            variant="outlined"
            sx={{ backgroundColor: theme.palette.grey[400] }}
            onClick={() => setOpenDialog(true)}
          >
            <AddCircleIcon sx={{ mr: 1 }} />
            Request Approval
          </Button>
        </NoData>
      ) : (
        <Fragment>
          <Box textAlign={'end'}>
            <Button variant="contained" onClick={() => setOpenDialog(true)}>
              <AddCircleIcon sx={{ mr: 1 }} />
              Request Approval
            </Button>
          </Box>

          {approvalsDataArray?.map((item: any) => (
            <Grid
              container
              key={uuidv4()}
              justifyContent={'space-between'}
              alignItems={'center'}
              mt={2}
              p={2}
              border={`1px solid ${theme?.palette?.grey[200]}`}
              boxShadow={2}
              borderRadius={2}
            >
              <Grid
                item
                xs={12}
                md={8}
                display={'flex'}
                gap={2}
                mb={{ xs: 2, md: 'unset' }}
              >
                <Avatar
                  alt={item?.title}
                  src={item?.src?.src}
                  variant={'circular'}
                />
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    {item?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    display={'flex'}
                    alignItems={'center'}
                    gap={0.5}
                    my={1}
                    color={
                      theme['palette'][`${approvalsStatusColor(item?.status)}`][
                        'main'
                      ]
                    }
                  >
                    {approvalsStatusMessage(item?.status)}
                    {dayjs(item?.time).format('ddd, D MMM h:mm A')}
                  </Typography>
                  <Typography variant="body2">{item?.message}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} textAlign={'end'}>
                {item?.status === 'Received' && (
                  <Fragment>
                    <Button variant="outlined" sx={{ mx: 2 }} color="success">
                      <CheckCircleIcon sx={{ mr: 0.5 }} />
                      Approve
                    </Button>
                    <Button variant="outlined" color="error">
                      <CancelIcon sx={{ mr: 0.5 }} /> Reject
                    </Button>
                  </Fragment>
                )}
                {item?.status === 'RequestSent' && (
                  <Fragment>
                    <Button variant="outlined" sx={{ mx: 2 }} color="secondary">
                      Cancel
                    </Button>
                    <Button variant="outlined">
                      <NotificationsIcon sx={{ mr: 0.5 }} /> Send Reminder
                    </Button>
                  </Fragment>
                )}
              </Grid>
            </Grid>
          ))}
        </Fragment>
      )}
      <RequestApprovalForm
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </Fragment>
  );
};
