import { Theme } from '@mui/material';

export const styles = {
  productIconColor: (theme: Theme) => ({
    padding: 3,
    cursor: 'pointer',
    '&.active': {
      boxShadow: `0px 0px 7px 5px ${theme?.palette?.grey[700]}`,
    },
  }),
};
