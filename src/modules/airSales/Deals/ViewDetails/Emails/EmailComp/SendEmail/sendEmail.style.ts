import { Theme } from '@mui/material';

export const styles = {
  overlayWrapper: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    height: '85vh',
    width: '100%',
    left: '0',
    position: 'absolute',
    zIndex: '1',
    backgroundColor: theme?.palette?.custom?.translucent_white,
    backdropFilter: 'blur(2px)',
  }),
};
