import React, { useState } from 'react';

import {
  Box,
  Button,
  Menu,
  MenuItem,
  Theme,
  useTheme,
  Typography,
  Grid,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { userTableData } from '@/mock/modules/airSales/SettingSales';

import {
  dataArray,
  defaultValues,
  validationSchema,
  columns,
} from './UserTable.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { AIR_MARKETER_SETTINGS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const UserTable = ({ initialValueProps = defaultValues }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const theme = useTheme<Theme>();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setIsEditOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsEditOpen(false);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isEditOpen}
        onClose={handleCloseDrawer}
        title={'User View'}
        okText={'OK'}
        footer={true}
        isOk={true}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '12px',
            color: `${theme?.palette?.custom?.main}`,
          }}
        >
          Add New User to Organization
        </Typography>
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
        <PermissionsGuard
          permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.SEARCH_USERS]}
        >
          <Search
            searchBy=""
            width="260px"
            label={'Search here'}
            setSearchBy={() => {}}
            size="small"
          />
        </PermissionsGuard>

        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className="small"
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '4px',
            color: `${theme?.palette?.custom?.main}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0.7rem',

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
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.VIEW_USERS]}
          >
            <MenuItem onClick={handleClose}>View</MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.EDIT_USERS]}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[AIR_MARKETER_SETTINGS_PERMISSIONS?.DELETE_USERS]}
          >
            <MenuItem onClick={() => setIsOpenDelete(true)}>Delete</MenuItem>
          </PermissionsGuard>
        </Menu>
      </Box>
      <Grid>
        <TanstackTable columns={columns} data={userTableData} isPagination />
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

export default UserTable;
