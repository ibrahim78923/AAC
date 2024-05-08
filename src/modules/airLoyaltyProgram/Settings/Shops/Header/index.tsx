import { Box, Button } from '@mui/material';
import Search from '@/components/Search';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Delete } from '@mui/icons-material';
import { PlusIcon } from '@/assets/icons';

export const Header = (props: any) => {
  const { setSearch, handleSelectAll, selectedShopsList, setIsPortalOpen } =
    props;
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1}>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.DELETE_SHOP,
            ]}
          >
            {!!selectedShopsList?.length && (
              <Delete
                color={'error'}
                sx={{ cursor: 'pointer' }}
                onClick={() =>
                  setIsPortalOpen({
                    isOpen: true,
                    isDelete: true,
                  })
                }
              />
            )}
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.SHOP_SEARCH,
            ]}
          >
            <Search label="Search Here" setSearchBy={setSearch} />
          </PermissionsGuard>
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={1.5}>
          {!!selectedShopsList?.length && (
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.DELETE_SHOP,
              ]}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleSelectAll}
              >
                Select All
              </Button>
            </PermissionsGuard>
          )}
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_SETTINGS_MANAGEMENT_PERMISSIONS?.ADD_SHOP,
            ]}
          >
            <Button
              variant="contained"
              startIcon={<PlusIcon />}
              onClick={() =>
                setIsPortalOpen({
                  isOpen: true,
                  isUpsert: true,
                })
              }
            >
              Add
            </Button>
          </PermissionsGuard>
        </Box>
      </Box>
    </>
  );
};
