import { PageTitledHeader } from '@/components/PageTitledHeader';
import { scheduleCards } from './ScheduleMeetings.data';
import { SOCIAL_COMPONENTS } from '@/constants/routes';
import { useScheduleMeetings } from './useScheduleMeetings';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { Theme } from '@mui/material';

export const ScheduleMeetings = () => {
  const { moduleId, moduleType, modules, router } = useScheduleMeetings();
  return (
    <>
      <PageTitledHeader
        title="Select Meeting Category"
        canMovedBack
        moveBack={() =>
          router?.push(
            moduleType
              ? modules(moduleId)[moduleType]
              : SOCIAL_COMPONENTS?.MEETINGS,
          )
        }
      />
      <br />
      <ContainerGrid spacing={3}>
        {scheduleCards(moduleId, moduleType)?.map((item: any) => (
          <CustomGrid xl={3} lg={4} md={6} key={item?.id}>
            <ItemLinkCard
              Icon={item?.icon}
              itemType={item?.title}
              itemLink={SOCIAL_COMPONENTS?.UPSERT_MEETING}
              itemPurpose={item?.description}
              display="block"
              itemTypeFontSize="h5"
              avatarVariant="circular"
              avatarSize={{ width: 56, height: 56 }}
              textAlign="center"
              avatarMargin="auto"
              marginY={2}
              hasQuery={item?.query}
              borderColor="custom.off_white_three"
              hoverStyles={{
                boxShadow: (theme: Theme) =>
                  `0px 0px 4px 4px ${theme?.palette?.primary?.light}`,
              }}
            />
          </CustomGrid>
        ))}
      </ContainerGrid>
    </>
  );
};
