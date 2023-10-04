import React, { useState } from 'react';

import {
  Box,
  Table,
  Typography,
  Button,
  InputAdornment,
  TextField,
  MenuItem,
  Menu,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import CommonDrawer from '@/components/CommonDrawer';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

const RolesRight = () => {
  const [draweropen, setdraweropen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setdraweropen(false);
    setEditOpen(false);
  };

  return (
    <>
      <CommonDrawer
        isDrawerOpen={draweropen}
        onClose={handleCloseDrawer}
        title={'Add New Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
        // submitHandler={}
      >
        form
      </CommonDrawer>
      <CommonDrawer
        isDrawerOpen={editOpen}
        onClose={handleCloseDrawer}
        title={'User Role'}
        okText={'OK'}
        footer={true}
        isOk={true}
        // submitHandler={}
      >
        EDIT form
      </CommonDrawer>
      <Box
        sx={{
          border: '1px solid #EAECF0',
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
            onClick={() => setdraweropen(true)}
          >
            <AddCircleIcon sx={{ color: '#ffff', fontSize: '16px' }} /> Add New
            Role
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
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              color: '#6B7280',
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
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ background: '#EAECF0' }}>
              <TableRow>
                <TableCell sx={{ color: '#1F305D' }}>Roll ID</TableCell>
                <TableCell sx={{ color: '#1F305D' }} align="center">
                  Roll Name
                </TableCell>
                <TableCell sx={{ color: '#1F305D' }} align="center">
                  Created On
                </TableCell>
                <TableCell sx={{ color: '#1F305D' }} align="center">
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{ color: '#6B7280' }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ color: '#6B7280' }} align="center">
                    {row.calories}
                  </TableCell>
                  <TableCell sx={{ color: '#6B7280' }} align="center">
                    {row.fat}
                  </TableCell>
                  <TableCell sx={{ color: '#6B7280' }} align="center">
                    {row.carbs}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default RolesRight;
