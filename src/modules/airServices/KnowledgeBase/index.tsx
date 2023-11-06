import { useState } from 'react';
import { Header } from './Header';
import { KnowledgeBaseTabs } from './knowledgeBaseTabs';
import { UpsertFolder } from './Folder/UpsertFolder';

export const KnowledgeBase = () => {
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);

  return (
    <>
      <Header setIsFolderFormOpen={setIsFolderFormOpen} />
      <br />
      <KnowledgeBaseTabs />
      <UpsertFolder
        openDialog={isFolderFormOpen}
        setOpenDialog={setIsFolderFormOpen}
      />
    </>
  );
};
