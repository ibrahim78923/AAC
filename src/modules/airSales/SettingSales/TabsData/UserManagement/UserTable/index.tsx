import React from 'react';

import { Box, Button, Menu, MenuItem, Grid } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { AlertModals } from '@/components/AlertModals';
import { userTableData } from '@/mock/modules/airSales/SettingSales';

import { dataArray } from './UserTable.data';

import { v4 as uuidv4 } from 'uuid';
import useUserTable from './useUserTable';

const UserTable = () => {
  const {
    getRowValues,
    isOpenDelete,
    setIsOpenDelete,
    anchorEl,
    open,
    theme,
    handleClick,
    handleClose,
    methods,
    handleCloseDrawer,
    isEditOpen,
  } = useUserTable('');

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isEditOpen}
        onClose={handleCloseDrawer}
        title={'User View'}
        okText={'Update'}
        footer={true}
        isOk={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
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
        }}
      >
        <Search
          searchBy=""
          width="260px"
          label={'Search here'}
          setSearchBy={() => {}}
        />
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            borderRadius: '4px',
            color: `${theme?.palette?.custom.main}`,
            display: 'flex',
            alignItems: 'center',
            padding: '0.7rem',
            fontWeight: 500,
            marginY: { xs: '10px', sm: '0px' },
            width: { xs: '100%', sm: 'fit-content' },
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
      <TanstackTable columns={getRowValues} data={userTableData} isPagination />
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
