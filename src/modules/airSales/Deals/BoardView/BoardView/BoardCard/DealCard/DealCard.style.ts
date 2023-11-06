export const styles = {
  card: (theme: any) => ({
    backgroundColor: 'common.white',
    border: `1px solid ${theme?.palette?.grey[700]}`,
    p: '10px',
    borderRadius: '10px',
    '&:not(:first-of-type)': {
      mt: '16px',
    },
  }),
  cardHeader: () => ({
    display: 'flex',
  }),
  dealOwner: () => ({
    flex: '1',
    display: 'flex',
    mb: '6px',
  }),
  avatar: () => ({
    backgroundColor: 'primary.main',
    height: '38px',
    width: '38px',
    mr: '8px',
  }),
  ownerName: () => ({
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '1.5',
    color: 'slateBlue.main',
  }),
  orgName: (theme: any) => ({
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.5',
    color: theme?.palette?.grey[900],
  }),
  cardBody: () => ({
    display: 'block',
  }),
  spaceBetween: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    p: '2px 0',
  }),
  label: () => ({
    color: 'custom.grayish_blue',
  }),
  title: () => ({
    color: 'blue.main',
    fontWeight: '600',
  }),
  cardFooter: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme?.palette?.grey[400]}`,
    pt: '8px',
  }),
  activities: (theme: any) => ({
    listStyle: 'none',
    display: 'flex',
    lineHeight: '16px',
    '& > li': {
      display: 'flex',
      p: '0 8px',
      borderLeft: `1px solid ${theme?.palette?.grey[400]}`,
      '&:first-child': {
        border: 'none',
        pl: '0',
      },
      '&:last-child': {
        pr: '0',
      },
    },
  }),
  avatarGroup: () => ({
    '& .MuiAvatar-root': {
      height: '24px',
      width: '24px',
      backgroundColor: 'primary.main',
      border: 'none',
      fontSize: '12px',
    },
  }),
};
