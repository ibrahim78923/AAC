import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import FilterDrawer from './FilterDrawer';
import { PlusSharedIcon, RefreshSharedIcon } from '@/assets/icons';
import Search from '@/components/Search';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Tabel/TanstackTable';
import { invoicesTableColumns, invoicesTableData } from '../SalesInvoices.data';

const InvoicvesListView = (props: any) => {
  const { setIsListViewPgae } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  // const [selected, setSelected] = useState<readonly string[]>([]);

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
          startIcon={<PlusSharedIcon />}
        >
          Create Invoice
        </Button>
      </Stack>
      <Grid spacing={2} container sx={{ marginTop: '30px' }}>
        <Grid item xs={12} md={6}>
          <Search
            label="Search Here"
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            width={240}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="row" justifyContent="end" gap={1}>
            <Box>
              <Button
                // disabled={selected.length > 0 ? false : true}
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
            </Box>
            <Box
              sx={{
                border: '1px solid #D1D5DB',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
              }}
            >
              <RefreshSharedIcon />
            </Box>
            <FilterDrawer />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '15px' }}>
        <TanstackTable
          columns={invoicesTableColumns}
          data={invoicesTableData}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
    </>
  );
};

export default InvoicvesListView;
