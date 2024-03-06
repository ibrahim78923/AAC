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
  CircularProgress,
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

const SearchableTabsSelect = ({ required, ...other }: any) => {
  const dispatch: any = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const [contactsPage, setContactsPage] = useState(PAGINATION?.CURRENT_PAGE);
  const contactsPageLimit = PAGINATION?.PAGE_LIMIT;

  const [companiesPage, setCompaniesPage] = useState(PAGINATION?.CURRENT_PAGE);
  const companiesPageLimit = PAGINATION?.PAGE_LIMIT;

  const [dealsPage, setDealsPage] = useState(PAGINATION?.CURRENT_PAGE);
  const dealsPageLimit = PAGINATION?.PAGE_LIMIT;

  const [ticketsPage, setTicketsPage] = useState(PAGINATION?.CURRENT_PAGE);
  const ticketsPageLimit = PAGINATION?.PAGE_LIMIT;

  const { data: contactsData, status: contactsStatus } =
    useGetCreateTaskContactsQuery({
      params: {
        page: contactsPage,
        limit: contactsPageLimit,
        search: searchTerm,
      },
    });
  const { data: companiesData, status: companiesStatus } =
    useGetCreateTaskCompaniesQuery({
      params: {
        page: companiesPage,
        limit: companiesPageLimit,
      },
    });
  const { data: dealsData, status: dealsStatus } = useGetCreateTaskDealsQuery({
    params: {
      page: dealsPage,
      limit: dealsPageLimit,
    },
  });
  const { data: ticketsData, status: ticketsStatus } =
    useGetCreateTaskTicketsQuery({
      params: {
        page: ticketsPage,
        limit: ticketsPageLimit,
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

  const [getContactsData, setGetContactsData] = useState<any>([]);
  const [getCompaniesData, setGetCompaniesData] = useState<any>([]);
  const [getDealsData, setGetDealsData] = useState<any>([]);
  const [getTicketsData, setGetTicketsData] = useState<any>([]);

  useEffect(() => {
    if (contactsDataArray) {
      if (searchTerm.length > 1) {
        setGetContactsData(contactsDataArray);
      } else {
        // setGetContactsData((prevData: any) => [...prevData, ...contactsDataArray]);
        setGetContactsData((prevData: any) => {
          const newData = contactsDataArray?.filter(
            (item: any) =>
              !prevData.some((prevItem: any) => prevItem?.id === item?.id),
          );
          return [...prevData, ...newData];
        });
      }
    }
  }, [contactsData?.data, contactsPage]);
  useEffect(() => {
    if (companiesDataArray) {
      setGetCompaniesData((prevData: any) => {
        const newData = companiesDataArray?.filter(
          (item: any) =>
            !prevData.some((prevItem: any) => prevItem?.id === item?.id),
        );
        return [...prevData, ...newData];
      });
    }
  }, [companiesData?.data]);
  useEffect(() => {
    if (dealsDataArray) {
      setGetDealsData((prevData: any) => {
        const newData = dealsDataArray?.filter(
          (item: any) =>
            !prevData.some((prevItem: any) => prevItem?.id === item?.id),
        );
        return [...prevData, ...newData];
      });
    }
  }, [dealsData?.data]);
  useEffect(() => {
    if (ticketsDataArray) {
      setGetTicketsData((prevData: any) => {
        const newData = ticketsDataArray?.filter(
          (item: any) =>
            !prevData.some((prevItem: any) => prevItem?.id === item?.id),
        );
        return [...prevData, ...newData];
      });
    }
  }, [ticketsData?.data]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      setContactsPage(1);
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

  useEffect(() => {
    const container: any = containerRef?.current;
    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5
      ) {
        if (contactsStatus !== 'pending') {
          if (activeSidebarItem === 'contacts') {
            if (contactsPage < contactsData?.data?.meta?.pages)
              setContactsPage(contactsPage + 1);
          }
        }
        if (companiesStatus !== 'pending') {
          if (activeSidebarItem === 'companies') {
            if (companiesPage < companiesData?.data?.meta?.pages)
              setCompaniesPage(companiesPage + 1);
          }
        }
        if (dealsStatus !== 'pending') {
          if (activeSidebarItem === 'deals') {
            if (dealsPage < dealsData?.data?.meta?.pages)
              setDealsPage(dealsPage + 1);
          }
        }
        if (ticketsStatus !== 'pending') {
          if (activeSidebarItem === 'tickets') {
            if (ticketsPage < ticketsData?.data?.meta?.pages)
              setTicketsPage(ticketsPage + 1);
          }
        }
      }
    };
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [contactsDataArray]);

  return (
    <>
      {other?.label && <CustomLabel label={other?.label} required={required} />}
      <TextField
        fullWidth
        {...other}
        placeholder="Select Option"
        onClick={handleClick}
        label=""
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
                  onClick={() => setActiveSidebarItem(item?.value)}
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

              <Box
                sx={{ maxHeight: '300px', overflow: 'scroll' }}
                ref={containerRef}
              >
                {(activeSidebarItem === 'contacts' ||
                  activeSidebarItem === 'associations') && (
                  <TabsContentSection
                    title="Contacts"
                    dataArray={
                      searchTerm.length > 0
                        ? contactsDataArray
                        : getContactsData
                    }
                    selectedIds={contactsSelectedIds ?? []}
                    handelChange={handleCheckboxContacts}
                    activeSidebarItem={activeSidebarItem}
                  />
                )}
                {(activeSidebarItem === 'companies' ||
                  activeSidebarItem === 'associations') && (
                  <TabsContentSection
                    title="Companies"
                    dataArray={getCompaniesData}
                    selectedIds={companiesSelectedIds}
                    handelChange={handleCheckboxCompanies}
                    activeSidebarItem={activeSidebarItem}
                  />
                )}
                {(activeSidebarItem === 'deals' ||
                  activeSidebarItem === 'associations') && (
                  <TabsContentSection
                    title="Deals"
                    dataArray={getDealsData}
                    selectedIds={dealsSelectedIds}
                    handelChange={handleCheckboxDeals}
                    activeSidebarItem={activeSidebarItem}
                  />
                )}
                {(activeSidebarItem === 'tickets' ||
                  activeSidebarItem === 'associations') && (
                  <TabsContentSection
                    title="Tickets"
                    dataArray={getTicketsData}
                    selectedIds={ticketsSelectedIds}
                    handelChange={handleCheckboxTickets}
                    activeSidebarItem={activeSidebarItem}
                  />
                )}
              </Box>

              {activeSidebarItem === 'contacts' && renderLoader(contactsStatus)}
              {activeSidebarItem === 'companies' &&
                renderLoader(companiesStatus)}
              {activeSidebarItem === 'deals' && renderLoader(dealsStatus)}
              {activeSidebarItem === 'tickets' && renderLoader(ticketsStatus)}
            </Box>
          </Grid>
        </Grid>
      </Menu>
    </>
  );
};

const renderLoader = (status: any) =>
  status === 'pending' && (
    <Box display={'flex'} justifyContent={'center'}>
      <CircularProgress />
    </Box>
  );

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
