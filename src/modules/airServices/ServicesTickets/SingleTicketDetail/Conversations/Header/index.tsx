import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { pxToRem } from '@/utils/getFontValue';
import { PlusSharedColorIcon } from '@/assets/icons';
import { useHeader } from './useHeader';
import { ticketsConversationPortalActionComponent } from './Header.data';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';

export const Header = () => {
  const { addConversationDropdownActions, isPortalOpen } = useHeader();

  return (
    <>
      <PageTitledHeader title={'Conversation'}>
        <PermissionsGuard
          permissions={[
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_NOTE,
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_REPLY,
            AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
          ]}
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
