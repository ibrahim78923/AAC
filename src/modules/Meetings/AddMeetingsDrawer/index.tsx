import CommonDrawer from '@/components/CommonDrawer';
import { AddMeetingsDrawerTypes } from './AddMeetingsDrawer.types';

export const AddMeetingsDrawer = ({ open }: AddMeetingsDrawerTypes) => {
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        setIsDrawerOpen={setIsDrawerOpen}
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
