import { Box, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TanstackTable from '@/components/Table/TanstackTable';
import { associatedAssetsData } from './AssociatedAssets.data';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useAssociatedAssets } from './useAssociatedAssets';
import { AddAsset } from './AddAsset';
import { Fragment } from 'react';

export const AssociatedAssets = () => {
  const {
    associatedAssetsColumns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setAddModalOpen,
    addModalOpen,
  } = useAssociatedAssets();

  return (
    <Fragment>
      <Box textAlign={'end'} mb={2}>
        <Button
          startIcon={<AddCircleIcon />}
          color={'secondary'}
          onClick={() => setAddModalOpen?.(true)}
        >
          Add Asset
        </Button>
      </Box>

      <TanstackTable
        data={associatedAssetsData}
        columns={associatedAssetsColumns}
        isPagination
      />

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Asset?"
        />
      )}

      {addModalOpen && (
        <AddAsset
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
        />
      )}
    </Fragment>
  );
};
