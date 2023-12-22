import React from 'react';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { AddCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import CommonTabs from '@/components/Tabs';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';

import RestoreCompanies from './RestoreCompanies';
import CreateCompany from './CreateCompany';
import FilterCompany from './FilterCompany';
import CustomizeCompany from './CustomizeCompany';

import { columns, companyTabs } from './Companies.data';
import { styles } from './Companies.style';
import useCompanies from './useCompanies';

import {
  CompanyIcon,
  CutomizeIcon,
  FilterIcon,
  ImportCompaniesIcon,
  RefreshTasksIcon,
  RestoreIcon,
} from '@/assets/icons';
import CreateViewCompany from './CreateViewCompany';
import PreviewDrawer from './CompanyActions/PreviewDrawer';
import DeleteModal from './CompanyActions/DeleteModal';
import ReassignModal from './CompanyActions/ReassignModal';
import MergeModal from './CompanyActions/MergeModal';
import ImportCompanies from './ImportCompanies';
import { companiesTableData } from '@/mock/modules/SocialComponents/Companies';
import ExportModal from './CompanyActions/ExportModal';

const Companies = () => {
  const {
    open,
    anchorEl,
    theme,
    search,
    setSearch,
    isOpenDrawer,
    setIsOpenDrawer,
    isFilter,
    setIsFilter,
    isCustomize,
    setIsCustomize,
    isToggled,
    toggle,
    handleClick,
    handleClose,
    isCreateView,
    setIsCreateView,
    isPreview,
    setIsPreview,
    isReassign,
    setIsReassign,
    isExport,
    setIsExport,
    isDeleteCompany,
    setIsDeleteCompany,
    isMerge,
    setIsMerge,
    isImport,
    setIsImport,
  } = useCompanies();

  return (
    <>
      {isToggled ? (
        <RestoreCompanies toggle={toggle} />
      ) : (
        <>
          <Box sx={styles?.mainCompanyBox(theme)}>
            <Stack
              direction={{ md: 'row', xs: 'column' }}
              justifyContent="space-between"
              gap={1}
            >
              <Typography
                variant="h3"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: `${theme?.palette?.grey[800]}`,
                }}
              >
                <CompanyIcon /> Companies
              </Typography>
              <Box
                display="flex"
                gap={1}
                flexDirection={{ sm: 'row', xs: 'column' }}
              >
                <Button
                  className="small"
                  color="inherit"
                  variant="outlined"
                  onClick={() => setIsImport(true)}
                >
                  <ImportCompaniesIcon />
                  Import
                </Button>
                <Button
                  className="small"
                  variant="contained"
                  startIcon={<AddCircle />}
                  onClick={() => {
                    setIsOpenDrawer(true);
                  }}
                >
                  Create Company
                </Button>
              </Box>
            </Stack>

            <CommonTabs
              tabsArray={companyTabs}
              isHeader={true}
              addIcon
              onAddClick={() => setIsCreateView(true)}
              searchBarProps={{
                label: 'Search Here',
                setSearchBy: setSearch,
                searchBy: search,
                width: '260px',
              }}
              headerChildren={
                <>
                  <Button
                    className="small"
                    color="inherit"
                    variant="outlined"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Action
                    <ArrowDropDownIcon
                      sx={{ color: `${theme?.palette?.custom?.main}` }}
                    />
                  </Button>
                  <Menu
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
                        setIsPreview(true);
                      }}
                    >
                      Preview
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setIsReassign(true);
                      }}
                    >
                      Re-assign
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setIsExport(true);
                      }}
                    >
                      Export
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setIsDeleteCompany(true);
                      }}
                    >
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        setIsMerge(true);
                      }}
                    >
                      Merge
                    </MenuItem>
                  </Menu>
                  <Button
                    variant="outlined"
                    className="small"
                    color="inherit"
                    startIcon={<RestoreIcon />}
                    onClick={() => toggle(true)}
                  >
                    Restore
                  </Button>
                  <>
                    <Button
                      variant="outlined"
                      className="small"
                      color="inherit"
                      onClick={() => setIsCustomize(true)}
                    >
                      <CutomizeIcon /> &nbsp; Customize
                    </Button>
                  </>
                  <Tooltip title={'Refresh Filter'}>
                    <Button
                      variant="outlined"
                      className="small"
                      color="inherit"
                    >
                      <RefreshTasksIcon />
                    </Button>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    className="small"
                    color="inherit"
                    onClick={() => setIsFilter(true)}
                  >
                    <FilterIcon />
                    &nbsp; Filter
                  </Button>
                </>
              }
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TanstackTable columns={columns} data={companiesTableData} />
                <CustomPagination
                  count={1}
                  rowsPerPageOptions={[1, 2]}
                  entriePages={1}
                />
              </Grid>
            </CommonTabs>
          </Box>
          <CreateCompany
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
          <FilterCompany setIsFilter={setIsFilter} isFilter={isFilter} />
          <CustomizeCompany
            isCustomize={isCustomize}
            setIsCustomize={setIsCustomize}
          />
          <CreateViewCompany
            isCreateView={isCreateView}
            setIsCreateView={setIsCreateView}
          />
          <PreviewDrawer isPreview={isPreview} setIsPreview={setIsPreview} />
          <DeleteModal
            isDeleteCompany={isDeleteCompany}
            setIsDeleteCompany={setIsDeleteCompany}
          />
          <ReassignModal
            isReassign={isReassign}
            setIsReassign={setIsReassign}
          />
          <MergeModal isMerge={isMerge} setIsMerge={setIsMerge} />
          <ImportCompanies isImport={isImport} setIsImport={setIsImport} />
          <ExportModal isExport={isExport} setIsExport={setIsExport} />
        </>
      )}
    </>
  );
};

export default Companies;
