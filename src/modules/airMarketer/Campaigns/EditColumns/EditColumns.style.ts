export const styles = {
  BoxStyle: (theme: any) => ({
    padding: '0px 16px',
    borderRadius: '8px',
    border: `1.5px solid ${theme?.palette?.grey[700]}`,
    color: theme?.palette?.slateBlue['main'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  ChildBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
  },
};
