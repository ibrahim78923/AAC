import { Box, Grid, useTheme } from '@mui/material';
import { useState } from 'react';
import { data, columns } from './Inventory.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { styles } from './Inventory.style';
import AssetHead from '../Header/index';
import { AlertModals } from '@/components/AlertModals';
import useInventory from './useInventory';
import { useRouter } from 'next/router';

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchValue, SetSearchValue] = useState<string>('');
  const theme: any = useTheme();

  const { handleAddInventory } = useInventory();
  const router = useRouter();
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

      <Grid container>
        <AssetHead
          title={'Assets'}
          addTitle={'Add'}
          show={true}
          handleAction={handleAddInventory}
        />
        <Grid item sx={styles.gridItems}>
          <Box sx={styles.headBox}>
            <Box sx={{ marginLeft: '24px' }}>
              <Search
                label="search"
                width="100%"
                searchBy={searchValue}
                setSearchBy={SetSearchValue}
              />
            </Box>
            <Box sx={styles.buttonBox}>
              <Button
                sx={styles.buttonStyle(theme)}
                variant="outlined"
                disabled={!!!inventoryData.length}
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
              >
                Delete
              </Button>
              <Button
                sx={styles.buttonStyle(theme)}
                variant="outlined"
                startIcon={<CustomizeSharedIcon />}
              >
                Customize
              </Button>
              <Button
                sx={styles.buttonStyle(theme)}
                variant="outlined"
                startIcon={<FilterSharedIcon />}
              >
                Filter
              </Button>
            </Box>
          </Box>
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
        </Grid>
      </Grid>
    </>
  );
}

export default Inventory;
