import React from 'react';

import Image from 'next/image';

import {
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  InputAdornment,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import {
  FormProvider,
  RHFCheckbox,
  RHFDropZone,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';

import { dataArray } from './OrganizationTable.data';

import useOrganizationTable from './useOrganizationTable';

import { FeaturedImage, AddCircleImage } from '@/assets/images';
import { AddPenIcon, EraserIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

import { styles } from './OrganizationTable.style';
import CommonModal from '@/components/CommonModal';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ORG_ADMIN_ORGANIZATION_PERMISSIONS } from '@/constants/permission-keys';
import useAuth from '@/hooks/useAuth';

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
    tablePagination,
    getRowValues,
    isGetRowValues,
    deleteOrganizationCompany,
    imageHandler,
    setImageHandler,
    value,
    setValue,
    drawerHeading,
    setDrawerHeading,
    loadingAddCompanyAccount,
    editData,
    setEditData,
  } = useOrganizationTable();
  const { user }: any = useAuth();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        title={`${drawerHeading}`}
        okText={drawerHeading === 'Edit Company' ? 'Update' : 'Add'}
        isOk
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
        isLoading={loadingAddCompanyAccount}
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
                    boxShadow:
                      '0px 2px 4px -2px #1018280F, 5px 5px 9px -2px #1018281A',
                  }}
                ></Box>
                <Box
                  onClick={() => {
                    setImageHandler(true);
                  }}
                  sx={{
                    position: 'absolute',
                    right: '165px',
                    bottom: 0,
                    cursor: 'pointer',
                  }}
                >
                  <AddPenIcon />
                </Box>
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
              {user?.products?.map((product: any) => (
                <Box sx={styles?.productCard} key={product?._id}>
                  <RHFCheckbox
                    name={product?._id}
                    defaultChecked={editData?.products?.some(
                      (p: any) => p._id === product?._id,
                    )}
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
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
                          }}
                        >
                          <EraserIcon />
                          <BorderColorIcon
                            onClick={() => {
                              toggle(true);
                            }}
                            sx={{ cursor: 'pointer', fontSize: '20px' }}
                          />
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
            <CommonModal
              open={imageHandler}
              handleClose={() => setImageHandler(false)}
              handleSubmit={() => setImageHandler(false)}
              title="Upload Logo"
              footer={true}
              okText="Add"
              cancelText="Cancle"
            >
              <RHFDropZone name="logoUrl" />
            </CommonModal>
            {isToggled && (
              <Grid container spacing={2} sx={{ paddingTop: '1rem' }}>
                <Grid item xs={12}>
                  <RHFTextField
                    name="unit"
                    label="Flat/Unit"
                    fullWidth={true}
                    select={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="buildingName"
                    label="Building Name"
                    fullWidth={true}
                    select={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="buildingNumber"
                    label="Building Number"
                    fullWidth={true}
                    select={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="streetName"
                    label="Street Name"
                    fullWidth={true}
                    select={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField
                    name="city"
                    label="Town/City"
                    fullWidth={true}
                    select={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RHFSelect
                    name="country"
                    label="Country"
                    fullWidth={true}
                    select={true}
                    options={[
                      { value: 'United Kingdom', label: 'United Kingdom' },
                      { value: 'Pakistan', label: 'Pakistan' },
                    ]}
                  />
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
              >
                Action
                <ArrowDropDownIcon
                  sx={{ color: `${theme?.palette?.custom?.main}` }}
                />
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
                  >
                    Edit
                  </MenuItem>
                </PermissionsGuard>
                <PermissionsGuard
                  permissions={[
                    ORG_ADMIN_ORGANIZATION_PERMISSIONS?.VIEW_ACCOUNT,
                  ]}
                >
                  <MenuItem onClick={handleClose}>View</MenuItem>
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
        <TanstackTable columns={getRowValues} data={tableRow} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={tablePagination}
          entriePages={1}
        />
      </Grid>
      <AlertModals
        message={'Are you sure you want to delete this role?'}
        type={'delete'}
        open={isOpenDelete}
        submitBtnText="Delete"
        cancelBtnText="Cancel"
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={() => {
          deleteOrganizationCompany();
          setIsOpenDelete(false);
        }}
      />
    </>
  );
};

export default OrganizationTable;
