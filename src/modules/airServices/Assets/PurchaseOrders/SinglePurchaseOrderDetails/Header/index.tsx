import { Box, Skeleton } from '@mui/material';
import { AIR_SERVICES } from '@/constants/routes';
import { useHeader } from './useHeader';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { truncateText } from '@/utils/avatarUtils';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import { CustomButton } from '@/components/Buttons/CustomButton';
import { PURCHASE_ORDER_STATUS } from '@/constants/services';

export const Header = (props: any) => {
  const {
    dropdownOptions,
    handleAddToInventory,
    handleReceived,
    statusDropdownOptions,
  } = props;

  const { router, data, isLoading, isFetching } = useHeader();

  if (isLoading || isFetching) return <Skeleton />;

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        gap={1.5}
      >
        <PageTitledHeader
          moveBack={() => router?.push(AIR_SERVICES?.PURCHASE_ORDER)}
          canMovedBack
          title={truncateText(data?.data?.orderName)}
        />
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          {data?.data?.status !== PURCHASE_ORDER_STATUS?.OPEN &&
            data?.data?.status !== PURCHASE_ORDER_STATUS?.CANCELLED && (
              <>
                <CustomButton
                  hasIcon={false}
                  onClick={() => {
                    handleReceived?.();
                  }}
                  disabled={
                    data?.data?.status === PURCHASE_ORDER_STATUS?.RECEIVED
                  }
                >
                  Received item
                </CustomButton>
                <CustomButton
                  hasIcon={false}
                  onClick={() => handleAddToInventory?.()}
                  disabled={
                    data?.data?.status === PURCHASE_ORDER_STATUS?.CLOSED ||
                    data?.data?.status === PURCHASE_ORDER_STATUS?.ORDERED
                  }
                >
                  Add to Inventory
                </CustomButton>
              </>
            )}

          {data?.data?.status !== PURCHASE_ORDER_STATUS?.OPEN && (
            <CustomButton hasIcon={false}>
              {data?.data?.status?.toLowerCase()?.split('_')?.join(' ') ??
                '----'}
            </CustomButton>
          )}

          {data?.data?.status === PURCHASE_ORDER_STATUS?.OPEN && (
            <PublicSingleDropdownButton
              dropdownOptions={statusDropdownOptions}
              dropdownName={PURCHASE_ORDER_STATUS?.OPEN}
            />
          )}

          <PublicSingleDropdownButton dropdownOptions={dropdownOptions} />
        </Box>
      </Box>
      <br />
    </>
  );
};
