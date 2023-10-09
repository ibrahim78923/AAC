import React from 'react';
import { useSnackbar, SnackbarProvider } from 'notistack';
import {
  AlertErrorIcon,
  AlertInfoIcon,
  AlertSuccessIcon,
  AlertWarninIcon,
} from '@/assets/icons';
// import {
//   variantBackgroundColors,
//   variantColors,
// } from './CustomNotistack.style';
import { CustomSnackbarPropsI } from './CustomNotistack.interfacei';

const CustomSnackbar: React.FC<CustomSnackbarPropsI> = ({
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
          <div style={{ marginRight: '10px', marginTop: '0.5rem' }}>
            <AlertSuccessIcon />
          </div>
        ),
        error: (
          <div style={{ marginRight: '10px', marginTop: '0.5rem' }}>
            <AlertErrorIcon />
          </div>
        ),
        warning: (
          <div style={{ marginRight: '10px', marginTop: '0.5rem' }}>
            <AlertWarninIcon />
          </div>
        ),
        info: (
          <div style={{ marginRight: '10px', marginTop: '0.5rem' }}>
            <AlertInfoIcon />
          </div>
        ),
      }}
    >
      <CustomSnackbar message="Create Project Successfully" variant="success" />
    </SnackbarProvider>
  );
}
