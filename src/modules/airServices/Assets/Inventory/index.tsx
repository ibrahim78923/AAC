import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import { data, columns } from './Inventory.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { PageTitledHeader } from '../../common/Headers/PageTitledHeader/index';
import { AlertModals } from '@/components/AlertModals';
import useInventory from './useInventory';

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchValue, SetSearchValue] = useState<string>('');
  const theme: any = useTheme();

  const { handleAddInventory, router } = useInventory();
  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete this record?'}
        type={'delete'}
        open={openDeleteModal}
        handleClose={() => {
          setOpenDeleteModal(false);
        }}
        handleSubmit={() => {
          enqueueSnackbar('Delete successfully', {
            variant: 'error',
            autoHideDuration: 3000,
          });
          setOpenDeleteModal(false);
        }}
      />
      <PageTitledHeader
        title={'Inventory'}
        addTitle={'Add'}
        hasImport
        hasExport
        handleAction={handleAddInventory}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box>
          <Search
            label="search"
            width="100%"
            searchBy={searchValue}
            setSearchBy={SetSearchValue}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            color="secondary"
            variant="outlined"
            disabled={!!!inventoryData.length}
            onClick={() => {
              setOpenDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<CustomizeSharedIcon />}
          >
            Customize
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <Box sx={{ marginBottom: '25px' }}>
        <TanstackTable
          data={data}
          columns={columns(
            inventoryData,
            setInventoryData,
            data,
            theme,
            router,
          )}
        />
      </Box>
    </>
  );
}

export default Inventory;
