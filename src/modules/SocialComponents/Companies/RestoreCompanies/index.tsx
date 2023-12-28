import React from 'react';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { BackArrowIcon, FilterIcon, RefreshTasksIcon } from '@/assets/icons';

import CommonDrawer from '@/components/CommonDrawer';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import useRestoreCompanies from './useRestoreCompanies';
import Search from '@/components/Search';
import { FormProvider } from '@/components/ReactHookForm';

import { columns, restoreArr, restoreTableData } from './RestoreCompanies.data';

import { styles } from './RestoreComponies.style';

import { v4 as uuidv4 } from 'uuid';
import DeleteModal from './ActionsModals/DeleteModal';
import RestoreModal from './ActionsModals/RestoreModal';

const RestoreCompanies = (props: any) => {
  const { toggle } = props;

  const {
    search,
    setSearch,
    isDrawer,
    setIsDrawer,
    theme,
    open,
    anchorEl,
    handleClick,
    handleClose,
    methods,
    handleSubmit,
    onSubmit,
    isRestoreDelete,
    setIsRestoreDelete,
    isRestoreItem,
    setIsRestoreItem,
  } = useRestoreCompanies();

  return (
    <>
      <Box sx={styles?.mainCompanyBox}>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Box sx={{ cursor: 'pointer' }} onClick={() => toggle(true)}>
                <BackArrowIcon />
              </Box>
              <Box sx={{ marginTop: '1rem' }}>
                <Typography
                  variant="h3"
                  sx={{ color: `${theme?.palette?.grey[800]}` }}
                >
                  Restore Companies
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: `${theme?.palette?.custom?.main}` }}
                >
                  Restore Company deleted in the last 90 days
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Search
              label="Search here"
              width="260px"
              searchBy={search}
              setSearchBy={(e: string) => {
                setSearch(e);
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="small"
                variant="outlined"
                color="inherit"
                endIcon={<ArrowDropDownIcon />}
              >
                Action
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setIsRestoreItem(true);
                  }}
                >
                  Restore
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setIsRestoreDelete(true);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
              <Tooltip title={'Refresh Filter'}>
                <Button variant="outlined" color="inherit" className="small">
                  <RefreshTasksIcon />
                </Button>
              </Tooltip>
              <Button
                onClick={() => {
                  setIsDrawer(true);
                }}
                variant="outlined"
                className="small"
                color="inherit"
              >
                <FilterIcon /> Filter
              </Button>
            </Box>
          </Grid>
        </Grid>
        <TanstackTable columns={columns} data={restoreTableData} />
        <CustomPagination
          count={1}
          rowsPerPageOptions={[1, 2]}
          entriePages={1}
        />
      </Box>
      <CommonDrawer
        isDrawerOpen={isDrawer}
        onClose={() => {
          setIsDrawer(false);
        }}
        title="Filters"
        okText="Apply"
        isOk={true}
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {restoreArr?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={uuidv4()}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
      <DeleteModal
        isRestoreDelete={isRestoreDelete}
        setIsRestoreDelete={setIsRestoreDelete}
      />
      <RestoreModal
        isRestoreItem={isRestoreItem}
        setIsRestoreItem={setIsRestoreItem}
      />
    </>
  );
};

export default RestoreCompanies;
