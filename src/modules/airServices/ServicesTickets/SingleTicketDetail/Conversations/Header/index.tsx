import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Permissions } from '@/constants/permissions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { pxToRem } from '@/utils/getFontValue';
import { PlusSharedColorIcon } from '@/assets/icons';
import { useHeader } from './useHeader';
import { ticketsConversationPortalActionComponent } from './Header.data';

export const Header = () => {
  const { addConversationDropdownActions, isPortalOpen } = useHeader();

  return (
    <>
      <PageTitledHeader title={'Conversation'}>
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_TICKETS_TICKETS_DETAILS_ADD_CONVERSATION
          }
        >
          <SingleDropdownButton
            dropdownOptions={addConversationDropdownActions}
            dropdownName={'Add Conversation'}
            btnVariant="contained"
            color="primary"
            endIcon={<></>}
            startIcon={<PlusSharedColorIcon />}
            menuSxProps={{ '.MuiPaper-root': { width: pxToRem(190) } }}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      {isPortalOpen?.isOpen &&
        ticketsConversationPortalActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
