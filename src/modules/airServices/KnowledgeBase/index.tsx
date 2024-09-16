import { PermissionTabsArrayI } from '@/components/Tabs/PermissionsTabs/PermissionsTabs.interface';
import { Header } from './Header';
import { knowledgeBaseTabsDataDynamic } from './KnowledgeBase.data';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';

export const KnowledgeBase = () => {
  const knowledgeBaseTabsData: PermissionTabsArrayI[] =
    knowledgeBaseTabsDataDynamic?.();

  return (
    <>
      <Header />
      <PermissionsTabs spacing={0.3} tabsDataArray={knowledgeBaseTabsData} />
    </>
  );
};
