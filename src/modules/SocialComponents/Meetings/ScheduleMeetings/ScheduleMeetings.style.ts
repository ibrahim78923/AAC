export const styles = {
  cardBox: { display: 'flex', flexDirection: 'column', height: '100%' },
  cardStyle: (theme: any) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 1.5,
    py: { md: 7, xs: 2 },
    px: 1,
    border: `1px solid ${theme?.palette?.grey?.[700]}`,
    borderRadius: 3,
    cursor: 'pointer',
    ':hover': {
      boxShadow: `0px 0px 4px 4px ${theme?.palette?.primary?.light}`,
    },
    flex: '1 1 auto',
  }),
};
