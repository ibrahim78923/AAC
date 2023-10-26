import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import React from 'react';
import { columns, data } from './ReceivedItemsTable.data';

import { Alert } from '@mui/material';
import { useReceivedItems } from './useReceivedItems';

export const ReceivedItems = (props) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { errorOccurred, submitHandler } = useReceivedItems(props);
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Receive items"
      submitHandler={submitHandler}
      footer={true}
      isOk={true}
      okText="Receive"
    >
      <>
        {errorOccurred && (
          <Alert severity="error" style={{ marginBottom: '10px' }}>
            The received item quantity should not exceed the pending item
            quantity
          </Alert>
        )}
        <TanstackTable data={data} columns={columns(setIsDrawerOpen)} />
      </>
    </CommonDrawer>
  );
};
