import { useRouter } from 'next/router';
import { fieldManager } from './FieldManager.data';
import { AIR_SERVICES } from '@/constants/routes';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export default function FieldManager() {
  const router = useRouter();

  return (
    <>
      <PageTitledHeader
        title="Field Manager"
        canMovedBack
        moveBack={() => {
          router?.push(AIR_SERVICES?.SERVICE_MANAGEMENT);
        }}
      />
      <ContainerGrid spacing={3}>
        {fieldManager?.map((item: any) => (
          <CustomGrid key={item?.id} md={6}>
            <ItemLinkCard
              itemTypeFontSize="h6"
              Icon={item?.avatar}
              itemType={item?.type}
              itemLink={item?.link}
              itemPurpose={item?.purpose}
              avatarSize={{ width: 80, height: 80 }}
              avatarVariant={AVATAR_VARIANTS?.CIRCULAR}
              marginY={1}
            />
          </CustomGrid>
        ))}
      </ContainerGrid>
    </>
  );
}
