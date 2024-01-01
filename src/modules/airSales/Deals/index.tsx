import { useRouter } from 'next/router';

import { Button, ButtonGroup, Tooltip } from '@mui/material';

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
  CutomizeIcon,
  ListViewIcon,
  GridViewIcon,
  RefreshTasksIcon,
} from '@/assets/icons';
// import {
//   useGetDealsListWithOutParamsQuery,
//   useGetDealsViewsQuery,
//   useLazyGetDealsListQuery,
//   useLazyGetDealsViewsQuery,
// } from '@/services/airSales/deals';

const Deals = () => {
  const navigate = useRouter();
  const {
    search,
    setSearch,
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
    handleCheckboxChange,
    selectedIds,
    handleTableCheckboxChange,
    selectedTableIds,
    filterVal,
    setFilterVal,
    setIsFilter,
    // dealViewsData,
    handleDeleteDeals,
    viewColumns,
    setViewColumns,
    // setTabData,
    // tabsArr,
    getTabValue,
    // tab,
    // setTab,
  } = useDealSaleSite();

  // const handleTabChange = (_: string, index: number) => {
  //   if (index > 0) {
  //     const dealView = dealViewsData?.data?.[index - 1];
  //     setTab(dealView._id);
  //     const mockApiResponse = {
  //       ...dealView,
  //       ...{
  //         columns: [
  //           'createdBy',
  //           'name',
  //           'closeDate',
  //           'amount',
  //           'dealStage',
  //           'dealPipeline',
  //         ],
  //         viewType: 'listView',
  //       },
  //     };
  //     setViewColumns(mockApiResponse.columns);
  //     // console.log(mockApiResponse.filters);
  //     setFilterVal({ ...filterVal, ...mockApiResponse.filters });
  //     handleListViewClick(mockApiResponse.viewType);
  //   } else {
  //     setTab(0);
  //     setFilterVal({});
  //     setViewColumns([
  //       'createdBy',
  //       'name',
  //       'closeDate',
  //       'amount',
  //       'dealStage',
  //       'dealPipeline',
  //     ]);
  //     handleListViewClick('listView');
  //   }
  // };

  // const handleFilterApply = (filterVal) => {
  //   let currentIndex;
  //   dealViewsData?.data?.filter(({ _id}, index) => {
  //     if (_id == tab) {
  //       currentIndex = index;
  //       return true
  //     }
  //   })
  //   if (currentIndex) {
  //     dealViewsData.data[currentIndex].filters = filterVal;
  //   }
  //   setFilterVal(filterVal);
  // };

  return (
    <>
      {/* <DragAble /> */}
      <DealHeader />
      <CommonTabs
        tabsArray={DealsTabs} //?.concat(tabsArr)
        // handleTabChange={handleTabChange}
        getTabVal={getTabValue}
        addIcon
        onAddClick={handleChange}
        isHeader={true}
        searchBarProps={{
          label: 'Search Here',
          setSearchBy: setSearch,
          searchBy: search,
        }}
        headerChildren={
          <>
            {selectedTableIds?.length >= 2 ? (
              <Button
                variant="outlined"
                color="inherit"
                className="small"
                onClick={HandleDeleteModal}
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
                disableActionBtn={selectedTableIds?.length > 0 ? false : true}
                onChange={handleActions}
                selectedIds={selectedTableIds}
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
                onClick={() => setFilterVal('')}
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
          </>
        }
      ></CommonTabs>
      {listView === 'listView' ? (
        <>
          {/* all deals */}
          <DelasTable
            handleTableCheckboxChange={handleTableCheckboxChange}
            handleSelectAll={() => {}}
            selectedTableIds={selectedTableIds}
            filterVal={filterVal}
            search={search}
            columns={viewColumns}
          />
        </>
      ) : (
        <BoardView
          handleCheckboxChange={handleCheckboxChange}
          selectedIds={selectedIds}
          search={search}
          filterVal={filterVal}
        />
      )}
      {isOpen && <CreateView open={isOpen} onClose={handleChange} />}
      {isDealCustomize && (
        <DealCustomize
          open={isDealCustomize}
          onClose={handleDealCustomize}
          columns={viewColumns}
          setColumns={setViewColumns}
        />
      )}
      {isFilter && (
        <DealFilterDrawer
          setFilterVal={setFilterVal}
          setIsFilter={setIsFilter}
          open={isFilter}
          onClose={handleFilter}
        />
      )}
      {isShareDine && (
        <ShareMyDine
          open={isShareDine}
          onClose={handleSMD}
          selectedTableIds={selectedTableIds}
        />
      )}
      {isDelete && (
        <DeleteModal
          open={isDelete}
          onClose={HandleDeleteModal}
          handleSubmitBtn={handleDeleteDeals}
        />
      )}
      {isAssign && (
        <AssignModalBox
          seletedId={selectedTableIds}
          open={isAssign}
          onClose={handleAssignModal}
        />
      )}
      {exportRecord && (
        <ExportRecordModal open={exportRecord} onClose={handleExportRecord} />
      )}
    </>
  );
};

export default Deals;
