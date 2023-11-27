import { Box, Button } from '@mui/material';
import { Fragment } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useVendors } from './useVendors';
import TanstackTable from '@/components/Table/TanstackTable';
import { vendorsData } from './Vendors.data';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { UpsertAsset } from './UpsertVendor';

export const Vendors = () => {
  const {
    columns,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleSubmitDelete,
    setIsUpsertModalOpen,
    isUpsertModalOpen,
  } = useVendors();

  return (
    <Fragment>
      <Box textAlign={'end'} mb={2}>
        <Button
          startIcon={<AddCircleIcon />}
          color={'secondary'}
          onClick={() => setIsUpsertModalOpen?.({ open: true, id: '' })}
        >
          Add Vendor
        </Button>
      </Box>

      <TanstackTable data={vendorsData} columns={columns} isPagination />

      {isDeleteModalOpen && (
        <AlertModals
          type={ALERT_MODALS_TYPE?.DELETE}
          open={isDeleteModalOpen?.open}
          handleClose={() => setIsDeleteModalOpen?.({ open: false, id: '' })}
          handleSubmitBtn={handleSubmitDelete}
          message="Are you sure want to delete this Vendor?"
        />
      )}

      {isUpsertModalOpen?.open && (
        <UpsertAsset
          isUpsertModalOpen={isUpsertModalOpen}
          setIsUpsertModalOpen={setIsUpsertModalOpen}
        />
      )}
    </Fragment>
  );
};
