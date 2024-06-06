import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useServicesReports } from './useServicesReports';
import { AIR_OPERATIONS } from '@/constants';
import { Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { ActionDropDownData } from './UpsertServicesReports/UpsertServicesReports.data';

export const ServicesReports = () => {
  const { router } = useServicesReports();
  return (
    <>
      <PageTitledHeader
        title={'Reports'}
        canMovedBack
        moveBack={() => {
          router?.push(AIR_OPERATIONS?.REPORTS);
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddWhiteBgIcon />}
          onClick={() => {
            router?.push(AIR_OPERATIONS?.UPSERT_SERVICES_REPORTS);
          }}
        >
          Create report
        </Button>
      </PageTitledHeader>
      <SingleDropdownButton dropdownOptions={ActionDropDownData()} />
    </>
  );
};
