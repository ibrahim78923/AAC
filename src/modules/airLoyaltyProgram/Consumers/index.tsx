import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button } from '@mui/material';
import { consumerData } from './Consumer.data';
import { useConsumer } from './useConsumer';
import { ConsumersCustomizeIcon } from '@/assets/icons';
import { ConsumerCustomizeColumns } from './consumerCustomizeColumns';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS } from '@/constants/permission-keys';

export const Consumers = () => {
  const {
    handleSearch,
    consumersListColumn,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    setCustomizeColumns,
    customizeColumns,
    filterColumns,
    actionButtonDropdown,
    selectedRoleList,
  } = useConsumer();
  return (
    <Box>
      <PageTitledHeader title={'Consumers'} />
      <Box border={`1px solid`} borderColor={'grey.700'} borderRadius={2}>
        <Box
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
          p={2}
        >
          <Box gap={2} display={'flex'} alignItems={'center'}>
            <PermissionsGuard
              permissions={[
                AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.SEARCH_DETAILS,
              ]}
            >
              <Search
                label={'Search'}
                setSearchBy={handleSearch}
                size={'small'}
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.STATUS]}
            >
              <SingleDropdownButton
                dropdownOptions={actionButtonDropdown}
                disabled={!!!selectedRoleList?.length}
              />
            </PermissionsGuard>
          </Box>
          <PermissionsGuard
            permissions={[AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.CUSTOMIZE]}
          >
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              startIcon={<ConsumersCustomizeIcon />}
              onClick={openDrawer}
            >
              Customize
            </Button>
          </PermissionsGuard>
        </Box>
        <PermissionsGuard
          permissions={[
            AIR_LOYALTY_PROGRAM_CONSUMERS_PERMISSIONS?.VIEW_DETAILS,
          ]}
        >
          <Box>
            <TanstackTable
              data={consumerData}
              columns={filterColumns}
              isPagination
            />
          </Box>
        </PermissionsGuard>
      </Box>

      {isDrawerOpen && (
        <ConsumerCustomizeColumns
          isDrawerOpen={isDrawerOpen}
          closeDrawer={closeDrawer}
          setCustomizeColumns={setCustomizeColumns}
          customizeColumns={customizeColumns}
          consumersListColumn={consumersListColumn}
        />
      )}
    </Box>
  );
};
