import React, { useState } from 'react';

import {
  Box,
  Button,
  Grid,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

import { AddCircle } from '@mui/icons-material';

import CommonModal from '@/components/CommonModal';

import DelegateCard from './DelegateCard';
import DelegateFilterTable from './DelegateFilterTable';

const Delegates = () => {
  const [isInvite, setIsInvite] = useState(false);
  const theme: any = useTheme<Theme>();
  return (
    <>
      <Grid container>
        <Grid item lg={6}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 600, color: `${theme?.palette?.grey[800]}` }}
          >
            Delegates
          </Typography>
        </Grid>
        <Grid item lg={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => setIsInvite(true)}
              variant="contained"
              sx={{ fontSize: '14px', fontWeight: 500 }}
            >
              <AddCircle />
              &nbsp;&nbsp; Invite Member
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.off_white_one}`,
          marginTop: '1rem',
          padding: '1.2rem',
        }}
      >
        <Grid container spacing={10}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.custom?.main}`,
                  marginBottom: '0.3rem',
                }}
              >
                Total Earnings
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, color: `${theme?.palette?.grey[800]}` }}
              >
                £ 1,234.11
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: `${theme?.palette?.custom?.main}`,
                  marginBottom: '0.3rem',
                }}
              >
                Pending From Inactive Members
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, color: `${theme?.palette?.grey[800]}` }}
              >
                £ 1,234.11
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <DelegateCard />
      <DelegateFilterTable />
      <CommonModal
        open={isInvite}
        handleClose={() => setIsInvite(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={'Invite New Member dfhfdgf'}
        okText={'Create Folder'}
        footerFill={undefined}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: `${theme?.palette?.grey[600]}`,
            paddingBottom: '5px',
          }}
        >
          Email
        </Typography>
        <TextField type="text" placeholder="Enter Name" fullWidth />
        <Box
          sx={{
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
          }}
        >
          <Button variant="outlined" onClick={() => setIsInvite(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setIsInvite(false)}>
            Send Invite
          </Button>
        </Box>
      </CommonModal>
    </>
  );
};

export default Delegates;
