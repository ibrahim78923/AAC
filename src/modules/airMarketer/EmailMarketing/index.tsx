import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { emailMarketingTabsData } from './EmailMarketing.data';
import All from './Tabs/All';
import Archived from './Tabs/Archived';
import Draft from './Tabs/Draft';
import Scheduled from './Tabs/Scheduled';
import Sent from './Tabs/Sent';
import Search from '@/components/Search';
import {
  ExportIcon,
  FilterrIcon,
  PlusIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import ActionButton from './ActionButton';
import useEmailMarketing from './useEmailMarketing';
import Filters from './Filters';
// import EmailFolder from './EmailFolder';
import { ExportButton } from './ExportButton';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const EmailMarketing = () => {
  const {
    isOpenFilter,
    setIsOpenFilter,
    handleExportModalOpen,
    searchEmailMarketing,
    isExportModalOpen,
    setSearchEmailMarketing,
  } = useEmailMarketing();
  const router = useRouter();
  return (
    <>
      <Stack direction={{ lg: 'row' }} justifyContent="space-between">
        <Typography variant="h4">Email Marketing</Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.SEARCH_FILTER,
            ]}
          >
            <Search
              searchBy={searchEmailMarketing}
              setSearchBy={setSearchEmailMarketing}
              label="Search Here"
              size="small"
            />
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.EXPORT_EMAILS,
            ]}
          >
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={handleExportModalOpen}
              startIcon={<ExportIcon />}
              sx={{ width: { sm: '106px', xs: '100%' } }}
            >
              Export
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.COMPAIR_EMAILS,
            ]}
          >
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              onClick={() => router.push(`${AIR_MARKETER?.COMPARE_EMAIL}`)}
              sx={{ width: { sm: '140px', xs: '100%' } }}
            >
              Compare Email
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.CREATE_NEW_EMAIL,
            ]}
          >
            <Button
              onClick={() => router.push(`${AIR_MARKETER?.CREATE_NEW_EMAIL}`)}
              variant="contained"
              className="small"
              startIcon={<PlusIcon />}
              sx={{ width: { sm: '176px', xs: '100%' } }}
            >
              Create New Email
            </Button>
          </PermissionsGuard>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent={{ md: 'flex-end' }}
        gap={1}
        my={2}
      >
        <ActionButton />
        <Tooltip title={'Refresh Filter'}>
          <Button className="small" variant="outlined" color="inherit">
            <RefreshTasksIcon />
          </Button>
        </Tooltip>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.SEARCH_FILTER,
          ]}
        >
          <Button
            onClick={() => setIsOpenFilter(true)}
            className="small"
            startIcon={<FilterrIcon />}
            variant="outlined"
            color="inherit"
          >
            Filters
          </Button>
        </PermissionsGuard>
      </Stack>
      <PermissionsGuard
        permissions={[
          AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.VIEW_LIST,
        ]}
      >
        <HorizontalTabs tabsDataArray={emailMarketingTabsData}>
          <All />
          <Archived />
          <Draft />
          <Scheduled />
          <Sent />
        </HorizontalTabs>
      </PermissionsGuard>
      {/* commented for future use  */}
      {/* <EmailFolder /> */}

      {isOpenFilter && (
        <Filters
          isOpenDrawer={isOpenFilter}
          onClose={() => setIsOpenFilter(false)}
        />
      )}
      {isExportModalOpen && (
        <ExportButton
          isExportModalOpen={isExportModalOpen}
          handleExportModalOpen={handleExportModalOpen}
        />
      )}
    </>
  );
};
export default EmailMarketing;
