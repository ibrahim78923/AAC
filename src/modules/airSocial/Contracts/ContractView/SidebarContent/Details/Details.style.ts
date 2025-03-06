import { Theme } from '@mui/material';

export const styles = {
  ownerDetailsContainer: {
    display: 'block',
    padding: '24px 0',
  },
  detailsTitle: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '1.25',
    marginBottom: '22px',
  },
  ownerDetails: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    borderBottom: `1px solid ${theme?.palette?.divider}`,
  }),

  ownerAvatar: (theme: Theme) => ({
    width: '40px',
    height: '40px',
    backgroundColor: theme?.palette?.primary?.main,
    fontSize: '14px',
  }),
  ownerInfo: {
    flex: '1',
  },
  ownerRole: (theme: Theme) => ({
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: theme?.palette?.slateBlue?.main,
  }),
  ownerEmail: (theme: Theme) => ({
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: theme?.palette?.custom?.light,
  }),
  otherDetails: {
    padding: '24px 0',
  },
  otherDetailsList: (theme: Theme) => ({
    listStyle: 'none',
    padding: '0 18px',
    margin: '0',

    '& li': {
      padding: '14px 0',
      borderBottom: `1px solid ${theme?.palette?.divider}`,

      '& .listItemLabel': {
        fontSize: '14px',
        lineHeight: '1.25',
      },
      '& .listItemMeta': {
        fontSize: '14px',
        lineHeight: '1.25',
        color: theme?.palette?.custom?.light,
        mt: '2px',
      },
    },
  }),

  userAccessDetails: {
    padding: '24px 0',
  },
  usrsAccess: {
    display: 'flex',
  },
  avatarGroup: (theme: Theme) => ({
    '& .MuiAvatar-root': {
      width: '32px',
      height: '32px',
      backgroundColor: theme?.palette?.primary?.main,
      fontSize: '12px',
    },
  }),
};
