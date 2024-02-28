import React, { useEffect, useState } from 'react';
import {
  Box,
  InputAdornment,
  TextField,
  Menu,
  Checkbox,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import Search from '../../../../components/Search';

import { ArrowDownIcon } from '@/assets/icons';

import { useFormContext, Controller } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';
import {
  useGetCreateTaskCompaniesQuery,
  useGetCreateTaskContactsQuery,
  useGetCreateTaskDealsQuery,
  useGetCreateTaskTicketsQuery,
} from '@/services/airSales/task';

export default function SearchableTabsSelect({ name, ...other }: any) {
  const { control } = useFormContext();
  const [activeSidebarItem, setActiveSidebarItem] = useState('associations');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: contactsData } = useGetCreateTaskContactsQuery({
    params: {
      page: '1',
      limit: '10',
    },
  });
  const { data: companiesData } = useGetCreateTaskCompaniesQuery({
    params: {
      page: '1',
      limit: '10',
    },
  });
  const { data: dealsData } = useGetCreateTaskDealsQuery({
    params: {
      page: '1',
      limit: '10',
    },
  });
  const { data: ticketsData } = useGetCreateTaskTicketsQuery({
    params: {
      page: '1',
      limit: '10',
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

  const tabsData = [
    {
      label: 'Associations',
      value: 'associations',
    },
    {
      label: 'Companies',
      value: 'companies',
    },
    {
      label: 'Contacts',
      value: 'contacts',
    },
    {
      label: 'Deals',
      value: 'deals',
    },
    {
      label: 'Tickets',
      value: 'tickets',
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [contactsSelectedIds, setContactsSelectedIds] = useState<any>([]);
  const [companiesSelectedIds, setCompaniesSelectedIds] = useState<string[]>(
    [],
  );
  const [dealsSelectedIds, setDealsSelectedIds] = useState<string[]>([]);
  const [ticketsSelectedIds, setTicketsSelectedIds] = useState<string[]>([]);

  const handleCheckboxContacts = (item: any) => {
    setContactsSelectedIds((prevSelectedItems: any) => {
      const itemId = item.id;
      if (
        prevSelectedItems.some(
          (selectedItem: any) => selectedItem.id === itemId,
        )
      ) {
        return prevSelectedItems.filter(
          (selectedItem: any) => selectedItem.id !== itemId,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
  const handleCheckboxCompanies = (item: any) => {
    setCompaniesSelectedIds((prevSelectedItems: any) => {
      const itemId = item.id;
      if (
        prevSelectedItems.some(
          (selectedItem: any) => selectedItem.id === itemId,
        )
      ) {
        return prevSelectedItems.filter(
          (selectedItem: any) => selectedItem.id !== itemId,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
  const handleCheckboxDeals = (item: any) => {
    setDealsSelectedIds((prevSelectedItems: any) => {
      const itemId = item.id;
      if (
        prevSelectedItems.some(
          (selectedItem: any) => selectedItem.id === itemId,
        )
      ) {
        return prevSelectedItems.filter(
          (selectedItem: any) => selectedItem.id !== itemId,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
  const handleCheckboxTickets = (item: any) => {
    setTicketsSelectedIds((prevSelectedItems: any) => {
      const itemId = item.id;
      if (
        prevSelectedItems.some(
          (selectedItem: any) => selectedItem.id === itemId,
        )
      ) {
        return prevSelectedItems.filter(
          (selectedItem: any) => selectedItem.id !== itemId,
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  useEffect(() => {
    // clearErrors(name);
    // setValue(name, contactsSelectedIds)
  }, [contactsSelectedIds]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...other}
            value={contactsSelectedIds.map((item: any) => item?.label)}
            placeholder="Select"
            onClick={handleClick}
            InputProps={{
              // inputRef: inputRef,
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
                  {tabsData.map((item) => (
                    <Button
                      key={uuidv4()}
                      sx={{
                        fontWeight: '400',
                        justifyContent: 'start',
                        paddingLeft: '10px',
                        backgroundColor:
                          activeSidebarItem === item.value ? '#EBFAF8' : '',
                        color:
                          activeSidebarItem === item.value ? '#38CAB5' : '#000',
                        borderLeft: `3px solid ${
                          activeSidebarItem === item.value
                            ? '#38CAB5'
                            : 'transparent'
                        }`,
                      }}
                      onClick={() => setActiveSidebarItem(item.value)}
                    >
                      {item?.label}
                    </Button>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <Search
                    searchBy={'Name'}
                    label=""
                    size="small"
                    width="100%"
                  />
                  <Box sx={{ maxHeight: '300px', overflow: 'scroll' }}>
                    {(activeSidebarItem === 'contacts' ||
                      activeSidebarItem === 'associations') && (
                      <TabsContentSection
                        title="Contacts"
                        dataArray={contactsDataArray}
                        selectedIds={contactsSelectedIds}
                        handelChange={handleCheckboxContacts}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                    {(activeSidebarItem === 'companies' ||
                      activeSidebarItem === 'associations') && (
                      <TabsContentSection
                        title="Companies"
                        dataArray={companiesDataArray}
                        selectedIds={companiesSelectedIds}
                        handelChange={handleCheckboxCompanies}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                    {(activeSidebarItem === 'deals' ||
                      activeSidebarItem === 'associations') && (
                      <TabsContentSection
                        title="Deals"
                        dataArray={dealsDataArray}
                        selectedIds={dealsSelectedIds}
                        handelChange={handleCheckboxDeals}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                    {(activeSidebarItem === 'tickets' ||
                      activeSidebarItem === 'associations') && (
                      <TabsContentSection
                        title="Tickets"
                        dataArray={ticketsDataArray}
                        selectedIds={ticketsSelectedIds}
                        handelChange={handleCheckboxTickets}
                        activeSidebarItem={activeSidebarItem}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Menu>
        </>
      )}
    />
  );
}

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
        {dataArray?.map((item: any) => {
          return (
            <>
              {activeSidebarItem === 'associations' ? (
                <>
                  {selectedIds?.some(
                    (selectedItem: any) => selectedItem?.id === item?.id,
                  ) && (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center' }}
                      key={uuidv4()}
                    >
                      <Checkbox
                        checked={selectedIds?.some(
                          (selectedItem: any) => selectedItem?.id === item?.id,
                        )}
                        onChange={() => {
                          handelChange(item);
                        }}
                      />
                      <Typography key={uuidv4()}>{item?.label}</Typography>
                    </Box>
                  )}
                </>
              ) : (
                <>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center' }}
                    key={uuidv4()}
                  >
                    <Checkbox
                      checked={selectedIds?.some(
                        (selectedItem: any) => selectedItem?.id === item?.id,
                      )}
                      onChange={() => handelChange(item)}
                    />
                    <Typography key={uuidv4()}>{item?.label}</Typography>
                  </Box>
                </>
              )}
            </>
          );
        })}
      </Box>
    </Box>
  );
};
