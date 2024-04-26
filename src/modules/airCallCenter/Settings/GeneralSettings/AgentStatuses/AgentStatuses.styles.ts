export const styles = {
  pageHeader: () => ({
    padding: '16px 24px',
  }),
  heading: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
  }),
  headerText: (theme: any) => ({
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '1.5',
    color: theme?.palette?.custom?.main,
    mt: '18px',
  }),
  tableCont: () => ({
    mt: '44px',
  }),
};
