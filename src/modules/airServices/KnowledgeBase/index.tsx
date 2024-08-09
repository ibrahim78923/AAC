import { useKnowledgeBase } from './useKnowledgeBase';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { pxToRem } from '@/utils/getFontValue';
import { PlusSharedColorIcon } from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Permissions } from '@/constants/permissions';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Articles } from './Articles';
import { Approvals } from './Approvals';
import { KnowledgeInsights } from './KnowledgeInsights';
import { knowledgeBaseTabsData } from './KnowledgeBase.data';

export const KnowledgeBase = () => {
  const {
    isPortalOpen,
    createNewKnowledgeBaseDropdownOptions,
    setIsPortalOpen,
  } = useKnowledgeBase();

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
      <HorizontalTabs tabsDataArray={knowledgeBaseTabsData}>
        <Articles
          isPortalOpen={isPortalOpen}
          setIsPortalOpen={setIsPortalOpen}
        />
        <Approvals />
        <KnowledgeInsights />
      </HorizontalTabs>
    </>
  );
};
