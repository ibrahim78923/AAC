import { useKnowledgeBase } from './useKnowledgeBase';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { pxToRem } from '@/utils/getFontValue';
import { PlusSharedColorIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Permissions } from '@/constants/permissions';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const KnowledgeBase = () => {
  const { createNewKnowledgeBaseDropdownOptions, knowledgeBaseTabsData } =
    useKnowledgeBase();

  return (
    <>
      <PageTitledHeader title="Knowledge Base">
        <PermissionsGuard
          permissions={
            Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_CREATE_ARTICLE_FOLDER
          }
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
      <br />
      <PermissionsTabs spacing={0.3} tabsDataArray={knowledgeBaseTabsData} />
    </>
  );
};
