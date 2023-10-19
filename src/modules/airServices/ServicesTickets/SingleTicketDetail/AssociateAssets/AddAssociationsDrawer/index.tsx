import CommonDrawer from '@/components/CommonDrawer';
import { AddAssociateAssetDrawerPropsI } from './AddAssociationsDrawer.interface';
import AssociationsDrawerData from './AssociationsDrawerData';

export const AddAssociationsDrawer = ({
  open,
  setDrawerOpen,
}: AddAssociateAssetDrawerPropsI) => {
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Add associations"
        submitHandler={() => {}}
        isOk={true}
        footer={true}
        okText="Associate"
      >
        <AssociationsDrawerData />
      </CommonDrawer>
    </div>
  );
};
