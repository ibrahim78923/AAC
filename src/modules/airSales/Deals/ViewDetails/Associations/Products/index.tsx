import { Box, Button, Grid, Typography } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import Search from '@/components/Search';
import ProductEditorDrawer from './ProductEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

import useProducts from './useProducts';

import { columns } from './Products.data';

import { productsData } from '@/mock/modules/airSales/Deals/ViewDetails';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';

const Products = () => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    selectedCheckboxes,
    setSelectedCheckboxes,
  } = useProducts();

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
          <Typography sx={styles?.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="h5">Products</Typography>
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
                  setOpenDrawer('Add'), setSelectedCheckboxes({});
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
              setOpenDrawer,
              setIsOpenAlert,
              setSelectedCheckboxes,
            })}
            data={productsData}
          />
        </Grid>
      </Grid>
      {openDrawer && (
        <ProductEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          selectedCheckboxes={selectedCheckboxes}
        />
      )}
      <AlertModals
        message={"You're about to remove a record. Are you sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmit={() => {}}
      />
    </Box>
  );
};

export default Products;
