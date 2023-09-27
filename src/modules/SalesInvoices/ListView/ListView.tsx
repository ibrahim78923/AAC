import { PlusIcon, RefreshIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowDropDown, FilterAlt } from '@mui/icons-material';
import React, { useState } from 'react';
import InvoicesTable from './ViewTable';

const InvoicvesListView = (props: any) => {
  const { setIsListViewPgae } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const handleClick = (event: any) => {
    setSelectedValue(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedValue(null);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Invoice</Typography>
        <Button
          variant="contained"
          sx={{ display: 'flex', gap: '10px' }}
          onClick={() => setIsListViewPgae(true)}
        >
          <PlusIcon /> Create Invoice
        </Button>
      </Stack>
      <Grid container sx={{ marginTop: '30px' }}>
        <Grid item xs={6}>
          <TextField
            id="outlined-search"
            placeholder="Search Here"
            type="search"
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="end" gap={1}>
            <div>
              <Button
                disabled={selected.length > 0 ? false : true}
                onClick={handleClick}
                sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
              >
                Actions
                <ArrowDropDown />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={selectedValue}
                open={Boolean(selectedValue)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>View</MenuItem>
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
            <Box
              sx={{
                border: '1px solid #D1D5DB',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
              }}
            >
              <RefreshIcon />
            </Box>
            <Button sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}>
              {' '}
              <FilterAlt fontSize="small" /> Filter
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '15px' }}>
        <InvoicesTable selected={selected} setSelected={setSelected} />
      </Box>
    </>
  );
};

export default InvoicvesListView;
