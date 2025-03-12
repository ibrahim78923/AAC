import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import DeleteArticles from '../../DeleteArticles';

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
