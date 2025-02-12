import { Theme } from '@mui/material';
import { useSingleTicketHeader } from './useSingleTicketHeader';
import { TICKET_STATUS } from '@/constants/strings';
import { SingleTicketHeaderPropsI } from './SingleTicketHeader.interface';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { ShareTicket } from './ShareTicket';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleBreadcrumb } from '@/components/Breadcrumbs/SingleBreadcrumb';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';
import { CustomButton } from '@/components/Buttons/CustomButton';

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
        <CustomButton hasIcon={false} onClick={() => setShareModalOpen?.(true)}>
          share
        </CustomButton>
        {singleTicketData?.status !== TICKET_STATUS?.CLOSED && (
          <CustomLoadingButton
            loading={isLoading}
            onClick={updateTicketStatus}
            customStyles={(theme: Theme) => ({
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
          </CustomLoadingButton>
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
