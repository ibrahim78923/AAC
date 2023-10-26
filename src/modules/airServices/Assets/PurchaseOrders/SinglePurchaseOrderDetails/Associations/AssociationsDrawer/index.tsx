import CommonDrawer from '@/components/CommonDrawer';
import { AssociationsDrawerPropsI } from './AssociationsDrawer.interface';
import { AssociationsDrawerData } from './AssociationsDrawerData';
import { useState } from 'react';

export const AssociationsDrawer = ({
  open,
  setDrawerOpen,
  setOpenTicket,
}: AssociationsDrawerPropsI) => {
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
