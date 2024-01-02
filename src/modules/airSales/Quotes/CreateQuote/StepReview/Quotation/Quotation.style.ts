export const styles = {
  box: (theme: any) => ({
    border: `1px solid ${theme?.palette?.grey[700]}`,
    borderRadius: '8px',
    padding: '12px',
    mt: '16px',
  }),
  bRow: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: '10px',
  }),
  bHead: (theme: any) => ({
    color: theme?.palette?.blue?.dull_blue,
    fontSize: '14px',
    fontWeight: '500',
  }),
  bCell: (theme: any) => ({
    color: theme?.palette?.custom?.main,
    fontSize: '14px',
    fontWeight: '400',
  }),
  bRowTotal: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: '30px',
  }),

  signatureCard: () => ({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  signatureBox: () => ({
    display: 'flex',
    flexDirection: 'column',
  }),
  signatureSpace: () => ({
    flex: '1',
    display: 'flex',
    alignItems: 'flex-end',
    pb: '6px',
    minHeight: '50px',
  }),
  dateBox: () => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  }),
  dateSpace: () => ({
    pb: '6px',
    fontSize: '14px',
    fontWeight: '400',
    color: 'blue.dull_blue',
    minHeight: '50px',
  }),
  boxLabel: (theme: any) => ({
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.5',
    color: theme?.palette?.blue?.dull_blue,
    width: '130px',
    pt: '4px',
    borderTop: `1px solid ${theme?.palette?.grey[700]}`,
  }),
};
