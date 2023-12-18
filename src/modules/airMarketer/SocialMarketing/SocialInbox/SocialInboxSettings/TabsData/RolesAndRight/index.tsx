import React, { useState } from 'react';

import {
  Box,
  Typography,
  Button,
  MenuItem,
  Menu,
  Theme,
  useTheme,
  Grid,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { AlertModals } from '@/components/AlertModals';

import {
  columns,
  dataArray,
  defaultValues,
  validationSchema,
} from './RolesRight.data';

import { rolesAndRightTableData } from '@/mock/modules/airSales/SettingSales';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import Search from '@/components/Search';

const RolesRight = ({ initialValueProps = defaultValues }: any) => {
  const [isDraweropen, setIsDraweropen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const theme = useTheme<Theme>();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setIsEditOpen(true);
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setIsDraweropen(false);
    setIsEditOpen(false);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });
  const [productSearch, setproductSearch] = useState('');

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={'Add New Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
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
      <CommonDrawer
        isDrawerOpen={isEditOpen}
        onClose={handleCloseDrawer}
        title={'User Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h3">Roles and Rights</Typography>
          <Button
            variant="contained"
            sx={{
              display: 'flex',
              columnGap: '10px',
              '@media (max-width: 500px)': {
                marginTop: '20px',
                width: '100%',
              },
            }}
            className="small"
            onClick={() => setIsDraweropen(true)}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />
            Add New Role
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '1rem',
            marginBottom: '1rem',
            gap: 1,
          }}
        >
          <Search
            label={'Search here'}
            searchBy={productSearch}
            setSearchBy={setproductSearch}
            width="260px"
            size="small"

            // sx={{ marginTop: '2rem', marginBottom: '1rem' }}
          />
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className="small"
            sx={{
              border: `1px solid ${theme?.palette?.custom?.dark}`,
              borderRadius: '4px',
              color: `${theme?.palette?.custom?.main}`,
              display: 'flex',
              alignItems: 'center',
              '@media (max-width: 500px)': {
                width: '100%',
              },
            }}
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
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>View</MenuItem>
            <MenuItem onClick={() => setIsOpenDelete(true)}>Delete</MenuItem>
          </Menu>
        </Box>
        <Grid>
          <TanstackTable columns={columns} data={rolesAndRightTableData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
          />
        </Grid>
      </Box>
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

export default RolesRight;
