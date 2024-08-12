import { Typography } from '@mui/material';
import { PermissionsTabs } from '@/components/Tabs/PermissionsTabs';
import { dataManagementListTabs } from './DataManagement.data';

const dataManagementTabs = dataManagementListTabs();

export const DataManagement = () => {
  return (
    <>
      <Typography variant="h3" pb={2.4} textTransform="capitalize">
        data management
      </Typography>
      <PermissionsTabs spacing={0.3} tabsDataArray={dataManagementTabs} />
    </>
  );
};
