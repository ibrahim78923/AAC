import { useTheme } from '@mui/material';
const requestApprovalPageStyles: any = () => {
  const theme = useTheme();
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
    boxBorderStyle: { borderBottom: '1px solid #E5E7EB', py: '10px' },
    cancelButton: {
      color: theme.palette.grey[500],
      border: '1px solid #E5E7EB',
      padding: '0px 22px',
      height: '44px',
      fontWeight: '500',
    },
  };

  return parentStyles;
};

export default requestApprovalPageStyles;
