import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import { FilterSharedIcon, CustomizeSharedIcon } from '@/assets/icons';
import { enqueueSnackbar } from 'notistack';
import { PageTitledHeader } from '../../../../components/PageTitledHeader/index';
import { AlertModals } from '@/components/AlertModals';
import { useInventory } from './useInventory';

function Inventory() {
  const {
    handleAddInventory,
    router,
    isDrawerOpen,
    renderComponent,
    openDeleteModal,
    setOpenDeleteModal,
    searchValue,
    SetSearchValue,
    inventoryListsColumns,
    data,
    inventoryData,
  } = useInventory();
  return (
    <>
      <AlertModals
        message={'Are you sure you want to delete this record?'}
        type={'Delete'}
        typeImage={<CustomizeSharedIcon />}
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
            disabled={!!!inventoryData?.length}
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
            // onClick={() => openDrawer('customize')}
          >
            Customize
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            startIcon={<FilterSharedIcon />}
            // onClick={() => openDrawer('filter')}
          >
            Filter
          </Button>
        </Box>
      </Box>
      <br />
      <TanstackTable data={data} columns={inventoryListsColumns} />
      {isDrawerOpen && renderComponent?.[router?.query?.tableAction as string]}
    </>
  );
}

export default Inventory;
