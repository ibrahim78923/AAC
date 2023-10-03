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
        setIsDrawerOpen={setDrawerOpen}
        title="Add New Task"
        submitHandler={() => {}}
        isOk
        okText="Add Task"
      >
        <div></div>
      </CommonDrawer>
    </div>
  );
};
