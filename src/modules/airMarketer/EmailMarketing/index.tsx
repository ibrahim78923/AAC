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
  BackArrIcon,
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
import { useEffect, useState } from 'react';
import { styles } from './EmailMarketing.style';
import Table from './Table';
import { PAGINATION } from '@/config';
import { API_STATUS, DATE_FORMAT, EMAIL_ENUMS } from '@/constants';
import { useGetEmailMarketingListQuery } from '@/services/airMarketer/emailMarketing';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultValues, validationSchema } from './Filters/Filters.data';
import dayjs from 'dayjs';

const EmailMarketing = () => {
  const {
    isOpenFilter,
    setIsOpenFilter,
    handleExportModalOpen,
    searchEmailMarketing,
    isExportModalOpen,
    setSearchEmailMarketing,
  }: any = useEmailMarketing();

  // Filters methods and operations ++
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (values: any) => {
    setFiltersData({ ...filtersData, ...values });
    setIsOpenFilter(false);
  };
  // Filters methods and operations --

  const router = useRouter();
  const { folder, id } = router.query;

  const isFolderEmails = router.pathname.includes('emails');

  const theme = useTheme();

  const [value, setValue] = useState(EMAIL_ENUMS?.ALL);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [selectedRecords, setSelectedRecords] = useState([]);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const [filtersData, setFiltersData] = useState<any>({});

  const { data: emailMarketingList, status: emailMarketingStatus } =
    useGetEmailMarketingListQuery({
      params: {
        page: page,
        limit: pageLimit,
        ...(searchEmailMarketing?.length && { search: searchEmailMarketing }),
        ...(value !== EMAIL_ENUMS?.ALL && { status: value }),
        ...(filtersData?.users?.user?.length > 0 && {
          createdBy: filtersData?.users?.user,
        }),
        ...(filtersData?.createdDate > 0 && {
          startDate: dayjs(filtersData?.createdDate).format(DATE_FORMAT?.API),
        }),
        ...(filtersData?.createdDate > 0 && {
          endDate: dayjs(filtersData?.createdDate).format(DATE_FORMAT?.API),
        }),
        ...(id && {
          folderId: id,
        }),
      },
    });

  const handleReset = () => {
    setSelectedRecords([]);
  };

  useEffect(() => {
    handleReset();
  }, [value]);

  return (
    <>
      <Stack direction={{ lg: 'row' }} justifyContent="space-between">
        <Typography
          variant="h4"
          sx={{
            marginBottom: { xs: '20px', sm: '20px', md: '20px', lg: '0' },
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textTransform: 'capitalize',
          }}
        >
          {isFolderEmails ? (
            <>
              <Box onClick={() => history.back()} sx={{ cursor: 'pointer' }}>
                <BackArrIcon />
              </Box>
              {folder}
            </>
          ) : (
            <>Email Marketing</>
          )}
        </Typography>
        <Stack direction="row" gap={1} flexWrap="wrap">
          {!isFolderEmails && (
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
          )}
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
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS.COMPARE_EMAILS,
            ]}
          >
            <Button
              variant="outlined"
              className="small"
              color="inherit"
              onClick={() =>
                router.push(
                  isFolderEmails
                    ? `${AIR_MARKETER?.FOLDER_COMPARE_EMAIL}?folder=${folder}&id=${id}`
                    : `${AIR_MARKETER?.COMPARE_EMAILS}`,
                )
              }
              sx={{ width: { sm: '140px', xs: '100%' } }}
            >
              Compare Email
            </Button>
          </PermissionsGuard>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_EMAIL_MARKETING_EMAIL_LIST_PERMISSIONS?.CREATE_NEW_EMAIL,
            ]}
          >
            <Button
              onClick={() =>
                router.push(
                  isFolderEmails
                    ? `${AIR_MARKETER?.FOLDER_CREATE_NEW_EMAIL}?folder=${folder}&id=${id}`
                    : `${AIR_MARKETER?.CREATE_NEW_EMAIL}`,
                )
              }
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
          {isFolderEmails ? (
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
          ) : (
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
          )}
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
            }}
          >
            <ActionButton
              selectedRecords={selectedRecords}
              setSelectedRecords={setSelectedRecords}
              handleReset={handleReset}
            />
            <Tooltip title={'Refresh Filter'}>
              <Button
                className="small"
                variant="outlined"
                color="inherit"
                sx={{
                  width: { xs: '100%', sm: 'auto', md: 'auto', lg: 'auto' },
                }}
                onClick={() => {
                  reset(), setFiltersData({});
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
          loading={emailMarketingStatus === API_STATUS?.PENDING}
          emailMarketingStatus={emailMarketingStatus}
          setPage={setPage}
          setPageLimit={setPageLimit}
          setSelectedRecords={setSelectedRecords}
          selectedRecords={selectedRecords}
        />
      </PermissionsGuard>

      <Filters
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        methods={methods}
        isOpenDrawer={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
      />

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
