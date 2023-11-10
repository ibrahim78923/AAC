import Link from 'next/link';

import { Button, ButtonGroup } from '@mui/material';

import CommonTabs from '@/components/Tabs';
import { AIR_SERVICES } from '@/constants';

import DealCustomize from './DealCustomize';
import DelasTable from './DealsTable';
import DealHeader from './DealHeader';
import DealFilterDrawer from './DealFilterDrawer';
import ShareMyDine from './ShareMyDine';
import CreateView from './CreateView';

import useDealSaleSite from './useDealSaleSite';
import DeleteModal from './DealsModalBox/DeleteModal';
import ExportRecordModal from './DealsModalBox/ExportRecordModal';
import AssignModalBox from './DealsModalBox/AssignModalBox';
import { DealsTabs } from './DealsSaleSite.data';
import DealsActions from './DealsActions';
import BoardView from './BoardView/BoardView';

import {
  FilterIcon,
  RestoreIcon,
  CutomizeIcon,
  ListViewIcon,
  GridViewIcon,
} from '@/assets/icons';

const Deals = () => {
  const {
    search,
    setSearch,
    theme,
    isOpen,
    isDealCustomize,
    isFilter,
    isShareDine,
    handleChange,
    handleDealCustomize,
    handleSMD,
    handleFilter,
    HandleDeleteModal,
    isDelete,
    isAssign,
    handleAssignModal,
    handleExportRecord,
    exportRecord,
    handleActions,
    listView,
    handleListViewClick,
  } = useDealSaleSite();
  return (
    <>
      <DealHeader />
      <CommonTabs
        tabsArray={DealsTabs}
        addIcon
        onAddClick={handleChange}
        isHeader={true}
        searchBarProps={{
          label: 'Search Here',
          setSearchBy: setSearch,
          searchBy: search,
          // width: '260px',
        }}
        headerChildren={
          <>
            <DealsActions
              menuItem={[
                'Preview',
                'Re-assign',
                'Export',
                'Delete',
                'View Details',
              ]}
              disableActionBtn={false}
              onChange={handleActions}
            />

            <Link href={AIR_SERVICES?.AIRDEALS_RESTORE}>
              <Button
                variant="outlined"
                sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
                startIcon={<RestoreIcon />}
              >
                Restore
              </Button>
            </Link>
            <>
              <Button
                onClick={handleDealCustomize}
                variant="outlined"
                sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
              >
                <CutomizeIcon /> &nbsp; Customize
              </Button>
            </>
            <Button
              variant="outlined"
              sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
              onClick={handleFilter}
            >
              <FilterIcon />
              &nbsp; Filter
            </Button>

            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() => handleListViewClick('listView')}
                sx={{
                  '&:hover': { backgroundColor: '#F3F4F6' },
                  height: '30px',
                }}
              >
                <ListViewIcon />
              </Button>
              <Button
                onClick={() => handleListViewClick('gridView')}
                sx={{
                  '&:hover': { backgroundColor: '#F3F4F6' },
                  height: '30px',
                }}
              >
                <GridViewIcon />
              </Button>
            </ButtonGroup>
          </>
        }
      >
        {listView === 'listView' ? <DelasTable /> : <BoardView />}
      </CommonTabs>
      <CreateView open={isOpen} onClose={handleChange} />
      <DealCustomize open={isDealCustomize} onClose={handleDealCustomize} />
      <DealFilterDrawer open={isFilter} onClose={handleFilter} />
      <ShareMyDine open={isShareDine} onClose={handleSMD} />
      <DeleteModal open={isDelete} onClose={HandleDeleteModal} />
      <AssignModalBox open={isAssign} onClose={handleAssignModal} />
      <ExportRecordModal open={exportRecord} onClose={handleExportRecord} />
    </>
  );
};

export default Deals;
