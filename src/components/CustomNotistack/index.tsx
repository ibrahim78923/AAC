/* eslint-disable prettier/prettier */
import React from 'react';
import { useSnackbar, SnackbarProvider } from 'notistack';
import Image from 'next/image';
import {
  variantBackgroundColors,
  variantColors,
} from './CustomNotistack.style';
import { CustomSnackbarProps } from './CustomNotistack.interface';

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

export default function CustomNotistack() {
  return (
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
      <CustomSnackbar message="Create Project Successfully" variant="success" />
    </SnackbarProvider>
  );
}
