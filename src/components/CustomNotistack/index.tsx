import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import Image from 'next/image';
import { GlobalStyles, useTheme } from '@mui/material';

function SnackbarStyles() {
  const theme: any = useTheme();

  return (
    <GlobalStyles
      styles={{
        '#__next': {
          '& .SnackbarContent-root': {
            width: '100%',
            color: theme.palette.grey[0],
            backgroundColor: theme.palette.grey[900],
            '&.SnackbarItem-variantSuccess, &.SnackbarItem-variantError, &.SnackbarItem-variantWarning, &.SnackbarItem-variantInfo':
              {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
              },
            [theme.breakpoints.up('md')]: {
              minWidth: 240,
            },
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 },
          },
        },
      }}
    />
  );
}
export default function NotistackProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SnackbarStyles />
      <SnackbarProvider
        maxSnack={1}
        iconVariant={{
          success: (
            <div style={{ marginRight: '10px' }}>
              <Image
                src="/Alert Icons.png"
                alt="Success"
                width={24}
                height={24}
              />
            </div>
          ),
          error: (
            <div style={{ marginRight: '10px' }}>
              <Image
                src="/AlertIconsRedCross.svg"
                alt="error"
                width={24}
                height={24}
              />
            </div>
          ),
          warning: (
            <div style={{ marginRight: '10px' }}>
              <Image
                src="/AlertIconsYellowwarring.svg"
                alt="warning"
                width={24}
                height={24}
              />
            </div>
          ),
          info: (
            <div style={{ marginRight: '10px' }}>
              <Image
                src="/AlertIconsBlueInfo.svg"
                alt="info"
                width={24}
                height={24}
              />
            </div>
          ),
        }}
      >
        {/* <CustomSnackbar
          message="Create Project Successfully"
          variant="success"
        /> */}
        {children}
      </SnackbarProvider>
    </>
  );
}
