import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { tabData } from './EmailMarketing.data';

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
import { ExportButton } from './ExportButton';
import { useRouter } from 'next/router';
import { AIR_MARKETER } from '@/routesConstants/paths';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { useState } from 'react';
import { styles } from './EmailMarketing.style';
import { useGetEmailMarketingListQuery } from '@/services/airMarketer/emailMarketing';
import Table from './Table';
import { PAGINATION } from '@/config';

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

  const theme = useTheme();

  const [value, setValue] = useState('all');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [selectedRecords, setSelectedRecords] = useState([]);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const {
    data: emailMarketingList,
    isLoading: emailMarketingLoading,
    status: emailMarketingStatus,
  } = useGetEmailMarketingListQuery({
    params: { page: page, limit: pageLimit },
  });

  return (
    <>
      <Stack direction={{ lg: 'row' }} justifyContent="space-between">
        <Typography
          variant="h4"
          sx={{ marginBottom: { xs: '20px', sm: '20px', md: '20px', lg: '0' } }}
        >
          Email Marketing
        </Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS?.SEARCH_FILTER,
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

      <PermissionsGuard
        permissions={[
          AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.VIEW_LIST,
        ]}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            mt: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: 'auto' } }}
          >
            <Tabs
              sx={styles?.tabRoot(theme)}
              value={value}
              onChange={handleChange}
              allowScrollButtonsMobile
              orientation="horizontal"
              variant="scrollable"
            >
              {tabData?.map((tab) => (
                <Tab
                  key={tab?.value}
                  sx={styles?.tabsStyle?.(theme)}
                  label={tab?.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
            }}
          >
            <ActionButton />
            <Tooltip title={'Refresh Filter'}>
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                sx={{
                  width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
                }}
              >
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
                sx={{
                  width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
                }}
              >
                Filters
              </Button>
            </PermissionsGuard>
          </Box>
        </Box>
        <Table
          emailMarketingList={emailMarketingList}
          loading={emailMarketingLoading}
          emailMarketingStatus={emailMarketingStatus}
          setPage={setPage}
          setPageLimit={setPageLimit}
          setSelectedRecords={setSelectedRecords}
          selectedRecords={selectedRecords}
        />
      </PermissionsGuard>

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
