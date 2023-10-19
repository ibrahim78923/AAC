import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import React from 'react';
import { columns, data } from './RecievdItemTable.data';

import { Alert } from '@mui/material';
import useRecievedItem from './useRecievedItem';

export const RecievedItemDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const { errorOccurred, submitHandler } = useRecievedItem();
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
