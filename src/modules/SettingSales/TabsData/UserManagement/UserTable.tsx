import React, { useState } from 'react';

import {
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Select,
  Theme,
  useTheme,
} from '@mui/material';

import { SelectChangeEvent } from '@mui/material/Select';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';

function createData(
  name: string,
  email: string,
  team: any,
  role: any,
  status: any,
) {
  return { name, email, team, role, status };
}

const UserTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);
  const theme = useTheme<Theme>();
  const [age, setAge] = React.useState('10');
  const [role, setRole] = React.useState('10');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleRole = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setEditOpen(true);
  };

  const handleCloseDrawer = () => {
    setEditOpen(false);
  };

  const rows = [
    createData(
      'Olivia Rhye',
      'Orcalo@airapple.co.uk',
      <Box>
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            size="small"
            value={age}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={10}>Alfa</MenuItem>
            <MenuItem value={20}>Orcalo</MenuItem>
            <MenuItem value={30}>Test</MenuItem>
          </Select>
        </FormControl>
      </Box>,
      <Box>
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            size="small"
            value={role}
            onChange={handleRole}
            displayEmpty
          >
            <MenuItem value={10}>Account Admin</MenuItem>
            <MenuItem value={20}>Sale Manager</MenuItem>
            <MenuItem value={30}>Sale Management</MenuItem>
          </Select>
        </FormControl>
      </Box>,
      <Switch defaultChecked />,
    ),
    createData(
      'Olivia Rhye',
      'Orcalo@airapple.co.uk',
      <Box>
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            size="small"
            value={age}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={10}>Alfa</MenuItem>
            <MenuItem value={20}>Orcalo</MenuItem>
            <MenuItem value={30}>Test</MenuItem>
          </Select>
        </FormControl>
      </Box>,
      <Box>
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            size="small"
            value={role}
            onChange={handleRole}
            displayEmpty
          >
            <MenuItem value={10}>Account Admin</MenuItem>
            <MenuItem value={20}>Sale Manager</MenuItem>
            <MenuItem value={30}>Sale Management</MenuItem>
          </Select>
        </FormControl>
      </Box>,
      <Switch defaultChecked />,
    ),
    createData(
      'Olivia Rhye',
      'Orcalo@airapple.co.uk',
      <Box>
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            size="small"
            value={age}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value={10}>Alfa</MenuItem>
            <MenuItem value={20}>Orcalo</MenuItem>
            <MenuItem value={30}>Test</MenuItem>
          </Select>
        </FormControl>
      </Box>,
      <Box>
        <FormControl variant="standard">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            size="small"
            value={role}
            onChange={handleRole}
            displayEmpty
          >
            <MenuItem value={10}>Account Admin</MenuItem>
            <MenuItem value={20}>Sale Manager</MenuItem>
            <MenuItem value={30}>Sale Management</MenuItem>
          </Select>
        </FormControl>
      </Box>,
      <Switch defaultChecked />,
    ),
  ];
  return (
    <>
      <CommonDrawer
        isDrawerOpen={editOpen}
        onClose={handleCloseDrawer}
        title={'User View'}
        okText={'OK'}
        footer={true}
        isOk={true}
        // submitHandler={}
      >
        form
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
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: '#EAECF0' }}>
            <TableRow>
              <TableCell sx={{ color: '#1F305D' }}>Name</TableCell>
              <TableCell sx={{ color: '#1F305D' }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ color: '#1F305D' }} align="center">
                Team
              </TableCell>
              <TableCell sx={{ color: '#1F305D' }} align="center">
                Role
              </TableCell>
              <TableCell sx={{ color: '#1F305D' }} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ color: '#6B7280' }} component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell sx={{ color: '#6B7280' }} align="center">
                  {row.email}
                </TableCell>
                <TableCell sx={{ color: '#6B7280' }} align="center">
                  {row.team}
                </TableCell>
                <TableCell sx={{ color: '#6B7280' }} align="center">
                  {row.role}
                </TableCell>
                <TableCell sx={{ color: '#6B7280' }} align="center">
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;
