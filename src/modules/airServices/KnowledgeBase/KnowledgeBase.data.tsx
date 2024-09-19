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
      hasNoPermissions: true,
      tabPermissions: [],
      component: Approvals,
      componentProps: {},
    },
    {
      _id: 3,
      name: 'Knowledge Insights',
      id: 'knowledge_insights',
      hasNoPermissions: true,
      tabPermissions: [],
      component: KnowledgeInsights,
      componentProps: {},
    },
  ];
};
