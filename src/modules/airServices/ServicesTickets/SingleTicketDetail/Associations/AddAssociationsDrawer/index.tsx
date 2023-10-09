import CommonDrawer from '@/components/CommonDrawer';
import { AddAssociationsDrawerPropsI } from './AddAssociationsDrawer.interface';
import AssociationsDrawerData from '../AssociationsDrawerData';

export const AddAssociationsDrawer = ({
  open,
  setDrawerOpen,
}: AddAssociationsDrawerPropsI) => {
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Add associations"
        submitHandler={() => {}}
        isOk={true}
        footer={true}
        okText="Save"
      >
        <AssociationsDrawerData />
      </CommonDrawer>
    </div>
  );
};
