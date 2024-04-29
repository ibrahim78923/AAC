import { Box, Button } from '@mui/material';
import { useDigitalGiftCards } from './useDigitalGiftCards';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { AddWhiteBgIcon, ExportBlackIcon } from '@/assets/icons';
import FilterListIcon from '@mui/icons-material/FilterList';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS } from '@/constants/permission-keys';

export const DigitalGiftCards = () => {
  const {
    digitalGiftCardColumns,
    setSearch,
    setIsPortalOpen,
    isPortalOpen,
    renderPortalComponent,
    lazyGetDigitalGiftCardListStatus,
    setPage,
    setPageLimit,
  } = useDigitalGiftCards();

  return (
    <>
      <Box
        border={`1px solid`}
        borderColor={'grey.700'}
        borderRadius={2}
        p={1.5}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexWrap={'wrap'}
          gap={2}
        >
          <Search label="Search Here" setSearchBy={setSearch} />
          <Box display={'flex'} alignItems={'center'} gap={2} flexWrap={'wrap'}>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS?.APPLY_FILTERS,
              ]}
            >
              <Button
                variant="outlined"
                color="secondary"
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
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS?.EXPORT,
              ]}
            >
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ExportBlackIcon />}
                onClick={() =>
                  setIsPortalOpen({ isOpen: true, isExport: true })
                }
              >
                Export
              </Button>
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS?.ADD_GIFT_CARD,
              ]}
            >
              <Button
                variant="contained"
                startIcon={<AddWhiteBgIcon />}
                onClick={() => setIsPortalOpen({ isOpen: true, isAdd: true })}
              >
                Add
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <br />
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_GIFT_CARDS_DIGITAL_GIFT_CARD_PERMISSIONS?.VIEW_GIFT_CARD_DETAILS,
          ]}
        >
          <TanstackTable
            columns={digitalGiftCardColumns}
            data={lazyGetDigitalGiftCardListStatus?.data?.data}
            isLoading={lazyGetDigitalGiftCardListStatus?.isLoading}
            currentPage={
              lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.page
            }
            count={lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.pages}
            pageLimit={
              lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.limit
            }
            totalRecords={
              lazyGetDigitalGiftCardListStatus?.data?.data?.meta?.total
            }
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={lazyGetDigitalGiftCardListStatus?.isFetching}
            isError={lazyGetDigitalGiftCardListStatus?.isError}
            isSuccess={lazyGetDigitalGiftCardListStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            isPagination
          />
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen && renderPortalComponent?.()}
    </>
  );
};
