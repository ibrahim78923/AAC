import Link from 'next/link';

import { Button } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import CreateView from './CreateView';

import { SUPER_ADMIN } from '@/constants';

import { ContactsSaleSite } from './ContactsSaleSite.data';
import ContactsActions from './ContactsActions';
import ContactsCustomize from './ContactsCustomize';
import ContactsFilterDrawer from './ContactsFilterDrawer';
import ContactsTable from './ContactsTable';
import useContactsSaleSite from './useContactsSaleSite';
import ContactsHeader from './ContactsHeader';
import DeleteModal from './ContactsModalBox/DeleteModal';
import AssignModalBox from './ContactsModalBox/AssignModalBox';
import ExportModal from './ContactsModalBox/ExportModal';

import { FilterIcon, RestoreIcon, CutomizeIcon } from '@/assets/icons';

const Contacts = () => {
  const {
    search,
    setSearch,
    theme,
    isOpen,
    isDealCustomize,
    isFilter,
    handleChange,
    handleDealCustomize,
    HandleDeleteModal,
    isDelete,
    isAssign,
    handleAssignModal,
    handleActions,
    handleFilter,
    isExport,
    handleExportModal,
  } = useContactsSaleSite();
  return (
    <>
      <ContactsHeader />
      <CommonTabs
        tabsArray={ContactsSaleSite}
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
            <ContactsActions
              menuItem={['Re-assign', 'Delete']}
              disableActionBtn={false}
              onChange={handleActions}
            />

            <Link href={SUPER_ADMIN?.AIRSALES_CONTCATS_RESTORE}>
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
            <Button
              variant="outlined"
              sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
              onClick={handleExportModal}
            >
              <FilterIcon />
              &nbsp; Export
            </Button>
          </>
        }
      >
        <ContactsTable />
      </CommonTabs>
      <CreateView open={isOpen} onClose={handleChange} />
      <ContactsCustomize open={isDealCustomize} onClose={handleDealCustomize} />
      <ContactsFilterDrawer open={isFilter} onClose={handleFilter} />
      <DeleteModal open={isDelete} onClose={HandleDeleteModal} />
      <AssignModalBox open={isAssign} onClose={handleAssignModal} />
      <ExportModal open={isExport} onClose={handleExportModal} />
    </>
  );
};

export default Contacts;
