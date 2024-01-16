import React from 'react';
import TabsComp from './Tabs';
import TaskHeader from './TaskHeader';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';

const Tasks = () => {
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
        <TabsComp tabValue="" assignTo={'65782638da7b3457092af1dd'} />
        <TabsComp tabValue="Pending" />
        <TabsComp tabValue="Inprogress" />
        <TabsComp tabValue="Complete" />
      </HorizontalTabs>
    </>
  );
};

export default Tasks;
