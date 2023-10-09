import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Box, Grid, Typography, Button } from '@mui/material';
import { styles } from './LogitechMouse.styles';
import { ArrowLeftIcon } from '@/assets/icons';
import LogitechTabs from './LogitechTabs';

export default function LogitechMouse() {
  return (
    <>
      <Grid container sx={{ ...styles.logitechMouseMainContainer }}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ArrowLeftIcon />
              <Typography
                sx={{
                  ...styles.inventoryTitle,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Logitech Mouse
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                aria-label="action-menu"
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                // onClick={handleMenuClick}
                sx={{
                  color: 'black',
                  bgColor: '#FFFFFF',
                  p: '9px 16px',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                }}
                endIcon={<ExpandMoreIcon />}
              >
                Action
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <LogitechTabs />
        </Grid>
      </Grid>
    </>
  );
}
