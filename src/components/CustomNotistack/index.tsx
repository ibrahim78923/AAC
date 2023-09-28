/* eslint-disable prettier/prettier */
import React, { ReactNode } from 'react';
import {
  useSnackbar,
  SnackbarProvider,
  MaterialDesignContent,
} from 'notistack';
import Image from 'next/image';
import {
  variantBackgroundColors,
  variantColors,
} from './CustomNotistack.style';
import { CustomSnackbarProps } from './CustomNotistack.interface';
import { GlobalStyles, styled, useTheme } from '@mui/material';

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  variant,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const color = variantColors[variant];
  const backgroundColor = variantBackgroundColors[variant];

  const handleClick = () => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      autoHideDuration: 6000,
      // action: (key) => <></>,
      style: {
        color: color,
        backgroundColor: backgroundColor,
      },
    });
  };

  return <button onClick={handleClick}>Show Snackbar</button>;
};

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#2D7738',
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#970C0C',
  },
}));

function SnackbarStyles() {
  const theme: any = useTheme();
  const isLight = theme.palette.mode === 'light';

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
