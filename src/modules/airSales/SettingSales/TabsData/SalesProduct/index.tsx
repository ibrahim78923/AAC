import React from 'react';

import { Box, Typography, Button, MenuItem, Menu, Grid } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import TanstackTable from '@/components/Table/TanstackTable';

import SalesEditorDrawer from './SalesEdItorDrawer';

import useSalesProduct from './useSalesProduct';

import { styles } from './SalesProduct.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_SETTINGS } from '@/constants/permission-keys';

const SalesProduct = () => {
  const {
    isEditMode,
    selectedCheckboxes,
    setIsDraweropen,
    salesProductData,
    isDraweropen,
    setIsEditMode,
    isDeleteModalOpen,
    handleCloseDrawer,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDeleteModal,
    handleDelete,
    getRowValues,
    setAnchorEl,
    setPageLimit,
    setPage,
    isLoading,
    isSuccess,
    setSelectedCheckboxes,
    deleteProduct,
  } = useSalesProduct();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          padding: '1rem',
          boxShadow: '0px 1px 2px 0px #1018280F',
          borderRadius: '8px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h3">Sales Product</Typography>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.CREATE_PRODUCT]}>
            <Button
              variant="contained"
              sx={styles?.createBtn}
              onClick={() => (setIsDraweropen(true), setIsEditMode(false))}
              className="small"
              startIcon={
                <AddCircleIcon
                  sx={{
                    color: `${theme?.palette?.common?.white}`,
                    fontSize: '16px',
                  }}
                />
              }
            >
              Create Product
            </Button>
          </PermissionsGuard>
        </Box>
        <Box sx={styles?.searchAction}>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.SEARCH]}>
            <Search
              label={'Search here'}
              searchBy={productSearch}
              setSearchBy={setproductSearch}
              size="small"
            />
          </PermissionsGuard>
          <Button
            id="basic-button"
            className="small"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={styles?.actionBtn(theme)}
            disabled={selectedCheckboxes?.length === 0}
            endIcon={<ArrowDropDownIcon />}
          >
            Actions
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{
              '.MuiPopover-paper': {
                minWidth: '110px',
              },
            }}
          >
            <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.EDIT]}>
              <MenuItem
                onClick={() => {
                  setIsEditMode(true), setIsDraweropen(true);
                  setAnchorEl(null);
                }}
                disabled={selectedCheckboxes?.length > 1}
              >
                Edit
              </MenuItem>
            </PermissionsGuard>
            <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.DELETE]}>
              <MenuItem
                onClick={() => {
                  setDeleteModalOpen(true);
                  setAnchorEl(null);
                }}
              >
                Delete
              </MenuItem>
            </PermissionsGuard>
          </Menu>
        </Box>
        <Grid>
          <PermissionsGuard permissions={[AIR_SALES_SETTINGS?.PRODUCT_LIST]}>
            <TanstackTable
              columns={getRowValues}
              data={salesProductData?.salesproducts}
              setPage={setPage}
              setPageLimit={setPageLimit}
              isPagination
              isLoading={isLoading}
              currentPage={salesProductData?.meta?.pages}
              count={salesProductData?.meta?.total}
              pageLimit={salesProductData?.meta?.limit}
              totalRecords={salesProductData?.meta?.total}
              isSuccess={isSuccess || true}
              onPageChange={(page: any) => setPage(page)}
            />
          </PermissionsGuard>
        </Grid>
      </Box>

      {isDraweropen && (
        <SalesEditorDrawer
          isDraweropen={isDraweropen}
          setIsDraweropen={setIsDraweropen}
          isEditMode={isEditMode}
          handleCloseDrawer={handleCloseDrawer}
          setSelectedCheckboxes={setSelectedCheckboxes}
          selectedCheckboxes={selectedCheckboxes}
        />
      )}

      {isDeleteModalOpen && (
        <AlertModals
          message="Are you sure, you want to delete this product?"
          type="delete"
          open={isDeleteModalOpen}
          handleClose={handleCloseDeleteModal}
          handleSubmitBtn={handleDelete}
          loading={deleteProduct}
        />
      )}
    </>
  );
};

export default SalesProduct;
