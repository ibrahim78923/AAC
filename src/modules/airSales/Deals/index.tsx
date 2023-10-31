import Link from 'next/link';

import { Button, ButtonGroup } from '@mui/material';

import CommonTabs from '@/components/Tabs';

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

import {
  FilterIcon,
  RestoreIcon,
  CutomizeIcon,
  ListViewIcon,
  GridViewIcon,
} from '@/assets/icons';
import DealsActions from './DealsActions';

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

            <Link href={'/air-sales/deals/restore'}>
              <Button
                variant="outlined"
                sx={{ height: '30px', color: theme.palette.custom['main'] }}
                startIcon={<RestoreIcon />}
              >
                Restore
              </Button>
            </Link>
            <>
              <Button
                onClick={handleDealCustomize}
                variant="outlined"
                sx={{ height: '30px', color: theme.palette.custom['main'] }}
              >
                <CutomizeIcon /> &nbsp; Customize
              </Button>
            </>
            <Button
              variant="outlined"
              sx={{ height: '30px', color: theme.palette.custom['main'] }}
              onClick={handleFilter}
            >
              <FilterIcon />
              &nbsp; Filter
            </Button>

            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group"
              sx={{ minHeight: '36px' }}
            >
              <Button
                // onClick={() => handleClick('listView')}
                sx={{
                  '&:hover': { backgroundColor: '#F3F4F6' },
                  // backgroundColor: activeColor === 'listView' ? '#F3F4F6' : '',
                }}
              >
                <ListViewIcon />
              </Button>
              <Button
                // onClick={() => handleClick('gridView')}
                sx={{
                  '&:hover': { backgroundColor: '#F3F4F6' },
                  // backgroundColor: activeColor === 'gridView' ? '#F3F4F6' : '',
                }}
              >
                <GridViewIcon />
              </Button>
            </ButtonGroup>
          </>
        }
      >
        <DelasTable />
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
