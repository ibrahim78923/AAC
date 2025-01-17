import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { pxToRem } from '@/utils/getFontValue';
import { PlusSharedColorIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Permissions } from '@/constants/permissions';
import { useHeader } from './useHeader';
import { renderPortalComponent } from './Header.data';

const { AIR_SERVICES_KNOWLEDGE_BASE_CREATE_ARTICLE_FOLDER } = Permissions ?? {};

export const Header = () => {
  const { createNewKnowledgeBaseDropdownOptions, isPortalOpen } = useHeader();

  return (
    <>
      <PageTitledHeader title="Knowledge Base">
        <PermissionsGuard
          permissions={AIR_SERVICES_KNOWLEDGE_BASE_CREATE_ARTICLE_FOLDER}
        >
          <SingleDropdownButton
            dropdownOptions={createNewKnowledgeBaseDropdownOptions}
            dropdownName={'Create New'}
            btnVariant="contained"
            color="primary"
            endIcon={<></>}
            startIcon={<PlusSharedColorIcon />}
            menuSxProps={{ '.MuiPaper-root': { width: pxToRem(145) } }}
          />
        </PermissionsGuard>
      </PageTitledHeader>
      {isPortalOpen?.isOpen && renderPortalComponent?.[isPortalOpen?.action]}
    </>
  );
};
