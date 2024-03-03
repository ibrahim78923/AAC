import { useRouter } from 'next/router';
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
import { PlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import CustomPagination from '@/components/CustomPagination';
import TanstackTable from '@/components/Table/TanstackTable';
import { invoicesTableColumns } from '../Invoices.data';
import useListView from './useListView';
import { AlertModals } from '@/components/AlertModals';
import { AIR_SALES } from '@/routesConstants/paths';
import RefreshIcon from '@/assets/icons/modules/airSales/Tasks/refresh';
import { useGetInvoiceQuery } from '@/services/airSales/invoices';

const ListView = () => {
  const navigate = useRouter();
  const {
    selectedValue,
    handleClose,
    isDeleteModal,
    setIsDeleteModal,
    searchBy,
    setSearchBy,
    handleIsViewPage,
    handleDeleteModal,
    handleClick,
  } = useListView();

  const { data: InvoiceData } = useGetInvoiceQuery({});

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h3">Invoice</Typography>
        <Button
          variant="contained"
          startIcon={<PlusIcon />}
          onClick={() => navigate?.push(AIR_SALES?.SALES_CREATE_INVOICES)}
          className="small"
        >
          Create Invoice
        </Button>
      </Stack>
      <Grid spacing={2} container sx={{ marginTop: '10px' }}>
        <Grid item xs={12} md={6}>
          <Search
            label="Search Here"
            size="small"
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
                variant="outlined"
                color="inherit"
                className="small"
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
                <MenuItem onClick={handleIsViewPage}>View</MenuItem>
                <MenuItem onClick={handleClose}>Download</MenuItem>
                <MenuItem onClick={handleDeleteModal}>Delete</MenuItem>
              </Menu>
            </Box>
            <Box
              sx={{
                border: '1px solid #D1D5DB',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                cursor: 'pointer',
              }}
            >
              <RefreshIcon />
            </Box>
            <FilterDrawer />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: '15px' }}>
        <TanstackTable
          columns={invoicesTableColumns}
          data={InvoiceData?.data?.quoteinvoices}
        />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <AlertModals
        message="You're about to delete all record. Deleted records can't be restored after 90 days."
        type="delete"
        open={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleSubmit={() => setIsDeleteModal(false)}
      />
    </>
  );
};

export default ListView;
