import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import { AlertModals } from '@/components/AlertModals';
import Search from '@/components/Search';
import ProductEditorDrawer from './ProductEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import useProducts from './useProducts';
import { columns } from './Products.data';
import { PlusIcon } from '@/assets/icons';
import { styles } from '../Associations.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { DRAWER_TYPES } from '@/constants/strings';
import { ProductsProps } from '../Associations-interface';

const Products = ({
  productsData,
  isLoading,
  viewDeal,
  dealId,
}: ProductsProps) => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    setSelectedProduct,
    selectedProduct,
    productLoading,
    deleteProductHandler,
    handleQuantityChange,
    getDealsAssociateProducts,
    // loadingProducts,
  } = useProducts(dealId);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} sx={styles?.countBox}>
          {isLoading ? (
            <Skeleton variant="text" height={40} width={120} />
          ) : (
            <>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {productsData?.length < 10
                  ? `0${productsData?.length}`
                  : productsData?.length}
              </Typography>
              <Typography variant="h5">Products</Typography>
            </>
          )}
        </Grid>
        <Grid item md={8} xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              searchBy={searchName}
              setSearchBy={setSearchName}
              label="Search By Name"
              size="medium"
              width={'250px'}
            />
            <PermissionsGuard
              permissions={[
                AIR_SALES_DEALS_PERMISSIONS?.VIEW_DEAL_ADD_ASSOCIATE_PRODUCT,
              ]}
            >
              <Button
                variant="contained"
                className="medium"
                sx={{ minWidth: '0px', gap: 0.5 }}
                onClick={() => {
                  setOpenDrawer(DRAWER_TYPES?.ADD), setSelectedProduct({});
                }}
              >
                <PlusIcon /> Add Products
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({
              viewDeal,
              setOpenDrawer,
              setIsOpenAlert,
              setSelectedProduct,
              handleQuantityChange,
            })}
            // data={productsData}
            data={getDealsAssociateProducts?.data}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <ProductEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          dealId={dealId}
          selectedProduct={selectedProduct}
        />
      )}
      <AlertModals
        message={"You're about to remove a record. Are you sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmitBtn={deleteProductHandler}
        loading={productLoading}
      />
    </Box>
  );
};

export default Products;
