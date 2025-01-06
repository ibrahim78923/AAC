import { Theme } from '@mui/material';

export const styles = {
  container: (theme: Theme) => ({
    borderBottom: 1,
    borderColor: theme?.palette?.custom?.off_white_three,
  }),
  tabList: {
    minHeight: '20px',
    '& .MuiTabs-flexContainer': {
      '& .MuiButtonBase-root': {
        flex: '1',
        mr: '0',
        fontWeight: '400',
        fontSize: '12px',
        padding: '12px 0 6px',
        minHeight: '20px',

        '&.Mui-selected': {
          color: 'primary.main',
        },
      },
    },

    '& .MuiTabs-indicator': {
      height: '1px',
    },
  },
};
