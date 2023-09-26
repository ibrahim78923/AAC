import React from 'react';
import Image from 'next/image';
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import add from '../../../../assets/images/modules/organization/addcircle.png';

const OrganizationTable = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField
              sx={{ width: '100%' }}
              placeholder="Search here"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={9} md={9} sm={6} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                columnGap: '10px',
              }}
            >
              <Button
                sx={{
                  border: '1px solid #D1D5DB',
                  color: '#6B7280',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Action <ArrowDropDownIcon sx={{ color: '#6B7280' }} />
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
              </Menu>

              <Button
                onClick={() => {}}
                variant="contained"
                sx={{
                  background: '#38CAB5',
                  '&:hover': {
                    backgroundColor: '#38CAB5',
                    color: '#fff',
                  },
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
