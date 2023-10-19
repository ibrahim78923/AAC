import NoData from '@/components/NoData';
import NoAssociationFound from '@/assets/images/modules/LogitechMouse/association.png';
import { Box, Button, useTheme } from '@mui/material';
import { PlusSharedIconColor } from '@/assets/icons';
import { styles } from './Approvals.style';
import SoftwareAssignCategory from '../../../Software/SoftwareAssignCategory';
import { useState } from 'react';
import { dataArray } from './Approvals.data';
import RequestRecievedApproval from '@/modules/airServices/ServicesTickets/SingleTicketDetail/Approvals/RequestApprovalPage/RequestRecievedApproval';
import ReminderRequestApproval from './components/PurchaseOrderApprovels/ReminderApprovels';
export const Approvals = () => {
  const theme: any = useTheme();
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [showApproval, setshowApproval] = useState(false);
  const [cancleApproval, setCancleApproval] = useState(false);
  const [receivedApproval, setReceivedApproval] = useState(false);

  return (
    <>
      <Box sx={styles.buttonContainer}>
        <Button
          sx={styles.addButtonStyle(theme)}
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
        dataArray={dataArray}
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
        <Box sx={styles.approvalBox}>
          <RequestRecievedApproval />
          <ReminderRequestApproval
            status={'Request'}
            setCancleData={setCancleApproval}
            setReceivedData={setReceivedApproval}
          />
        </Box>
      )}

      {receivedApproval === true ? (
        <ReminderRequestApproval status={'Recieve'} />
      ) : (
        ''
      )}
      {cancleApproval === true ? (
        <ReminderRequestApproval status={'Cancel'} />
      ) : (
        ''
      )}
    </>
  );
};
