import React from 'react';
import {
  Drawer,
  Box,
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { CommonDrawerPropsI } from '@/types/shared/Drawer';
import CloseIcon from '@/assets/icons/shared/close-icon';

const CommonDrawer = ({
  isDrawerOpen,
  onClose,
  children,
  title,
  okText,
  submitHandler,
  isOk,
  cancelText,
  footer,
}: CommonDrawerPropsI) => {
  const theme = useTheme();

  return (
    <Drawer open={isDrawerOpen} onClose={onClose} anchor="right">
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
            <Box onClick={onClose}>
              <CloseIcon />
            </Box>
          </Toolbar>
        </AppBar>
        <Box flex="1" overflow="scroll">
          <Container>{children}</Container>
        </Box>
        {footer && (
          <Box
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
                onClick={onClose}
              >
                {cancelText ? cancelText : 'Cancel'}
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
                  type="submit"
                >
                  {okText}
                </Button>
              )}
            </Toolbar>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
export default CommonDrawer;
