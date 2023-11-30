import { Box, Button } from '@mui/material';
import { productData } from './Product.data';
import TanstackTable from '@/components/Table/TanstackTable';
import { UpsertProduct } from './UpsertProduct';
import { GrayPlusIcon } from '@/assets/icons';
import { useProduct } from './useProduct';
import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';

export const Product = () => {
  const {
    deleteModalOpen,
    setDeleteModalOpen,
    handleDeleteBtn,
    editData,
    setEditData,
    upsertProductModal,
    setUpsertProductModal,
    productListColumns,
  } = useProduct();

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'end'}
        flexWrap={'wrap'}
      >
        <Button
          color="secondary"
          onClick={() => {
            setUpsertProductModal(true);
          }}
          startIcon={<GrayPlusIcon />}
        >
          Add Product
        </Button>
      </Box>
      <br />
      <TanstackTable
        data={productData}
        columns={productListColumns}
        isPagination
      />

      <UpsertProduct
        upsertProductModal={upsertProductModal}
        setUpsertProductModal={setUpsertProductModal}
        editData={editData}
        setEditData={setEditData}
      />

      <AlertModals
        type={ALERT_MODALS_TYPE?.DELETE}
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleSubmitBtn={handleDeleteBtn}
        message="Are you sure you want to delete this Product?"
      />
    </>
  );
};
