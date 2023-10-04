import React, { useState } from 'react';

import Image from 'next/image';

import {
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
  Typography,
  Checkbox,
  Theme,
  useTheme,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Search from '@/components/Search';
import CommonDrawer from '@/components/CommonDrawer';

import add from '@/assets/images/modules/organization/addcircle.png';
import featureIcon from '@/assets/images/modules/organization/Featuredicon.png';
import { AddPenIcon } from '@/assets/images';

const OrganizationTable = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [value, setValue] = useState('search here');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme<Theme>();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenEditDrawer(true);
  };

  function createData(
    name: string,
    avatar: any,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, avatar, fat, carbs, protein };
  }

  const rows = [
    createData(
      'Orcalo Holdings',
      <AvatarGroup max={4}>
        <Avatar
          src="../../../../assets/images/modules/organization/addcircle.png"
          alt="Remy Sharp"
        />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>,
      6.0,
      24,
      4.0,
    ),
    createData(
      'Air applecart',
      <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>,
      9.0,
      37,
      4.3,
    ),
    createData(
      'PPCN',
      <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      </AvatarGroup>,
      16.0,
      24,
      6.0,
    ),
  ];

  return (
    <>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        title="Create Company"
        okText="ok"
        isOk={true}
        footer={true}
        // submitHandler={}
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
            >
              <Typography variant="h6" sx={{ paddingTop: '2rem' }}>
                Upload Image
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', right: '165px', bottom: 0 }}>
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
            overflowY: 'scroll',
            marginTop: '1rem',
          }}
        >
          <Box
            sx={{
              border: '1px solid #E9EAEF',
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Sales</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: '1px solid #E9EAEF',
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Marketing</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: '1px solid #E9EAEF',
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Service</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              border: '1px solid #E9EAEF',
              borderRadius: '8px',
              padding: '0.7rem',
            }}
          >
            <Checkbox
              sx={{
                marginLeft: '7rem',
              }}
            />
            <Box
              sx={{
                display: 'grid',
                justifyItems: 'center',
                marginTop: '0.7rem',
                paddingBottom: '2rem',
                marginX: '2.5rem',
              }}
            >
              <Image src={featureIcon} alt="1" />
              <Typography>Operation</Typography>
            </Box>
          </Box>
        </Box>
      </CommonDrawer>
      <CommonDrawer
        isDrawerOpen={openEditDrawer}
        onClose={() => {
          setOpenEditDrawer(false);
        }}
        title="Edit Company"
        okText="ok"
        isOk={true}
        footer={true}
        // submitHandler={}
      >
        Add COMPANY account
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
                sx={{
                  border: `1px solid ${theme?.palette?.custom.dark}`,
                  color: `${theme?.palette?.custom.main}`,
                  fontSize: '14px',
                  fontWeight: 500,
                  width: { lg: 'unset', md: 'unset', sm: 'unset', xs: '100%' },
                }}
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
                <MenuItem>Delete</MenuItem>
              </Menu>
              <Button
                onClick={() => {
                  setOpenDrawer(true);
                }}
                variant="contained"
                sx={{
                  display: 'flex',
                  alignContent: 'center',
                  columnGap: '10px',
                }}
              >
                <Image src={add} alt="add" /> Add Company Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ paddingTop: '10px' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ background: '#EAECF0' }}>
              <TableRow>
                <TableCell sx={{ color: '#4B5563' }}>Company Account</TableCell>
                <TableCell sx={{ color: '#4B5563' }} align="center">
                  Products
                </TableCell>
                <TableCell sx={{ color: '#4B5563' }} align="center">
                  Phone No.
                </TableCell>
                <TableCell sx={{ color: '#4B5563' }} align="center">
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.avatar}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default OrganizationTable;
