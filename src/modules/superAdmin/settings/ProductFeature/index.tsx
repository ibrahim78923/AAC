import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { FormProvider } from '@/components/ReactHookForm';
import {
  columns,
  addProductFeatureFormData,
  editProductFeatureFormData,
} from './ProductFeatures.data';
import PlusShared from '@/assets/icons/shared/plus-shared';
import { DownIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import useProductFeature from './useProductFeature';
import MultiSearchableSelect from './multiSearchableSelect';
import { styles } from './ProductFeature.style';

const ProductFeature = () => {
  const theme = useTheme();
  const [value, setValue] = useState<any>(); // eslint-disable-line
  const {
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionMenuClose,
    isDisabled,
    setIsDisabled,
    rowId,
    setRowId,
    dataProductFeatures,
    loagingProductFeatures,
    setSearchValue,
    setPageLimit,
    setPage,
    handlePageChange,
    openDrawerAddFeature,
    handleOpenDrawerAddFeature,
    handleCloseDrawerAddFeature,
    methodsAddFeature,
    handleAddFeatureSubmit,
    loadingAddFeature,
    loadingEditFeature,
    openDrawerEditFeature,
    handleOpenDrawerEditFeature,
    handleCloseDrawerEditFeature,
    handleEditFeatureSubmit,
    methodsEditFeature,
  } = useProductFeature();

  const ProductFeatureTableColumns = columns(
    setIsDisabled,
    setRowId,
    rowId,
    theme,
  );

  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '1px solid #EAECF0',
      }}
    >
      <Box sx={styles?.pageHeader}>
        <Box sx={styles?.heading}>
          <Typography variant="h3" sx={{ fontWeight: '600' }}>
            Product Features Setup
          </Typography>
          <Box>
            <MultiSearchableSelect
              options={[
                { value: 'JohnDoe', label: 'John Doe' },
                { value: 'SaraAndrew', label: 'Sara Andrew' },
              ]}
              setValue={setValue}
              isCheckBox={true}
            />
          </Box>
        </Box>
        <Box sx={styles?.filterBar}>
          <Box sx={styles?.search}>
            <Search
              setSearchBy={setSearchValue}
              label="Search Here"
              size="small"
              width={'100%'}
            />
          </Box>
          <Box sx={styles?.filterButtons}>
            <Button
              id="basic-button"
              aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={actionMenuOpen ? 'true' : undefined}
              onClick={handleActionsMenuClick}
              disabled={isDisabled}
              sx={styles?.actionBtn}
              className="small"
            >
              Actions &nbsp; <DownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={actionMenuOpen}
              onClose={handleActionMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              PaperProps={{
                style: {
                  width: '112px',
                },
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={handleOpenDrawerEditFeature}
                style={{ fontSize: '14px' }}
              >
                Edit
              </MenuItem>
            </Menu>
            <Button
              variant="contained"
              className="small"
              onClick={handleOpenDrawerAddFeature}
            >
              <PlusShared /> &nbsp; Add Feature
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <TanstackTable
          columns={ProductFeatureTableColumns}
          data={dataProductFeatures?.data?.productfeatures}
          isLoading={loagingProductFeatures}
          isPagination
          count={dataProductFeatures?.data?.meta?.pages}
          totalRecords={dataProductFeatures?.data?.meta?.total}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </Box>

      <CommonDrawer
        isDrawerOpen={openDrawerAddFeature}
        onClose={handleCloseDrawerAddFeature}
        title={'Add Product Feature form'}
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleAddFeatureSubmit}
        isLoading={loadingAddFeature}
      >
        <>
          <FormProvider methods={methodsAddFeature}>
            <Grid container spacing={4}>
              {addProductFeatureFormData()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </>
      </CommonDrawer>

      <CommonDrawer
        isDrawerOpen={openDrawerEditFeature}
        onClose={handleCloseDrawerEditFeature}
        title={'Edit Product Feature form'}
        okText="Update"
        isOk={true}
        footer={true}
        submitHandler={handleEditFeatureSubmit}
        isLoading={loadingEditFeature}
      >
        <>
          <FormProvider methods={methodsEditFeature}>
            <Grid container spacing={4}>
              {editProductFeatureFormData()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </>
      </CommonDrawer>
    </Box>
  );
};

export default ProductFeature;
