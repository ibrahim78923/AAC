import React, { Fragment } from 'react';
import CommonTabs from '@/components/Tabs';
import Filter from './TabToolbar';
import { v4 as uuidv4 } from 'uuid';
import { useTask } from '../useTask';
import CreateTask from '../CreateTask';
import { TasksData } from '../Task.data';

const Tabs = () => {
  const { handleToggler, toggler, handleActionBtn, actionType } = useTask();

  return (
    <>
      <CommonTabs
        tabsArray={TasksData.map(({ label }) => label)}
        isHeader
        headerChildren={
          <Filter
            handleActionBtn={handleActionBtn}
            disableActionBtn={false}
            handleToggler={(val: any) => handleToggler(val)}
            handleRefreshList={() => {
              'refresh';
            }}
          />
        }
      >
        {toggler === 'listView' &&
          TasksData.map(({ tableChildren }) => (
            <Fragment key={uuidv4()}>{tableChildren}</Fragment>
          ))}
        {toggler === 'gridView' &&
          TasksData.map(({ gridChildtren }) => (
            <Fragment key={uuidv4()}>{gridChildtren}</Fragment>
          ))}
      </CommonTabs>
      {actionType === 'Edit' && (
        <CreateTask title={'Edit Task'} hideBtn defaultOpen />
      )}
    </>
  );
};

export default Tabs;
