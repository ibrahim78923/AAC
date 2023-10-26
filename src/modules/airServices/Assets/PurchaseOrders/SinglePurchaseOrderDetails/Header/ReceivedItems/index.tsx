import CommonDrawer from '@/components/CommonDrawer';
import { columns, data } from './ReceivedItemsTable.data';

import { Alert } from '@mui/material';
import { useReceivedItems } from './useReceivedItems';
import TanstackTable from '@/components/Table/TanstackTable';

export const ReceivedItems = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const { errorOccurred, submitHandler } = useReceivedItems();
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
