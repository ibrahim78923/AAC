import React from 'react';

import Image from 'next/image';

import {
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Checkbox,
  InputAdornment,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { FormProvider } from '@/components/ReactHookForm';
import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';

import {
  dataArray,
  defaultValues,
  validationSchema,
  columns,
} from './OrganizationTable.data';

import { organizationTableData } from '@/mock/modules/orgAdmin/OrganizationAdmin';
import useOrganizationTable from './useOrganizationTable';

import { FeaturedImage, AddCircleImage, ComLogoImage } from '@/assets/images';
import { AddPenIcon, EraserIcon } from '@/assets/icons';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

import { styles } from './OrganizationTable.style';

const OrganizationTable = ({ initialValueProps = defaultValues }: any) => {
  const {
    isOpenDrawer,
    setIsOpenDrawer,
    isOpenDelete,
    setIsOpenDelete,
    openEditDrawer,
    setOpenEditDrawer,
    value,
    setValue,
    anchorEl,
    open,
    theme,
    toggle,
    handleClick,
    handleClose,
  } = useOrganizationTable();

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        title="Create Company"
        okText="Add"
        isOk
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
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
            <Box sx={{ position: 'absolute', right: '165px', bottom: 0 }}>
              <AddPenIcon />
            </Box>
          </Box>
        </center>
        <Typography variant="h5">Products</Typography>
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Box
              sx={{
                display: 'flex',
                columnGap: '1rem',
                alignItems: 'center',
                overflowY: 'scroll',
                marginBottom: '1rem',
              }}
            >
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Sales</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Marketing</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Service</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Operation</Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={4}>
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
                        sx={{ position: 'absolute', top: 20, right: 15 }}
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
                            onClick={() => toggle(true)}
                            sx={{ cursor: 'pointer', fontSize: '18px' }}
                          />
                        </Box>
                      </InputAdornment>
                    </Box>
                  )}
                  <item.component {...item.componentProps} size={'small'}>
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
          </FormProvider>
        </Box>
      </CommonDrawer>
      <CommonDrawer
        isDrawerOpen={openEditDrawer}
        onClose={() => {
          setOpenEditDrawer(false);
        }}
        title="Edit Company"
        okText="Update"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
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
              >
                <Image
                  src={ComLogoImage}
                  alt="NO image"
                  style={{ borderRadius: '100px' }}
                />
              </Box>
              <Box sx={{ position: 'absolute', right: '165px', bottom: 0 }}>
                <AddPenIcon />
              </Box>
            </Box>
          </center>
          <Typography variant="h5">Products</Typography>
          <FormProvider methods={methods}>
            <Box
              sx={{
                display: 'flex',
                columnGap: '1rem',
                alignItems: 'center',
                overflowY: 'scroll',
                marginBottom: '1rem',
              }}
            >
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Sales</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Marketing</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Service</Typography>
                </Box>
              </Box>
              <Box sx={styles.productCard}>
                <Checkbox
                  sx={{
                    marginLeft: '7rem',
                  }}
                />
                <Box sx={styles.productItem}>
                  <Image src={FeaturedImage} alt="1" />
                  <Typography>Operation</Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
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
          </FormProvider>
        </Box>
      </CommonDrawer>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Search
              label="Search here"
              width="100%"
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
                columnGap: '10px',
              }}
            >
              <Button
                sx={styles.actionButton(theme)}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Action
                <ArrowDropDownIcon
                  sx={{ color: `${theme?.palette?.custom.main}` }}
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
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>View</MenuItem>
                <MenuItem onClick={() => setIsOpenDelete(true)}>
                  Delete
                </MenuItem>
              </Menu>
              <Button
                onClick={() => {
                  setIsOpenDrawer(true);
                }}
                variant="contained"
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  columnGap: '10px',
                }}
              >
                <Image src={AddCircleImage} alt="add" /> Add Company Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Grid>
        <TanstackTable columns={columns} data={organizationTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Grid>
      <AlertModals
        message={'Are you sure you want to delete this role?'}
        type={'delete'}
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
};

export default OrganizationTable;
