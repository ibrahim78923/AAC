import React from 'react';

import { Box, Typography, Button, MenuItem, Menu, Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';

import useSalesProduct from './useSalesProduct';

import { SalesProductTableData, dataArray } from './SalesProduct.data';

import { styles } from './SalesProduct.style';

import { v4 as uuidv4 } from 'uuid';

const SalesProduct = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    isDeleteModalOpen,
    setDeleteModalOpen,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    salesProduct,
    handleSubmit,
    onSubmit,
    handleCloseDeleteModal,
    handleDelete,
    isChecked,
    getRowValues,
  } = useSalesProduct();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={isEditMode ? 'Edit Product' : 'Create Product'}
        okText={'Add'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={salesProduct}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

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
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />{' '}
            Create Product
          </Button>
        </Box>
        <Box sx={styles?.searchAction}>
          <Search
            label={'Search here'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            width="100%"
            size="small"
            sx={{
              '@media (max-width: 500px)': {
                width: '100%',
              },
            }}
          />
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={styles?.actionBtn(theme)}
            disabled={!isChecked}
          >
            Actions <ArrowDropDownIcon />
          </Button>
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
              onClick={() => (setIsEditMode(true), setIsDraweropen(true))}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={() => setDeleteModalOpen(true)}>Delete</MenuItem>
          </Menu>
        </Box>
        <Grid>
          <TanstackTable columns={getRowValues} data={SalesProductTableData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>
      </Box>
    </>
  );
};

export default SalesProduct;
