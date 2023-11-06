export const styles = {
  // inputLabel: {
  //   transform: 'translate(14px, 8px) scale(1) !important',
  //   '&.MuiInputLabel-shrink': {
  //     transform: 'translate(14px, -8px) scale(1) !important',
  //     fontSize: '12px',
  //   },
  // },
  Typograpghy: (theme: any) => ({
    background: theme?.palette?.slateBlue['main'],
    borderRadius: '30px',
    padding: '2px',
    width: '26%',
    textAlign: 'center',
    color: theme?.palette?.common?.white,
    margin: '10px 0px',
  }),

  selectColTypography: (theme: any) => ({
    color: theme?.palette?.slateBlue['main'],
    margin: '16px 0',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: '600',
  }),
};
