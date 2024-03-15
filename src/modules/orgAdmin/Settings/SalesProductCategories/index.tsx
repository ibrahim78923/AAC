import React from 'react';

import { Box, Typography, Button, MenuItem, Menu, Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';

import useSalesProduct from './useSalesProductCategories';

import { dataArray } from './SalesProductCategories.data';

import { styles } from './SalesProductCategories.style';

import { v4 as uuidv4 } from 'uuid';
import { ORG_ADMIN_SETTINGS_PRODUCT_CATEGORIES_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const SalesProductCategories = () => {
  const {
    isDraweropen,
    setIsDraweropen,
    isEditMode,
    setIsEditMode,
    productSearch,
    setproductSearch,
    theme,
    anchorEl,
    open,
    handleClick,
    handleClose,
    handleCloseDrawer,
    ProductCategory,
    handleSubmit,
    onSubmit,
    isGetRowValues,
    getRowValues,
    tableRow,
    setPage,
    setPageLimit,
    isLoading,
    isSuccess,
  } = useSalesProduct();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={isEditMode ? 'Edit Category' : 'Product Category'}
        okText={isEditMode ? 'Update' : 'Add'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={ProductCategory}>
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
          <Typography variant="h4">Sales Product Categories</Typography>
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_PRODUCT_CATEGORIES_PERMISSIONS?.ADD_SALES_PRODUCT_CATEGORIES,
            ]}
          >
            <Button
              variant="contained"
              sx={styles?.createBtn}
              onClick={() => (setIsDraweropen(true), setIsEditMode(false))}
            >
              <AddCircleIcon
                sx={{
                  color: `${theme?.palette?.common?.white}`,
                  fontSize: '16px',
                }}
              />{' '}
              Product Category
            </Button>
          </PermissionsGuard>
        </Box>
        <Box sx={styles?.searchAction}>
          <Search
            label="Search here"
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            width="260px"
          />
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_PRODUCT_CATEGORIES_PERMISSIONS?.SALES_PRODUCT_CATEGORIES_ACTION,
            ]}
          >
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={styles?.actionBtn(theme)}
              disabled={isGetRowValues?.length === 0}
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
            </Menu>
          </PermissionsGuard>
        </Box>
        <Grid>
          <PermissionsGuard
            permissions={[
              ORG_ADMIN_SETTINGS_PRODUCT_CATEGORIES_PERMISSIONS?.PRODUCT_CATEGORIES_GRIDVIEW,
            ]}
          >
            <TanstackTable
              columns={getRowValues}
              data={tableRow?.data?.productcategories}
              totalRecords={tableRow?.data?.meta?.total}
              onPageChange={(page: any) => setPage(page)}
              setPage={setPage}
              setPageLimit={setPageLimit}
              count={tableRow?.data?.meta?.pages}
              isPagination
              pageLimit={tableRow?.data?.meta?.limit}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </PermissionsGuard>
        </Grid>
      </Box>
    </>
  );
};

export default SalesProductCategories;
