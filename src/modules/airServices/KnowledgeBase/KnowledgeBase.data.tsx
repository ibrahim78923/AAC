import { Permissions } from '@/constants/permissions';
import { Articles } from './Articles';
import { Approvals } from './Approvals';
import { KnowledgeInsights } from './KnowledgeInsights';

export const knowledgeBaseTabsDataDynamic = () => {
  return [
    {
      _id: 1,
      name: 'Articles',
      id: 'articles',
      tabPermissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: Articles,
      componentProps: {},
    },
    {
      _id: 2,
      name: 'Approvals',
      id: 'approvals',
      tabPermissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: Approvals,
      componentProps: {},
    },
    {
      _id: 3,
      name: 'Knowledge Insights',
      id: 'knowledge_insights',
      tabPermissions: Permissions?.AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: KnowledgeInsights,
      componentProps: {},
    },
  ];
};
