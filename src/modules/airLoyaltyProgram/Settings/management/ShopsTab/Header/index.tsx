import { Box, Button, useTheme } from '@mui/material';
import Search from '@/components/Search';
import UpsertShop from '../UpsertShop';
import { DeleteIcon } from '@/assets/icons';

export const Header = ({
  search,
  setSearch,
  handleSelectAll,
  setDeleteModalOpen,
  selectedCardList,
  addShopModalOpen,
  setAddShopModalOpen,
}: any) => {
  const { palette } = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={0.8}>
          {!!selectedCardList?.length && (
            <Button
              onClick={() => setDeleteModalOpen(true)}
              sx={{ minWidth: '32px !important', p: 0 }}
              color="error"
            >
              <DeleteIcon color={palette?.error?.main} />
            </Button>
          )}
          <Search
            label="Search Here"
            searchBy={search}
            setSearchBy={setSearch}
          />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleSelectAll}
          >
            Select All
          </Button>
          <UpsertShop
            addShopModalOpen={addShopModalOpen}
            setAddShopModalOpen={setAddShopModalOpen}
          />
        </Box>
      </Box>
      <br />
    </>
  );
};
