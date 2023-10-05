import CommonDrawer from '@/components/CommonDrawer';
import { AddMeetingsDrawerPropsI } from './AddMeetingsDrawer.interface';

export const AddMeetingsDrawer = ({
  open,
  setDrawerOpen,
}: AddMeetingsDrawerPropsI) => {
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Add Meeting"
        submitHandler={() => {}}
        isOk={true}
        footer={true}
        okText="Save"
      >
        <div></div>
      </CommonDrawer>
    </div>
  );
};
