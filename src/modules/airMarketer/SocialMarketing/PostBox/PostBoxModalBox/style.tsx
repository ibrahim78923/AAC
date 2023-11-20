import { Theme } from '@mui/material';

export const styles = {
  postedStyle: (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '120px',
    height: '35px',
    background: theme?.palette?.primary?.light,
    borderRadius: '50px',
    color: theme?.palette?.primary?.main,
  }),
};
