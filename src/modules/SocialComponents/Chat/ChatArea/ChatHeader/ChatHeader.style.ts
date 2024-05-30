import { useTheme } from '@mui/material';

export const styles = {
  headerChat: (theme: any) => {
    return {
      background: theme?.palette?.primary.main,
      padding: '0px 20px',
      height: '74px',
      borderRadius: '16px 16px 0px 0px',
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme?.palette?.common?.white}`,
    };
  },
  userStatus: (state: any) => {
    const theme = useTheme();
    return {
      background: state
        ? theme?.palette?.custom?.light_green_bg_two
        : theme?.palette?.grey[100],
      borderRadius: '50%',
      width: '7px',
      height: '7px',
    };
  },
  unStyledButton: () => {
    return {
      borderRadius: '50%',
      width: 'fit-content',
      minWidth: 'fit-content',
      height: 'fit-content',
      margin: '0',
      padding: '0',
    };
  },
};
