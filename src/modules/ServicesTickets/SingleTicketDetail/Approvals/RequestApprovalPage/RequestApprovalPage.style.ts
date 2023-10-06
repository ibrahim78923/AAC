const RequestApprovalPageStyles = () => ({
  approvalsContainerBox: {
    maxHeight: '370px',
    overflow: 'auto',
  },
  approvalsContainer: {
    border: '1px solid grey',
    borderRadius: '.5rem',
    padding: '1rem',
    marginBottom: '10px',
  },
  requestApprovalBoxFirst: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  requestApprovalBoxSecond: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  requestApprovalButton: {
    border: '1px solid #E5E7EB',
    padding: '0px 15px',
    height: '40px',
    fontWeight: '500',
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '16px',
    marginTop: '10px',
  },
  textareaStyle: {
    width: '100%',
    height: '200px',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid #E5E7EB',
  },
  boxBorderStyle: { borderBottom: '1px solid #E5E7EB', py: '10px' },
});

export default RequestApprovalPageStyles;
