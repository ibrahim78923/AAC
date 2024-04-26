import CommonDrawer from '@/components/CommonDrawer';
import CommonTabs from '@/components/Tabs';
import React from 'react';
import Properties from './Properties';
import CallActions from './CallActions';

const EditPhoneNumber = (props: any) => {
  const { isEditNumberDrawer, setIsEditNumberDrawer } = props;
  return (
    <CommonDrawer
      isDrawerOpen={isEditNumberDrawer}
      onClose={() => setIsEditNumberDrawer(false)}
      title="Edit Phone Number"
      isOk={true}
      okText="Save Changes"
      // submitHandler={() => { }}
      footer
    >
      <CommonTabs tabsArray={['Properties', 'CallActions']}>
        <Properties />
        <CallActions />
      </CommonTabs>
    </CommonDrawer>
  );
};

export default EditPhoneNumber;
