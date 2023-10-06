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

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  dataArray,
  defaultValues,
  userTableData,
  validationSchema,
  columns,
} from './UserManagement.data';
import { v4 as uuidv4 } from 'uuid';

import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import TanstackTable from '@/components/Tabel/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

const UserTable = ({ initialValueProps = defaultValues }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
        // submitHandler={}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: '12px',
            color: `${theme.palette.custom.main}`,
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
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Search
          searchBy=""
          width="100%"
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
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </Box>
      <Grid>
        <TanstackTable columns={columns} data={userTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Grid>
    </>
  );
};

export default UserTable;
