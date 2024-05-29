import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  Checkbox,
  Typography,
  Button,
  Grid,
  useTheme,
  Pagination,
  Skeleton,
} from '@mui/material';
import Search from '../../../../components/Search';

import { ArrowDownIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import {
  useGetCreateTaskCompaniesQuery,
  useGetCreateTaskContactsQuery,
  useGetCreateTaskDealsQuery,
  useGetCreateTaskTicketsQuery,
} from '@/services/airSales/task';
import CustomLabel from '@/components/CustomLabel';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setCompaniesSelectedIds,
  setContactsSelectedIds,
  setDealsSelectedIds,
  setTicketsSelectedIds,
} from '@/redux/slices/taskManagement/taskManagementSlice';
import { tabsData } from './searchableTabSelect.data';
import { PAGINATION } from '@/config';
import { TASK_TABS_TYPES } from '@/constants';

const SearchableTabsSelect = ({ required, ...other }: any) => {
  const dispatch: any = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(PAGINATION?.CURRENT_PAGE);

  const [searchTerm, setSearchTerm] = useState('');
  const { data: contactsData, status: contactsStatus } =
    useGetCreateTaskContactsQuery({
      params: {
        page: currentPage,
        limit: PAGINATION?.PAGE_LIMIT,
        ...(searchTerm && { search: searchTerm }),
      },
    });
  const { data: companiesData, status: companiesStatus } =
    useGetCreateTaskCompaniesQuery({
      params: {
        page: currentPage,
        limit: PAGINATION?.PAGE_LIMIT,
        ...(searchTerm && { search: searchTerm }),
      },
    });
  const { data: dealsData, status: dealsStatus } = useGetCreateTaskDealsQuery({
    params: {
      page: currentPage,
      limit: PAGINATION?.PAGE_LIMIT,
      ...(searchTerm && { search: searchTerm }),
    },
  });
  const { data: ticketsData } = useGetCreateTaskTicketsQuery({
    params: {
      page: PAGINATION?.CURRENT_PAGE,
      limit: PAGINATION?.PAGE_LIMIT,
      ...(searchTerm && { search: searchTerm }),
    },
  });

  const contactsDataArray =
    contactsData?.data?.contacts &&
    contactsData?.data?.contacts?.map((item: any) => ({
      label: `${item?.firstName} ${item?.lastName}`,
      id: item?._id,
    }));

  const companiesDataArray =
    companiesData?.data?.companies &&
    companiesData?.data?.companies?.map((item: any) => ({
      label: item?.name,
      id: item?._id,
    }));

  const dealsDataArray =
    dealsData?.data?.deals &&
    dealsData?.data?.deals?.map((item: any) => ({
      label: item?.name,
      id: item?._id,
    }));
  const ticketsDataArray =
    ticketsData?.data &&
    ticketsData?.data?.map((item: any) => ({
      label: item?.subject,
      id: item?._id,
    }));

  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (searchTerm?.length > 1) {
      setCurrentPage(1);
    }
  }, [searchTerm]);

  const theme = useTheme();
  const contactsSelectedIds = useAppSelector(
    (state: any) => state?.task?.contactsSelectedIds,
  );
  const dealsSelectedIds = useAppSelector(
    (state: any) => state?.task?.dealsSelectedIds,
  );
  const ticketsSelectedIds = useAppSelector(
    (state: any) => state?.task?.ticketsSelectedIds,
  );
  const companiesSelectedIds = useAppSelector(
    (state: any) => state?.task?.companiesSelectedIds,
  );

  const contactsDataToShow =
    contactsSelectedIds && contactsSelectedIds?.map((item: any) => item?.label);
  const dealsDataToShow =
    dealsSelectedIds && dealsSelectedIds?.map((item: any) => item?.label);
  const ticketsDataToShow =
    ticketsSelectedIds && ticketsSelectedIds?.map((item: any) => item?.label);
  const companiesDataToShow =
    companiesSelectedIds &&
    companiesSelectedIds?.map((item: any) => item?.label);

  const [activeSidebarItem, setActiveSidebarItem] = useState('associations');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxContacts = (item: any) => {
    dispatch(setContactsSelectedIds(item));
  };
  const handleCheckboxCompanies = (item: any) => {
    dispatch(setCompaniesSelectedIds(item));
  };
  const handleCheckboxDeals = (item: any) => {
    dispatch(setDealsSelectedIds(item));
  };
  const handleCheckboxTickets = (item: any) => {
    dispatch(setTicketsSelectedIds(item));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  return (
    <>
      {other?.label && <CustomLabel label={other?.label} required={required} />}
      <TextField
        fullWidth
        {...other}
        placeholder="Select Option"
        onClick={handleClick}
        label=""
        value={
          (contactsDataToShow?.length > 0
            ? contactsDataToShow?.join(', ') + ', '
            : '') +
          (dealsDataToShow?.length > 0
            ? dealsDataToShow?.join(', ') + ', '
            : '') +
          (ticketsDataToShow?.length > 0
            ? ticketsDataToShow?.join(', ') + ', '
            : '') +
          (companiesDataToShow?.length > 0
            ? companiesDataToShow?.join(', ') + ', '
            : '')
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <ArrowDownIcon />
            </InputAdornment>
          ),
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          style: {
            width: anchorEl ? anchorEl.clientWidth : 'auto',
            padding: '10px',
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {tabsData?.map((item: any) => (
                <Button
                  key={uuidv4()}
                  sx={{
                    fontWeight: '400',
                    justifyContent: 'start',
                    paddingLeft: '10px',
                    backgroundColor:
                      activeSidebarItem === item?.value
                        ? theme?.palette?.primary?.light
                        : '',
                    color:
                      activeSidebarItem === item?.value
                        ? theme?.palette?.primary?.main
                        : theme?.palette?.common?.black,
                    borderLeft: `3px solid ${
                      activeSidebarItem === item?.value
                        ? '#38CAB5'
                        : 'transparent'
                    }`,
                  }}
                  onClick={() => {
                    setActiveSidebarItem(item?.value);
                    setCurrentPage(1);
                  }}
                >
                  {item?.label}
                </Button>
              ))}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Search
                searchBy={searchTerm}
                setSearchBy={setSearchTerm}
                label="Search By Name"
                fullWidth
                size="small"
              />
              <Box>
                {(activeSidebarItem === TASK_TABS_TYPES?.CONTACTS &&
                  contactsStatus === 'pending') ||
                (activeSidebarItem === TASK_TABS_TYPES?.COMPANIES &&
                  companiesStatus === 'pending') ||
                (activeSidebarItem === TASK_TABS_TYPES?.DEALS &&
                  dealsStatus === 'pending') ? (
                  <Box sx={{ mt: 2 }}>
                    {[1, 2, 3, 4, 5]?.map(() => (
                      <Box
                        sx={{ display: 'flex', gap: '7px', mb: 2 }}
                        key={uuidv4()}
                      >
                        <Skeleton variant="rounded" width={20} height={20} />
                        <Skeleton variant="rounded" width={100} height={20} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    sx={{ maxHeight: '300px', overflow: 'scroll' }}
                    ref={containerRef}
                  >
                    {(activeSidebarItem === TASK_TABS_TYPES?.CONTACTS ||
                      activeSidebarItem === TASK_TABS_TYPES?.ASSOCIATIONS) && (
                      <TabsContentSection
                        title="Contacts"
                        dataArray={contactsDataArray}
                        selectedIds={contactsSelectedIds ?? []}
                        handelChange={handleCheckboxContacts}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                    {(activeSidebarItem === TASK_TABS_TYPES?.COMPANIES ||
                      activeSidebarItem === TASK_TABS_TYPES?.ASSOCIATIONS) && (
                      <TabsContentSection
                        title="Companies"
                        dataArray={companiesDataArray}
                        selectedIds={companiesSelectedIds}
                        handelChange={handleCheckboxCompanies}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                    {(activeSidebarItem === TASK_TABS_TYPES?.DEALS ||
                      activeSidebarItem === TASK_TABS_TYPES?.ASSOCIATIONS) && (
                      <TabsContentSection
                        title="Deals"
                        dataArray={dealsDataArray}
                        selectedIds={dealsSelectedIds}
                        handelChange={handleCheckboxDeals}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                    {(activeSidebarItem === TASK_TABS_TYPES?.TICKETS ||
                      activeSidebarItem === TASK_TABS_TYPES?.ASSOCIATIONS) && (
                      <TabsContentSection
                        title="Tickets"
                        dataArray={ticketsDataArray}
                        selectedIds={ticketsSelectedIds}
                        handelChange={handleCheckboxTickets}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                  </Box>
                )}
              </Box>

              <Box>
                <Pagination
                  count={
                    activeSidebarItem === TASK_TABS_TYPES?.CONTACTS
                      ? contactsData?.data?.meta?.pages
                      : activeSidebarItem === TASK_TABS_TYPES?.COMPANIES
                        ? companiesData?.data?.meta?.pages
                        : activeSidebarItem === TASK_TABS_TYPES?.DEALS
                          ? dealsData?.data?.meta?.pages
                          : 0
                  }
                  page={
                    activeSidebarItem === TASK_TABS_TYPES?.CONTACTS
                      ? contactsData?.data?.meta?.page
                      : activeSidebarItem === TASK_TABS_TYPES?.COMPANIES
                        ? companiesData?.data?.meta?.page
                        : activeSidebarItem === TASK_TABS_TYPES?.DEALS
                          ? dealsData?.data?.meta?.page
                          : 0
                  }
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Menu>
    </>
  );
};

const TabsContentSection = ({
  dataArray,
  selectedIds,
  handelChange,
  title,
  activeSidebarItem,
}: any) => {
  return (
    <Box>
      <Typography fontWeight={500} sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '-12px',
          mt: 1,
        }}
      >
        {dataArray &&
          dataArray?.map((item: any) => {
            return (
              <Box key={uuidv4()}>
                {activeSidebarItem === 'associations' ? (
                  <>
                    {selectedIds?.some(
                      (selectedItem: any) => selectedItem?.id === item?.id,
                    ) && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                          checked={selectedIds?.some(
                            (selectedItem: any) =>
                              selectedItem?.id === item?.id,
                          )}
                          onChange={() => {
                            handelChange(item);
                          }}
                        />
                        <Typography>{item?.label}</Typography>
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={selectedIds?.some(
                          (selectedItem: any) => selectedItem?.id === item?.id,
                        )}
                        onChange={() => handelChange(item)}
                      />
                      <Typography>{item?.label}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default SearchableTabsSelect;
