import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Button, SvgIcon, Typography, useTheme } from '@mui/material';
import Search from '@/components/Search';

import CreatedTable from './CreatedTable';
import ContactsCustomize from './CreatedCustomize';
import CreatedActions from './CreatedActions';
import useImportRecordCreated from './useImportRecordCreated';
import CreatedFilterDrawer from './CreatedFilterDrawer';
import AssignModalBox from './CreateRecordModalBox/AssignModalBox';
import DeleteModal from './CreateRecordModalBox/DeleteModal';
import ExportModal from './CreateRecordModalBox/ExportModal';

import {
  BackArrIcon,
  CutomizeIcon,
  ExportIcon,
  FilterIcon,
  RestoreIcon,
} from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';

const ImportRecordCreated = () => {
  const theme = useTheme();
  const route = useRouter();
  const {
    handleActions,
    isCustomize,
    handleCustomizeDrawer,
    IsFilter,
    handleFilterDrawer,
    isAssign,
    handleAssignModal,
    HandleDeleteModal,
    isDelete,
    IsExport,
    handleExportModal,
  } = useImportRecordCreated();

  return (
    <>
      <Typography variant="h4" gap={1} display="flex" alignItems="center">
        <SvgIcon
          cursor="pointer"
          onClick={() => {
            route.push(AIR_SOCIAL?.IMPORTHISTORY);
          }}
        >
          <BackArrIcon />
        </SvgIcon>
        Import : Record Created (Contact.csv)
      </Typography>
      <Box
        display="flex"
        my="15px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Search
          label={'Search Here'}
          width={250}
          searchBy={''}
          setSearchBy={() => {}}
        />
        <Box display="flex" justifyContent="end" alignItems="center" gap={1}>
          <CreatedActions
            menuItem={['Re-assign', 'Delete']}
            disableActionBtn={false}
            onChange={handleActions}
          />
          <Link href={AIR_SOCIAL?.IMPORT_RECORD_RESTORE}>
            <Button
              variant="outlined"
              sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
              startIcon={<RestoreIcon />}
            >
              Restore
            </Button>
          </Link>
          <Button
            onClick={handleCustomizeDrawer}
            variant="outlined"
            sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
          >
            <CutomizeIcon /> &nbsp; Customize
          </Button>

          <Button
            variant="outlined"
            sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
            onClick={handleFilterDrawer}
          >
            <FilterIcon />
            &nbsp; Filter
          </Button>
          <Button
            variant="outlined"
            sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
            onClick={handleExportModal}
          >
            <ExportIcon />
            &nbsp; Export
          </Button>
        </Box>
      </Box>
      <ContactsCustomize open={isCustomize} onClose={handleCustomizeDrawer} />
      <CreatedFilterDrawer open={IsFilter} onClose={handleFilterDrawer} />
      <CreatedTable />
      <AssignModalBox open={isAssign} onClose={handleAssignModal} />
      <DeleteModal open={isDelete} onClose={HandleDeleteModal} />
      <ExportModal open={IsExport} onClose={handleExportModal} />
    </>
  );
};

export default ImportRecordCreated;
