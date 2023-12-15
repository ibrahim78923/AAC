import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Typography } from '@mui/material';
import ImportTab from './ImportTab';
import ExportTab from './ExportTab';

export const dataManagementTabs = ['Import', 'Export'];

export const DataManagement = () => {
  return (
    <>
      <Typography variant="h3" pb={2.4} textTransform="capitalize">
        data management
      </Typography>
      <HorizontalTabs tabsDataArray={dataManagementTabs} spacing={0}>
        <ImportTab />
        <ExportTab />
      </HorizontalTabs>
    </>
  );
};
