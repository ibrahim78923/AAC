export const styles = {
  toolbar: () => ({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  }),

  backButton: () => ({
    cursor: 'pointer',
    display: 'flex',
  }),

  headerTitle: () => ({
    display: 'flex',
    fontSize: '15px',
    fontWeight: '400',
    lineHeight: '1.25',
    ml: '10px',
  }),

  container: () => ({
    p: '18px 60px 60px',
    '@media (max-width: 1200px)': {
      p: '18px 40px 40px',
    },
    '@media (max-width: 800px)': {
      p: '18px 24px 30px',
    },
  }),

  searchBar: () => ({
    pl: '60px',
    '@media (max-width: 1200px)': {
      pl: '40px',
    },
    '@media (max-width: 800px)': {
      pl: '0',
    },
  }),

  search: () => ({
    maxWidth: '375px',
    '& .MuiTextField-root': {
      borderRadius: '8px',
    },
  }),

  section: () => ({
    p: '18px 0',
  }),

  sectionHeading: () => ({
    fontSize: '13.5px !important',
    fontWeight: '400',
    color: '#344054',
    lineHeight: '1.25037',
    mb: '18px',
  }),

  recentlyUsedItems: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    p: '18px 0 0',
  },

  recentlyUsedHighlight: () => ({
    fontSize: '10.5px',
    fontWeight: '500',
    color: '#4A1FB8',
    lineHeight: '1',
    borderRadius: '4.5px',
    backgroundColor: '#EBE9FE',
    p: '3px 9px',
  }),

  recentlyUsedItem: () => ({
    fontSize: '10.5px',
    fontWeight: '500',
    color: '#667085',
    lineHeight: '1.25047619',
  }),

  skeleton: (theme: any) => ({
    bgcolor: theme?.palette?.grey?.[300],
    borderRadius: '7.5px',
    border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
  }),
};
