import Image from 'next/image';
import {
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  InputAdornment,
  Checkbox,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { dataArray } from './OrganizationTable.data';
import useOrganizationTable from './useOrganizationTable';
import { FeaturedImage, AddCircleImage } from '@/assets/images';
import { AddPenIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './OrganizationTable.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_ORGANIZATION_PERMISSIONS } from '@/constants/permission-keys';
import { API_STATUS, ORGANIZATION_DRAWER_TYPES } from '@/constants';

const OrganizationTable = () => {
  const {
    tableRow,
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    theme,
    toggle,
    isToggled,
    handleClick,
    handleClose,
    handleSubmit,
    methods,
    onSubmit,
    getRowValues,
    isGetRowValues,
    deleteOrganizationCompany,
    value,
    setValue,
    drawerHeading,
    setDrawerHeading,
    loadingAddCompanyAccount,
    loadingUpdateCompanyAccount,
    setEditData,
    setIsGetRowValues,
    setPageLimit,
    setPage,
    tableInfo,
    handlePageChange,
    addressLength,
    handleImageChangeCompany,
    imagePreview,
    reset,
    setImagePreview,
    productsList,
    status,
    setSelectedProducts,
    selectedProducts,
    deleteLoading,
  } = useOrganizationTable();

  const getDateArray = dataArray({ drawerHeading, isToggled });

  const isViewMode = drawerHeading === 'Company Account';

  const handleCheckboxChange = (event: any, productId: any) => {
    const isChecked = event?.target?.checked;
    if (isChecked) {
      setSelectedProducts((prev: any[]) => [...prev, productId]);
    } else {
      setSelectedProducts(
        (prev: any[]) => prev?.filter((id) => id !== productId),
      );
    }
  };

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
          if (drawerHeading === ORGANIZATION_DRAWER_TYPES?.EDIT) {
            null;
          } else {
            reset();
          }
        }}
        title={`${drawerHeading}`}
        okText={
          drawerHeading === ORGANIZATION_DRAWER_TYPES?.EDIT ? 'Update' : 'Add'
        }
        isOk
        footer={isViewMode ? false : true}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={
          drawerHeading === ORGANIZATION_DRAWER_TYPES?.EDIT
            ? loadingUpdateCompanyAccount
            : loadingAddCompanyAccount
        }
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Typography variant="h5">Company Logo</Typography>
            <center>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    border: `1px solid ${theme?.palette?.grey[700]}`,
                    borderRadius: '100px',
                    width: '120px',
                    height: '120px',
                    boxShadow: `0px 2px 4px -2px ${theme?.palette?.custom?.dark_shade_green},
                    5px 5px 9px -2px ${theme?.palette?.custom?.shade_grey}`,
                  }}
                >
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="selected"
                      width={120}
                      height={120}
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                </Box>
                <input
                  hidden={true}
                  id="upload-group-image-one"
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => handleImageChangeCompany(e)}
                />
                <label htmlFor="upload-group-image-one">
                  <Box
                    sx={{
                      position: 'absolute',
                      right: '165px',
                      bottom: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <AddPenIcon />
                  </Box>
                </label>
              </Box>
            </center>
            <Typography variant="h5">Products</Typography>
            <Box
              sx={{
                display: 'flex',
                columnGap: '1rem',
                alignItems: 'center',
                overflowX: 'auto',
                marginBottom: '1rem',
              }}
            >
              {productsList?.data?.map((product: any) => (
                <Box sx={styles?.productCard} key={product?._id}>
                  <Checkbox
                    name={product?._id}
                    checked={selectedProducts.includes(product?._id)}
                    onChange={(event) =>
                      handleCheckboxChange(event, product?._id)
                    }
                    disabled={isViewMode}
                    sx={{
                      marginLeft: '7rem',
                    }}
                  />
                  <Box sx={styles?.productItem}>
                    <Image src={FeaturedImage} alt="1" />
                    <Typography>{product?.name}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Grid container spacing={1}>
              {getDateArray?.map((item: any, index: any) => (
                // eslint-disable-next-line
                <Grid item xs={12} md={item?.md} key={index}>
                  {item?.componentProps?.name === 'address' && (
                    <Box
                      sx={{
                        backgroundColor: '',
                        position: 'relative',
                        right: 0,
                      }}
                    >
                      <InputAdornment
                        sx={{
                          position: 'absolute',
                          top: 40,
                          right: 15,
                          zIndex: 9999,
                        }}
                        position="end"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            mt: 2,
                          }}
                        >
                          {/* <EraserIcon /> */}
                          {addressLength?.length > 0 ? (
                            <BorderColorIcon
                              sx={{
                                cursor: 'not-allowed',
                                fontSize: '20px',
                                color: 'lightgrey',
                              }}
                            />
                          ) : (
                            <BorderColorIcon
                              onClick={() => {
                                toggle(true);
                              }}
                              sx={{ cursor: 'pointer', fontSize: '20px' }}
                            />
                          )}
                        </Box>
                      </InputAdornment>
                    </Box>
                  )}
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>

            {isToggled && (
              <Grid container spacing={2} sx={{ paddingTop: '1rem' }}>
                <Grid item xs={12}>
                  <RHFTextField
                    name="unit"
                    label="Flat/Unit"
                    fullWidth={true}
                    select={false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="buildingName"
                    label="Building Name"
                    fullWidth={true}
                    select={false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="buildingNumber"
                    label="Building Number"
                    fullWidth={true}
                    select={false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="streetName"
                    label="Street Name"
                    fullWidth={true}
                    select={false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="city"
                    label="Town/City"
                    fullWidth={true}
                    select={false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFSelect name="country" label="Country" size="small">
                    <option value="Pakistan">{'Pakistan'}</option>
                    <option value="Uk">{'Uk'}</option>
                  </RHFSelect>
                </Grid>
              </Grid>
            )}
          </FormProvider>
        </Box>
      </CommonDrawer>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Search
              size="small"
              label="Search here"
              width="260px"
              searchBy={value}
              setSearchBy={(e: string) => {
                setValue(e);
              }}
            />
          </Grid>
          <Grid item lg={9} md={9} sm={6} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <Button
                sx={styles?.actionButton(theme)}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disabled={isGetRowValues?.length === 0}
                className="small"
                endIcon={<ArrowDropDownIcon />}
              >
                Action
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
                <PermissionsGuard
                  permissions={[
                    ORG_ADMIN_ORGANIZATION_PERMISSIONS?.EDIT_ACCOUNT,
                  ]}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setDrawerHeading('Edit Company');
                      setIsOpenDrawer(true);
                    }}
                    disabled={isGetRowValues?.length > 1}
                  >
                    Edit
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    ORG_ADMIN_ORGANIZATION_PERMISSIONS?.VIEW_ACCOUNT,
                  ]}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setDrawerHeading('Company Account');
                      setIsOpenDrawer(true);
                    }}
                    disabled={isGetRowValues.length > 1}
                  >
                    View
                  </MenuItem>
                </PermissionsGuard>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setIsOpenDelete(true);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
              <PermissionsGuard
                permissions={[
                  ORG_ADMIN_ORGANIZATION_PERMISSIONS?.ADD_COMPANY_ACCOUNT,
                ]}
              >
                <Button
                  onClick={() => {
                    handleClose();
                    setDrawerHeading('Create Company');
                    setIsOpenDrawer(true);
                    setEditData({});
                    setIsGetRowValues([]);
                    reset();
                    setImagePreview('');
                  }}
                  variant="contained"
                  className="small"
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    columnGap: '10px',
                  }}
                >
                  <Image src={AddCircleImage} alt="add" /> Add Company Account
                </Button>
              </PermissionsGuard>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid sx={{ marginTop: '1rem' }}>
        <TanstackTable
          isPagination
          columns={getRowValues}
          data={tableRow}
          totalRecords={tableInfo?.total}
          count={tableInfo?.pages}
          onPageChange={handlePageChange}
          setPage={setPage}
          setPageLimit={setPageLimit}
          isLoading={status === API_STATUS?.PENDING}
          currentPage={tableInfo?.page}
          pageLimit={tableInfo?.limit}
        />
      </Grid>
      <AlertModals
        message={'Are you sure you want to delete this company?'}
        type={'delete'}
        open={isOpenDelete}
        submitBtnText="Delete"
        cancelBtnText="Cancel"
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={() => {
          deleteOrganizationCompany();
        }}
        loading={deleteLoading}
      />
    </>
  );
};

export default OrganizationTable;
