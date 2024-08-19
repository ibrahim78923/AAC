import { Theme } from '@mui/material';

export const styles = {
  moduleBox: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    border: `1px solid ${theme?.palette?.primary?.main}`,
    borderRadius: 2,
    gap: 1,
    padding: 2,
    cursor: 'pointer',
  }),
  boxIcon: (theme: Theme) => ({
    backgroundColor: theme?.palette?.primary?.light,
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    color: theme?.palette?.primary?.main,
  }),

  boxTitle: () => ({
    color: 'slateBlue.main',
    whiteSpace: 'nowrap',
    fontWeight: '600',
  }),
};
