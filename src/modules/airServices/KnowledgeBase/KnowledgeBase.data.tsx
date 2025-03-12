import { Permissions } from '@/constants/permissions';
import { Articles } from './Articles';
import dynamic from 'next/dynamic';
import LazyLoadingFlow from '@/components/LazyLoadingFlow';

const Approvals = dynamic(() => import('./Approvals'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="approvals"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const KnowledgeInsights = dynamic(() => import('./KnowledgeInsights'), {
  ssr: false,
  loading: (options: any) => (
    <LazyLoadingFlow
      name="knowledge insights"
      isLoading={options?.isLoading}
      error={options?.error}
    />
  ),
});

const { AIR_SERVICES_KNOWLEDGE_BASE_TABS } = Permissions ?? {};

export const knowledgeBaseTabsDataDynamic = () => {
  return [
    {
      _id: 1,
      name: 'Articles',
      tabPermissions: AIR_SERVICES_KNOWLEDGE_BASE_TABS,
      component: Articles,
    },
    {
      _id: 2,
      name: 'Approvals',
      hasNoPermissions: true,
      component: Approvals,
    },
    {
      _id: 3,
      name: 'Knowledge Insights',
      hasNoPermissions: true,
      component: KnowledgeInsights,
    },
  ];
};
