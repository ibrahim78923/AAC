import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { DeleteArticles } from '../../DeleteArticles';

export const Header = () => {
  const router = useRouter();

  const isPortalOpen = useAppSelector(
    (state) => state?.servicesKnowledgeBase?.isPortalOpen,
  );

  return (
    <>
      <PageTitledHeader
        title={'View Article'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.KNOWLEDGE_BASE);
        }}
      />
      {isPortalOpen?.isOpen && <DeleteArticles />}
    </>
  );
};
