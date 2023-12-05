import TanstackTable from '@/components/Table/TanstackTable';

import { AlertModals } from '@/components/AlertModals';

import { smsDetailsColumns, smsDetailsData } from './DetailsTable.data';

import useSMSBroadcast from '../../../useBroadcast';

import { AlertModalDeleteIcon } from '@/assets/icons';

const DetailsTable = () => {
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

export default DetailsTable;
