import { grey } from '@mui/material/colors';

const RequestApprovalPageStyles: any = () => {
  const parentStyles = {
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
      padding: '12px',
      borderRadius: '12px',
      border: '2px solid #E5E7EB',
      margin: '2.4px 5px 0 0',
      resize: 'none',
    },
    boxBorderStyle: { borderBottom: '1px solid #E5E7EB', py: '10px' },
    cancelButton: {
      color: grey[500],
      border: '1px solid #E5E7EB',
      padding: '0px 22px',
      height: '44px',
      fontWeight: '500',
    },
  };

  return parentStyles;
};

export default RequestApprovalPageStyles;
