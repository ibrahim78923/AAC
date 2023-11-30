import React, { useState } from 'react';
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

export default function SearchableTabsSelect({ name, ...other }: any) {
  const { control } = useFormContext();

  // const [searchTerm, setSearchTerm] = useState('');
  const [activeSidebarItem, setActiveSidebarItem] = useState('associations');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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

  const dataOptions = [
    {
      key: 'companies',
      label: 'Companies',
      data: [
        {
          label: 'L&C',
          id: '89sff89df',
        },
      ],
    },
    {
      key: 'contacts',
      label: 'Contacts',
      data: [
        {
          label: 'Phonix bakers',
          id: 'tr8t6t77j',
        },
      ],
    },
    {
      key: 'deals',
      label: 'Deals',
      data: [
        {
          label: 'Sharemydine',
          id: 'hjhjhjs78dsd',
        },
      ],
    },
  ];

  const filteredData =
    activeSidebarItem === 'associations'
      ? dataOptions.flatMap((option) => option)
      : dataOptions?.filter((option: any) =>
          option.label.toLowerCase().includes(activeSidebarItem.toLowerCase()),
        );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setSearchTerm('');
  };

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
            value={''}
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
                    // setSearchBy={setSearchTerm}
                    label=""
                    size="small"
                    width="100%"
                  />
                  <Box sx={{ maxHeight: '300px', overflow: 'scroll' }}>
                    {filteredData?.map((item: any) => (
                      <Box key={uuidv4()}>
                        <Typography fontWeight={500} sx={{ mt: 2 }}>
                          {item?.label}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '-12px',
                            mt: 1,
                          }}
                        >
                          <Checkbox
                          // onChange={() => handelSelectAll(field)}
                          // checked={
                          //   selectedValues.length === options.length ? true : false
                          // }
                          />
                          {item?.data?.map((item: any) => (
                            <Typography key={uuidv4()}>
                              {item?.label}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    ))}
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
