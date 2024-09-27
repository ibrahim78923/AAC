import React from 'react';
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
import useProductFeature from './useProductFeature';
import { styles } from './ProductFeature.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS } from '@/constants/permission-keys';

const ProductFeature = () => {
  const theme = useTheme();
  const {
    productsDropdownList,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionMenuClose,
    isDisabled,
    rowId,
    setRowId,
    dataProductFeatures,
    loagingProductFeatures,
    setSearchValue,
    setPageLimit,
    setPage,
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

  const ProductFeatureTableColumns = columns(setRowId, rowId, theme);

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
        </Box>
        <Box sx={styles?.filterBar}>
          <PermissionsGuard
            permissions={[
              SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS?.Search,
            ]}
          >
            <Box sx={styles?.search}>
              <Search
                setSearchBy={setSearchValue}
                label="Search Here"
                size="small"
                width={'100%'}
              />
            </Box>
          </PermissionsGuard>

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
              <PermissionsGuard
                permissions={[
                  SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS?.Edit_Features,
                ]}
              >
                <MenuItem
                  onClick={handleOpenDrawerEditFeature}
                  style={{ fontSize: '14px' }}
                >
                  Edit
                </MenuItem>
              </PermissionsGuard>
            </Menu>
            <PermissionsGuard
              permissions={[
                SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS?.Add_Features,
              ]}
            >
              <Button
                variant="contained"
                className="small"
                onClick={handleOpenDrawerAddFeature}
              >
                <PlusShared /> &nbsp; Add Feature
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          SUPER_ADMIN_SETTINGS_PRODUCT_FEATURES_PERMISSIONS?.Product_List,
        ]}
      >
        <Box>
          <TanstackTable
            columns={ProductFeatureTableColumns}
            data={dataProductFeatures?.data?.productfeatures}
            isLoading={loagingProductFeatures}
            currentPage={dataProductFeatures?.data?.meta?.page}
            count={dataProductFeatures?.data?.meta?.pages}
            pageLimit={dataProductFeatures?.data?.meta?.limit}
            totalRecords={dataProductFeatures?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </Box>
      </PermissionsGuard>

      <CommonDrawer
        isDrawerOpen={openDrawerAddFeature}
        onClose={handleCloseDrawerAddFeature}
        title={'Add Product Feature form'}
        okText="Add"
        isOk={true}
        footer={true}
        submitHandler={handleAddFeatureSubmit}
        isLoading={loadingAddFeature}
      >
        <>
          <FormProvider methods={methodsAddFeature}>
            <Grid container spacing={4}>
              {addProductFeatureFormData(productsDropdownList)?.map(
                (item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
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
                ),
              )}
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
              {editProductFeatureFormData(productsDropdownList)?.map(
                (item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.componentProps?.name}
                  >
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
                ),
              )}
            </Grid>
          </FormProvider>
        </>
      </CommonDrawer>
    </Box>
  );
};

export default ProductFeature;
