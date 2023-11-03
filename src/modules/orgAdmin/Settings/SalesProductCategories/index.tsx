import React from 'react';

import { Box, Typography, Button, MenuItem, Menu, Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import Search from '@/components/Search';

import useSalesProduct from './useSalesProductCategories';

import {
  ProductCategoryTableData,
  dataArray,
} from './SalesProductCategories.data';

import { styles } from './SalesProductCategories.style';

import { v4 as uuidv4 } from 'uuid';

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
    isChecked,
    getRowValues,
  } = useSalesProduct();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={isEditMode ? 'Edit Category' : 'Product Category'}
        okText={'Add'}
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
          </Menu>
        </Box>
        <Grid>
          <TanstackTable
            columns={getRowValues}
            data={ProductCategoryTableData}
          />
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

export default SalesProductCategories;
