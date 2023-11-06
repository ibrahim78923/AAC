export const styles = {
  approvalsContainerBox: {
    maxHeight: '23.125rem',
    overflow: 'auto',
  },
  approvalsContainer: (theme: any) => ({
    border: `0.0625rem solid ${theme?.palette?.grey?.[900]}`,
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '0.625rem',
  }),
  requestApprovalBoxFirst: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
  },
  requestApprovalBoxSecond: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3125rem',
  },
  requestApprovalButton: (theme: any) => ({
    border: `0.0625rem solid ${theme?.palette?.grey?.[700]}`,
    padding: '0rem 0.9375rem',
    height: '2.5rem',
    fontWeight: '500',
  }),
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '0.625rem',
  },
  boxBorderStyle: (theme: any) => ({
    borderBottom: `0.0625rem solid ${theme?.palette?.divider}`,
    paddingTop: '0.625rem',
  }),
  dialogBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  },
};
