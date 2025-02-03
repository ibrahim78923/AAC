import { Button, Theme } from '@mui/material';
import { useSingleTicketHeader } from './useSingleTicketHeader';
import { LoadingButton } from '@mui/lab';
import { TICKET_STATUS } from '@/constants/strings';
import { SingleTicketHeaderPropsI } from './SingleTicketHeader.interface';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { ShareTicket } from './ShareTicket';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleBreadcrumb } from '@/components/Breadcrumbs/SingleBreadcrumb';

export const SingleTicketHeader = (props: SingleTicketHeaderPropsI) => {
  const { ticketNumber, singleTicketData } = props;
  const {
    isLoading,
    updateTicketStatus,
    handleBack,
    portalStyles,
    shareModalOpen,
    setShareModalOpen,
  } = useSingleTicketHeader(props);

  return (
    <>
      <PageTitledHeader
        title={
          <SingleBreadcrumb
            previousPathname="Tickets"
            activePathname={ticketNumber}
            previousPathnameVariant="h5"
          />
        }
        canMovedBack
        moveBack={handleBack}
      >
        <Button
          variant="outlined"
          color="secondary"
          className="small"
          onClick={() => setShareModalOpen?.(true)}
        >
          share
        </Button>
        {singleTicketData?.status !== TICKET_STATUS?.CLOSED && (
          <LoadingButton
            variant="contained"
            className="small"
            loading={isLoading}
            onClick={updateTicketStatus}
            sx={(theme: Theme) => ({
              bgcolor:
                portalStyles?.btnPrimary ||
                customizePortalDefaultValues(theme)?.btnPrimary,
              color: 'common.white',
              '&:hover': {
                bgcolor:
                  portalStyles?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
                color: 'common.white',
              },
              '&.Mui-disabled': {
                bgcolor:
                  portalStyles?.btnPrimary ||
                  customizePortalDefaultValues(theme)?.btnPrimary,
              },
            })}
          >
            Mark ticket as closed
          </LoadingButton>
        )}
      </PageTitledHeader>
      {shareModalOpen && (
        <ShareTicket
          open={shareModalOpen}
          handleClose={() => setShareModalOpen?.(false)}
        />
      )}
    </>
  );
};
