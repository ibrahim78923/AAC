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
  } = useSalesProduct();

  return (
    <>
      <AlertModals
        message="Are you sure, you want to delete this product?"
        type="delete"
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleSubmit={handleDelete}
      />
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
          <Typography variant="h4">Sales Product</Typography>
          <Button
            variant="contained"
            sx={styles?.createBtn}
            onClick={() => (setIsDraweropen(true), setIsEditMode(false))}
            className="small"
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common?.white}`,
                fontSize: '16px',
              }}
            />
            Create Product
          </Button>
        </Box>
        <Box sx={styles?.searchAction}>
          <Search
            label={'Search here'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            size="small"
          />
          <Button
            id="basic-button"
            className="small"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={styles?.actionBtn(theme)}
            disabled={selectedCheckboxes?.length === 0}
          >
            Actions <ArrowDropDownIcon />
          </Button>
        </Box>
        <Grid>
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
        </Grid>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setIsEditMode(true), setIsDraweropen(true);
            setAnchorEl(null);
          }}
          disabled={selectedCheckboxes?.length > 1}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteModalOpen(true);
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {isDraweropen && (
        <SalesEditorDrawer
          isDraweropen={isDraweropen}
          setIsDraweropen={setIsDraweropen}
          isEditMode={isEditMode}
          handleCloseDrawer={handleCloseDrawer}
          selectedCheckboxes={selectedCheckboxes}
        />
      )}
    </>
  );
};

export default SalesProduct;
