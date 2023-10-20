import CommonDrawer from '@/components/CommonDrawer';
import { AssociationDrawerPropsI } from './AssociationDrawer.interface';
import AssociationsDrawerData from './AssociationDrawerData';
import { useState } from 'react';

export const AddAssociationsDrawer = ({
  open,
  setDrawerOpen,
  setOpenTicket,
}: AssociationDrawerPropsI) => {
  const [associateRequest, setAssociateRequest] = useState<any>(false);
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Associate Service Requests"
        submitHandler={() => {
          setOpenTicket(associateRequest);
          setDrawerOpen(false);
        }}
        isOk={true}
        footer={true}
        okText="Associate"
      >
        <AssociationsDrawerData setAssociateRequest={setAssociateRequest} />
      </CommonDrawer>
    </div>
  );
};
