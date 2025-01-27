import { Typography } from '@mui/material';
import { assetManagement } from './AssetManagement.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const AssetManagement = () => {
  return (
    <>
      <Typography variant="h3">Asset Management</Typography>
      <br />
      <ContainerGrid spacing={3}>
        {assetManagement?.map((item: ISettingsCards) => (
          <PermissionsGuard key={item?.id} permissions={item?.permissions}>
            <CustomGrid md={6} lg={4} xs={12}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
              />
            </CustomGrid>
          </PermissionsGuard>
        ))}
      </ContainerGrid>
    </>
  );
};
