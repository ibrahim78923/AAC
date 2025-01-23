import { Typography } from '@mui/material';
import { accountSettings } from './AccountSettings.data';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { ISettingsCards } from '../Settings.interface';
import { ItemLinkCard } from '@/components/Cards/ItemLinkCard/ItemLinkCard';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const AccountSettings = () => {
  return (
    <>
      <Typography variant="h3">Account Settings</Typography>
      <br />
      <CustomGrid isContainer spacing={3}>
        {accountSettings?.map((item: ISettingsCards) => (
          <PermissionsGuard permissions={item?.permissions} key={item?.id}>
            <CustomGrid md={6} lg={4}>
              <ItemLinkCard
                Icon={item?.avatar}
                itemType={item?.type}
                itemLink={item?.link}
              />
            </CustomGrid>
          </PermissionsGuard>
        ))}
      </CustomGrid>
    </>
  );
};
