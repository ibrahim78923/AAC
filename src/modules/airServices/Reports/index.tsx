import { reportsTypes } from './Reports.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ServicesReportsTypesI } from './Reports.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const Reports = () => {
  return (
    <>
      <PageTitledHeader title="Reports and Analytics" />
      <br />
      <ContainerGrid>
        {reportsTypes?.map((item: ServicesReportsTypesI) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <CustomGrid md={6} lg={4}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
                itemPurpose={item?.purpose}
                itemTypeFontSize="h6"
              />
            </CustomGrid>
          </PermissionsGuard>
        ))}
      </ContainerGrid>
    </>
  );
};
