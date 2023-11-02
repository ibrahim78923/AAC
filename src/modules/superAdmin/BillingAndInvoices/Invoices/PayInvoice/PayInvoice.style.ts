export const styles = {
  invoiceDetailsTitle: (theme: any) => ({
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.5',
    color: theme?.palette?.slateBlue?.main,
    mb: '40px',
  }),
  iRow: () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  iCell: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
    fontSize: '16px',
    lineHeight: '1.5',
  }),
  iCellHead: (theme: any) => ({
    color: theme?.palette?.slateBlue?.main,
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '1.5',
  }),
  paymentMethods: (theme: any) => ({
    '& .MuiListItem-root': {
      mt: '8px',

      '& .MuiListItemButton-root': {
        bgcolor: theme?.palette?.primary?.lighter,
        borderRadius: '6px',
        p: '14px 16px',

        '& .MuiListItemIcon-root': {
          mr: '16px',

          '& .MuiButtonBase-root.MuiRadio-root': {
            p: '0',
          },
        },
      },

      '& .MuiListItemText-root': {
        '& .MuiListItemText-primary': {
          color: theme?.palette?.blue?.light,
        },
      },
    },
  }),
};
