import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import React, { useState } from 'react';
import { columns, data } from './RecievdItemTable.data';
import { enqueueSnackbar } from 'notistack';
import { Alert } from '@mui/material';

export const RecievedItemDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  let booVariable: boolean;
  const [errorOccurred, setErrorOccurred] = useState(false);
  const showSnackbar = (boolValue: boolean) => {
    if (boolValue) {
      const message = 'Purchase Order items count update successfully';
      const variant = 'success';
      enqueueSnackbar(message, {
        variant: variant,
      });
    }
  };
  const submitHandler = () => {
    data.forEach((item) => {
      if (item.Id === item.Id && item.received > item.pending) {
        booVariable = true;
      } else {
        setErrorOccurred(true);
      }
    });
    showSnackbar(booVariable);
  };

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
