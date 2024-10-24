import { Box, Button } from '@mui/material';
import { useGiftCards } from './useGiftCards';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import { data } from './GiftCards.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';

export const GiftCards = () => {
  const {
    giftCardColumns,
    handleSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetGiftCardListStatus,
    setPage,
    setPageLimit,
  } = useGiftCards();

  return (
    <>
      <PageTitledHeader title={'Gift Cards'} />
      <Box border={`1px solid`} borderColor={'grey.700'} borderRadius={2}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          p={1}
        >
          <PermissionsGuard
            permissions={[
              AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD_PERMISSIONS?.SEARCH,
            ]}
          >
            <Search
              label="Search Here"
              setSearchBy={handleSearch}
              size="small"
            />
          </PermissionsGuard>
          <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD_PERMISSIONS?.APPLY_FILTER,
              ]}
            >
              <Button
                variant="outlined"
                color="secondary"
                className="small"
                startIcon={<FilterListIcon />}
                onClick={() =>
                  setIsPortalOpen({ isOpen: true, isFilter: true })
                }
              >
                Filter
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD_PERMISSIONS?.ADD_GIFT_CARD,
              ]}
            >
              <Button
                variant="contained"
                className="small"
                startIcon={<AddWhiteBgIcon />}
                onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
              >
                Add
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_GIFT_CARD_PERMISSIONS?.VIEW_GIFT_CARD_DETAILS,
          ]}
        >
          <TanstackTable
            columns={giftCardColumns}
            data={data}
            currentPage={lazyGetGiftCardListStatus?.data?.data?.meta?.page}
            count={lazyGetGiftCardListStatus?.data?.data?.meta?.pages}
            pageLimit={lazyGetGiftCardListStatus?.data?.data?.meta?.limit}
            totalRecords={lazyGetGiftCardListStatus?.data?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
