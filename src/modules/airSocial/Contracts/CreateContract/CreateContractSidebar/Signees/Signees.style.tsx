import { Theme } from '@mui/material';

export const styles = {
  signeePanel: {
    padding: '18px 0',
  },
  signeesList: {
    pt: '0px',
  },
  signeeDetails: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    borderBottom: `1px solid ${theme?.palette?.divider}`,
    minWidth: '0',
  }),
  signeeAvatar: (theme: Theme) => ({
    width: '40px',
    height: '40px',
    backgroundColor: theme?.palette?.primary?.main,
    fontSize: '14px',
  }),
  signeeInfoWrap: {
    flex: '1',
    display: 'flex',
    gap: '10px',
  },
  signeeInfo: {
    flex: '1',
  },
  signeeName: (theme: Theme) => ({
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
  }),
  signeeMeta: (theme: Theme) => ({
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: theme?.palette?.custom?.light,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),

  signingOrder: {
    display: 'flex',
    alignItems: 'center',
    mt: '26px',
  },

  signingOrderTitle: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.25',
    flex: '1',
  },
  menu: {
    '& .MuiList-root': {
      padding: '0',
    },
  },
  fieldItem: {
    display: 'block',
    alignItems: 'center',
    gap: '10px',
    padding: '6px 12px',
  },
  fieldIcon: {
    height: '30px',
    width: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createNewField: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme?.palette?.custom?.cloud_white,
    gap: '10px',
    padding: '10px 12px',
    mt: '6px',
  }),
  icon: {
    height: '18px',
    width: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid #292D32`,
    borderRadius: '50%',
  },
  plainItem: {
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTypography-h6': {
      margin: '30px 0',
    },
  },
  search: {
    padding: '12px 12px 6px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
};
