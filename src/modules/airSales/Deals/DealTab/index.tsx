import {
  Tabs,
  Tab,
  Box,
  useTheme,
  Button,
  Tooltip,
  ButtonGroup,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { styles } from './Deal.style';

import { v4 as uuidv4 } from 'uuid';
import TanstackTable from '@/components/Table/TanstackTable';
import useDealTab from './useDealTab';
import DealsActions from '../DealsActions';
import { AIR_SERVICES } from '@/constants';
import {
  CutomizeIcon,
  FilterIcon,
  GridViewIcon,
  ListViewIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
import Search from '@/components/Search';
import { useRouter } from 'next/router';
import CreateView from '../CreateView';
import DealCustomize from '../DealCustomize';
import ShareMyDine from '../ShareMyDine';
import DeleteModal from '../DealsModalBox/DeleteModal';
import AssignModalBox from '../DealsModalBox/AssignModalBox';
import ExportRecordModal from '../DealsModalBox/ExportRecordModal';
import DealFilterDrawer from '../DealFilterDrawer';
import BoardView from '../BoardView/BoardView';

const DealsTab = () => {
  const navigate = useRouter();
  const {
    tabsArray,
    value,
    handleChange,
    handleTabChange,
    dealTableData,
    handleSearch,
    selectedRows,
    handleDeleteDeals,
    handeApplyFilter,
    handleResetFilters,
    handleListViewClick,
    listView,
    handleFilter,
    isFilterDrawer,
    isAddTabOpen,
    handleAddTab,
    handleSMD,
    isShareDine,
    handleActions,
    isAssign,
    handleAssignModal,
    isDelete,
    handleDeleteModal,
    isExportRecord,
    handleExportRecord,
    isDealCustomize,
    handleDealCustomize,
    setViewColumns,
    viewColumns,
  } = useDealTab();

  const theme = useTheme();

  return (
    <Box sx={styles?.tabWrapper}>
      <Box sx={style?.headerWrapper}>
        <Search setSearchBy={handleSearch} placeholder="Search Here" />
        <Box sx={style?.headerChild}>
          {selectedRows?.length >= 2 ? (
            <Button
              variant="outlined"
              color="inherit"
              className="small"
              onClick={handleDeleteModal}
              sx={{ width: { xs: '100%', sm: '100px' } }}
            >
              Delete
            </Button>
          ) : (
            <DealsActions
              menuItem={[
                'Preview',
                'Re-assign',
                'Export',
                'Delete',
                'View Details',
              ]}
              onChange={handleActions}
              checkedRows={selectedRows}
            />
          )}

          <Button
            onClick={() => navigate?.push(AIR_SERVICES?.AIRDEALS_RESTORE)}
            variant="outlined"
            color="inherit"
            className="small"
            startIcon={<RefreshTasksIcon />}
            sx={{ width: { xs: '100%', sm: '100px' } }}
          >
            Restore
          </Button>
          <Button
            onClick={handleDealCustomize}
            variant="outlined"
            color="inherit"
            className="small"
            sx={{ minWidth: '132px', width: { xs: '100%', sm: '100px' } }}
            startIcon={<CutomizeIcon />}
          >
            Customize
          </Button>
          <Tooltip title={'Refresh Filter'}>
            <Button
              onClick={handleResetFilters}
              variant="outlined"
              color="inherit"
              className="small"
            >
              <RefreshTasksIcon />
            </Button>
          </Tooltip>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={handleFilter}
            sx={{ width: { xs: '100%', sm: '100px' } }}
            startIcon={<FilterIcon />}
          >
            Filter
          </Button>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              variant="contained"
              color="inherit"
              className="small"
              onClick={() => handleListViewClick('listView')}
            >
              <ListViewIcon />
            </Button>
            <Button
              onClick={() => handleListViewClick('gridView')}
              variant="contained"
              color="inherit"
              className="small"
            >
              <GridViewIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      <Box
        className="tabs-container"
        sx={{
          mt: '20px',
          borderBottom: 1,
          borderColor: theme?.palette?.custom?.off_white_three,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Tabs
          variant="scrollable"
          defaultValue={value}
          value={value}
          onChange={handleChange}
          aria-label="common tabs"
        >
          {tabsArray?.map((tab: any, index: number) => (
            <Tab
              sx={{
                '&.Mui-selected': {
                  color: theme?.palette?.custom?.turquoise_Blue,
                },
              }}
              classes={{ textColorPrimary: 'text-primary-my' }}
              disableRipple
              key={uuidv4()}
              label={tab?.name}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
              onClick={() => handleTabChange(tab)}
            />
          ))}
        </Tabs>
        <Box sx={{ ml: '50px' }}>
          <AddCircleIcon onClick={handleAddTab} sx={styles?.addIcon(theme)} />
        </Box>
      </Box>
      {listView === 'listView' ? (
        <TanstackTable {...dealTableData} />
      ) : (
        <BoardView
        // handleCheckedGrid={handleCheckedGrid}
        // checkedGridView={checkedGridView}
        // search={search}
        />
      )}
      {isAddTabOpen && (
        <CreateView open={isAddTabOpen} onClose={handleAddTab} />
      )}
      {isFilterDrawer && (
        <DealFilterDrawer
          open={isFilterDrawer}
          onClose={handleFilter}
          handleApply={handeApplyFilter}
        />
      )}
      {isDealCustomize && (
        <DealCustomize
          open={isDealCustomize}
          onClose={handleDealCustomize}
          columns={viewColumns}
          setColumns={setViewColumns}
        />
      )}
      {isShareDine && (
        <ShareMyDine
          open={isShareDine}
          onClose={handleSMD}
          selectedTableIds={selectedRows}
        />
      )}
      {isDelete && (
        <DeleteModal
          open={isDelete}
          onClose={handleDeleteModal}
          handleSubmitBtn={handleDeleteDeals}
        />
      )}
      {isAssign && (
        <AssignModalBox
          seletedId={selectedRows}
          open={isAssign}
          onClose={handleAssignModal}
        />
      )}
      {isExportRecord && (
        <ExportRecordModal open={isExportRecord} onClose={handleExportRecord} />
      )}
    </Box>
  );
};
export default DealsTab;

const style = {
  headerWrapper: {
    padding: '18px 0px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '15px',
  },
  headerChild: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px',
  },
};
