import React, { useState } from 'react';

import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
  MenuItem,
  Menu,
  Theme,
  useTheme,
  Grid,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Tabel/TanstackTable';
import {
  RolesAndRightTableData,
  columns,
  dataArray,
  defaultValues,
  validationSchema,
} from './RolesRight.data';
import CustomPagination from '@/components/CustomPagination';

const RolesRight = ({ initialValueProps = defaultValues }: any) => {
  const [isDraweropen, setIsDraweropen] = useState(false);
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

  // const { handleSubmit } = methods;
  // const onSubmit = async (data: any) => {
  //   console.log(data);
  //   enqueueSnackbar('Ticket Updated Successfully', {
  //     variant: 'success',
  //   });
  // };

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={'Add New Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
        // submitHandler={}
      >
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
      <CommonDrawer
        isDrawerOpen={isEditOpen}
        onClose={handleCloseDrawer}
        title={'User Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
        // submitHandler={}
      >
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
          <Typography variant="h4">Roles and Rights</Typography>
          <Button
            variant="contained"
            sx={{
              display: 'flex',
              columnGap: '10px',
            }}
            onClick={() => setIsDraweropen(true)}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />{' '}
            Add New Role
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '2rem',
            marginBottom: '1rem',
          }}
        >
          <TextField
            placeholder="Search Here"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              border: `1px solid ${theme?.palette?.custom.dark}`,
              borderRadius: '4px',
              color: `${theme?.palette?.custom.main}`,
              display: 'flex',
              alignItems: 'center',
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
          <TanstackTable columns={columns} data={RolesAndRightTableData} />
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

export default RolesRight;
