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
import { LoadingButton } from '@mui/lab';
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
  headerIcon,
  footerActionText,
  footerActionTextIcon,
  onFooterActionSubmit,
  isCancel,
  cancelBtnHandler,
  isFooterFeature,
  isFooterFeatureText,
  isFooterFeatureHandler,
  isLoading,
  isDisabled,
  variant,
}: CommonDrawerPropsI) => {
  const theme = useTheme();

  const cancelHandlerCheck: boolean = isCancel === false ? false : true;
  const handlerIsFooterFeature = isFooterFeature === true ? true : false;

  return (
    <Drawer open={isDrawerOpen} onClose={onClose} anchor="right">
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        sx={{
          width: { lg: '520px', md: '500px', sm: '500px', xs: '100vw' },
        }}
      >
        <AppBar
          sx={{
            backgroundColor: theme?.palette?.common?.white,
            color: theme?.palette?.common?.black,
            boxShadow: 'none',
          }}
          position="static"
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: '20px',
            }}
          >
            <Box
              sx={{
                marginBottom: '20px',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
              }}
            >
              {headerIcon}
              <Typography variant="subtitle1" textTransform="capitalize">
                {title}
              </Typography>
            </Box>
            <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
              <CloseIcon />
            </Box>
          </Toolbar>
        </AppBar>
        <Box flex="1" overflow="scroll">
          <Container>{children}</Container>
        </Box>
        <Box
          position="static"
          sx={{ backgroundColor: '#fff', boxShadow: 'none' }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: `${
                footerActionText ? 'space-between' : 'flex-end'
              }`,
              gap: '16px',
              padding: '24px',
              borderTop: '1px solid #E5E7EB',
            }}
          >
            {footer && (
              <>
                {footerActionText && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={onFooterActionSubmit}
                  >
                    {footerActionTextIcon}&nbsp;
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.slateBlue.main,
                        fontWeight: '500',
                      }}
                    >
                      {footerActionText}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  {cancelHandlerCheck && (
                    <Button
                      sx={{
                        color: theme?.palette?.grey[500],
                        border: '1px solid #E5E7EB',
                        padding: '0px 22px',
                        height: '44px',
                        fontWeight: '500',
                        '&:hover': { bgcolor: theme?.palette?.grey[400] },
                      }}
                      onClick={cancelBtnHandler ? cancelBtnHandler : onClose}
                    >
                      {cancelText ? cancelText : 'Cancel'}
                    </Button>
                  )}
                  {handlerIsFooterFeature && (
                    <Button
                      onClick={isFooterFeatureHandler}
                      variant={variant ?? 'outlined'}
                    >
                      {isFooterFeatureText}
                    </Button>
                  )}
                  {isOk && (
                    <LoadingButton
                      variant="contained"
                      sx={{
                        padding: '0px 22px',
                        height: '44px',
                        fontWeight: '500',
                      }}
                      loading={isLoading}
                      onClick={submitHandler}
                      disabled={isDisabled}
                    >
                      {okText}
                    </LoadingButton>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Box>
      </Box>
    </Drawer>
  );
};
export default CommonDrawer;
