import NoData from '@/components/NoData';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import { Box, Button, useTheme } from '@mui/material';
import { PlusSharedIconColor } from '@/assets/icons';
import SoftwareAssignCategory from '../../../Software/SoftwareAssignCategory';
import { useState } from 'react';
import { approvalsDataArray } from './Approvals.data';
import ReminderRequestApproval from './components/PurchaseOrderApprovels/ReminderApprovels';

export const Approvals = () => {
  const theme: any = useTheme();
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [showApproval, setshowApproval] = useState(false);

  return (
    <>
      <Box display={'flex'} justifyContent={'end'}>
        <Button
          sx={{
            marginRight: '12px',
            backgroundColor: theme.palette.primary?.main,
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: theme.palette.primary?.main,
            },
          }}
          variant="outlined"
          startIcon={<PlusSharedIconColor />}
          onClick={() => {
            setOpenAssignModal(true);
          }}
        >
          Request Approval
        </Button>
      </Box>

      <SoftwareAssignCategory
        openAssignModal={openAssignModal}
        setOpenAssignModal={setOpenAssignModal}
        title={'Request Approval'}
        dataArray={approvalsDataArray}
        cancelText={'Cancel'}
        okText={'Request'}
        successMessage={'Approved Request Send Successfully'}
        setData={setshowApproval}
      />
      {showApproval === false ? (
        <NoData
          image={NoAssociationFound}
          message={
            'Make approved purchases by sending the order to your stakeholders for approval'
          }
        />
      ) : (
        <Box marginTop={'2rem'}>
          <ReminderRequestApproval status={'Request'} />
        </Box>
      )}
    </>
  );
};
