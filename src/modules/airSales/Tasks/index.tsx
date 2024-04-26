import React from 'react';
import TabsComp from './Tabs';
import TaskHeader from './TaskHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { getSession } from '@/utils';

const Tasks = () => {
  const { user }: { user: any } = getSession();

  return (
    <>
      <TaskHeader />
      <HorizontalTabs
        tabsDataArray={[
          'All',
          'My Tasks',
          'Pending',
          'In-Progress',
          'Completed',
        ]}
      >
        <TabsComp tabValue="" />
        <TabsComp tabValue="" assignTo={user?._id} />
        <TabsComp tabValue="Pending" />
        <TabsComp tabValue="Inprogress" />
        <TabsComp tabValue="Complete" />
      </HorizontalTabs>
    </>
  );
};

export default Tasks;
