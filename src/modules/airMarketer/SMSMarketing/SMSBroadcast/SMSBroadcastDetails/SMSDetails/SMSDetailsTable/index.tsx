import TanstackTable from '@/components/Table/TanstackTable';

import { AlertModals } from '@/components/AlertModals';

import { smsDetailsColumns, smsDetailsData } from './SMSDetailsTable.data';

import useSMSBroadcast from '../../../useSMSBroadcast';

import { AlertModalDeleteIcon } from '@/assets/icons';

const SMSDetailsTable = () => {
  const { isDelete, handleDelete, setIsDelete } = useSMSBroadcast();
  return (
    <>
      <TanstackTable
        columns={smsDetailsColumns(handleDelete)}
        data={smsDetailsData}
      />

      {isDelete && (
        <AlertModals
          message="Are you sure you want to delete this broadcast?"
          type="Delete SMS Broadcast"
          typeImage={<AlertModalDeleteIcon />}
          open={isDelete}
          handleClose={() => setIsDelete(false)}
          handleSubmit={() => setIsDelete(false)}
        />
      )}
    </>
  );
};

export default SMSDetailsTable;
