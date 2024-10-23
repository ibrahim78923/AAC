import { ListLocation } from './ListLocation/Index';
import { ImportLocation } from './ImportLocation';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { LOCATION_TYPE } from './UpsertLocation/UpsertLocation.data';

export const Location = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <PageTitledHeader
        title={'Location'}
        canMovedBack
        moveBack={() => {
          router?.push({
            pathname: AIR_SERVICES?.ASSET_MANAGEMENT_SETTINGS,
          });
        }}
        addTitle={'New Location'}
        handleAction={() =>
          router?.push({
            pathname: AIR_SERVICES?.ADD_NEW_LOCATION,
            query: {
              type: LOCATION_TYPE?.PARENT,
            },
          })
        }
        createPermissionKey={[
          AIR_SERVICES_SETTINGS_ASSETS_MANAGEMENT_PERMISSIONS?.ADD_LOCATION,
        ]}
        hasStartIcon={false}
      />
      <br />
      <ListLocation />
      {isDrawerOpen && (
        <ImportLocation
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
        />
      )}
    </>
  );
};
