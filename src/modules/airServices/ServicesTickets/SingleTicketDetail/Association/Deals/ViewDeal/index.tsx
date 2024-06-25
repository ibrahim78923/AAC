import ApiErrorState from '@/components/ApiErrorState';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { Box, Typography } from '@mui/material';
import Contacts from './Contacts';
import Companies from './Companies';
import Products from './Products';
import Attachments from './Attachments';
import Tickets from './Tickets';
import Quotes from './Quotes';
import useViewDeal from './useViewDeal';

export default function ViewDeal({ modalId, setModalId }: any) {
  const {
    theme,
    onClose,
    dealData,
    isLoading,
    isFetching,
    isError,
    cardData,
    dealContacts,
    dealCompanies,
    dealTickets,
    dealProducts,
    dealQuotes,
    dealAttachments,
  } = useViewDeal({
    modalId,
    setModalId,
  });

  return (
    <CommonDrawer
      isDrawerOpen={modalId?.view}
      onClose={onClose}
      title={dealData?.name || 'View Deal Details'}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState />
      ) : (
        <Box my={1}>
          <Box
            borderRadius={2}
            boxShadow={`0px 0px 4px 0px ${theme?.palette?.custom?.steel_blue}`}
            p={2}
          >
            {Object?.entries(cardData)?.map(([keys, values]: any) => (
              <Box key={keys} display={'flex'} justifyContent={'space-between'}>
                <Typography variant={'body2'} py={1} color={'custom.main'}>
                  {keys}
                </Typography>
                <Typography
                  variant={'body2'}
                  color={'slateBlue.main'}
                  py={1}
                  fontWeight={600}
                >
                  {values}
                </Typography>
              </Box>
            ))}
          </Box>
          <Contacts theme={theme} dealContacts={dealContacts} />
          <Companies theme={theme} dealCompanies={dealCompanies} />
          <Tickets theme={theme} dealTickets={dealTickets} />
          <Products theme={theme} dealProducts={dealProducts} />
          <Quotes theme={theme} dealQuotes={dealQuotes} />
          <Attachments theme={theme} dealAttachments={dealAttachments} />
        </Box>
      )}
    </CommonDrawer>
  );
}
