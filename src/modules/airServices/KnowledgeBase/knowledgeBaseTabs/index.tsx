import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Articles } from '../Articles';
import { Approvals } from '../Approvals';
import { KnowledgeInsights } from '../KnowledgeInsights';
import { knowledgeBaseTabsData } from './knowledgeBaseTabs.data';

export const KnowledgeBaseTabs = () => {
  return (
    <HorizontalTabs tabsDataArray={knowledgeBaseTabsData}>
      <Articles />
      <Approvals />
      <KnowledgeInsights />
    </HorizontalTabs>
  );
};
