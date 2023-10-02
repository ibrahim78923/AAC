import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { CommonDrawerPropsI } from '@/types/shared/Drawer';
import CloseIcon from '@/assets/icons/shared/close-icon';

const CommonDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  children,
  title,
  okText,
  submitHandler,
  isOk,
}: CommonDrawerPropsI) => {
  const theme = useTheme();
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      anchor="right"
      sx={{
        '& .css-yaabfu-MuiPaper-root-MuiDrawer-paper': {
          borderRadius: '30px 0px 0px 30px !important',
          color: 'black',
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        sx={{
          width: { lg: '500px', md: '500px', sm: '500px', xs: '100vw' },
        }}
      >
        <AppBar
          sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none' }}
          position="static"
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5">{title}</Typography>
            <Box onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </Box>
          </Toolbar>
        </AppBar>
        <Box flex="1" overflow="scroll">
          <Container>
            <p>{children}</p>
          </Container>
        </Box>
        <AppBar
          position="static"
          sx={{ backgroundColor: '#fff', boxShadow: 'none' }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '16px',
              padding: '24px',
              borderTop: '1px solid #E5E7EB',
            }}
          >
            <Button
              sx={{
                color: theme.palette?.grey[500],
                border: '1px solid #E5E7EB',
                padding: '0px 22px',
                height: '44px',
                fontWeight: '500',
                '&:hover': { bgcolor: theme.palette.grey[400] },
              }}
            >
              Cancel
            </Button>
            {isOk && (
              <Button
                variant="contained"
                sx={{
                  padding: '0px 22px',
                  height: '44px',
                  fontWeight: '500',
                }}
                onClick={submitHandler}
              >
                {okText}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Drawer>
  );
};
export default CommonDrawer;
